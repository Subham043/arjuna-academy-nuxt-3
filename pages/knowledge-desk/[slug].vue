<script setup lang="ts">
import { object, string } from 'yup'
import { useToast } from 'vue-toastification'
import { API_ROUTES } from '@/utils/api_routes'
import type { BlogType, BlogCommentType, PaginationType } from '@/utils/types'

const config = useRuntimeConfig()

const schema = object({
  name: string().required(),
  email: string().email().required(),
  comment: string().required()
})

const { $scroll } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const toast = useToast()

const loading = ref(false)
const page = ref((route.query.page && !isNaN(+route.query.page)) ? +route.query.page : 1)
const commentPage = ref((route.query.commentPage && !isNaN(+route.query.commentPage)) ? +route.query.commentPage : 1)

const { data: blog, pending: blogPending, error } = await useSSRFetch<{
  blog: BlogType,
  next_blog: BlogType,
  prev_blog: BlogType
}>(API_ROUTES.blog + `/${route.params.slug}`, {
  key: 'blog_' + route.params.slug,
  lazy: true
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.message
  })
}

useSeoMeta({
  title: () => blog.value ? blog.value.blog.meta_title : 'Arjunaa Academy For Achievers',
  ogTitle: () => blog.value ? blog.value.blog.meta_title : 'Arjunaa Academy For Achievers',
  twitterTitle: () => blog.value ? blog.value.blog.meta_title : 'Arjunaa Academy For Achievers',
  description: () => blog.value ? blog.value.blog.meta_description : 'Arjunaa Academy For Achievers',
  ogDescription: () => blog.value ? blog.value.blog.meta_description : 'Arjunaa Academy For Achievers',
  twitterDescription: () => blog.value ? blog.value.blog.meta_description : 'Arjunaa Academy For Achievers',
  keywords: () => blog.value ? blog.value.blog.meta_keywords : 'Arjunaa Academy For Achievers',
  ogUrl: config.public.mainURL + (route.fullPath === '/' ? '' : route.fullPath),
  ogType: 'article',
  ogImage: () => blog.value ? blog.value.blog.image : '/images/logos/new-logo.webp',
  twitterImage: () => blog.value ? blog.value.blog.image : '/images/logos/new-logo.webp',
  twitterCard: 'summary_large_image',
  colorScheme: 'normal',
  themeColor: '#354620'
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: config.public.mainURL + (route.fullPath === '/' ? '' : route.fullPath)
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => blog.value ? blog.value.blog.meta_scripts : undefined
    }
  ]
})

const { data: blogs, pending: blogsPending } = await useSSRFetch<PaginationType<BlogType>>(() => API_ROUTES.blog + `?total=12&page=${page.value}&filter[is_popular]=true&sort=-published_on`, {
  key: 'popular_blogs_' + route.query.page || '1',
  lazy: true,
  server: false,
  watch: [page]
})

const { data: blogComments } = await useSSRFetch<PaginationType<BlogCommentType>>(() => API_ROUTES.blog + `/comment/${blog.value ? blog.value.blog.id : ''}/paginate?total=12&page=${page.value}`, {
  key: 'blog_comments_' + route.query.commentPage || '1',
  lazy: true,
  server: false,
  immediate: false,
  watch: [page, blog]
})

const paginationHandler = () => router.push({ query: { page: page.value, commentPage: commentPage.value } })
const blogPaginationHandler = () => $scroll('#popular-blog-area', () => paginationHandler())
const commentPaginationHandler = () => $scroll('#blog-comment-area', () => paginationHandler())

const onSubmit = async (values: any, actions: any) => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('comment', values.comment)
    const response = await useCustomFetch(API_ROUTES.blog + `/comment/${blog.value?.blog?.id}/create`, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      toast.success(content.message)
      actions.resetForm()
    } else {
      throw content
    }
  } catch (err: any) {
    toast.error(err?.message)
    actions.setErrors({
      email: err?.errors?.email?.length > 0 && err?.errors?.email[0],
      name: err?.errors?.name?.length > 0 && err?.errors?.name[0],
      comment: err?.errors?.comment?.length > 0 && err?.errors?.comment[0]
    })
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div>
    <BreadCrumb
      :title="blog ? blog.blog.name : ''"
      :pages="[
        {
          link: '/knowledge-desk',
          name: 'Knowledge Desk'
        },
        {
          link: '',
          name: blog ? blog.blog.name : ''
        }
      ]"
    />

    <div class="blog-details-area pt-70 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="blog-details-content pr-20">
              <template v-if="!blogPending && blog">
                <div class="blog-preview-img">
                  <NuxtImg
                    width="900"
                    placeholder="/images/placeholder.webp"
                    :src="blog.blog.image"
                    :alt="blog.blog.image_alt"
                    :title="blog.blog.image_title"
                  />
                </div>
                <ul class="tag-list">
                  <li>
                    <span class="svg-icon">
                      <Icon name="fa6-solid:calendar-days" />&nbsp; {{ blog.blog.published }}
                    </span>
                  </li>
                  <li>
                    <span class="svg-icon">
                      <Icon name="fa6-solid:user" />&nbsp;
                      <NuxtLink noPrefetch to="/leadership-team" :aria-label="blog.blog.author_name" v-html="blog.blog.author_name" />
                    </span>
                  </li>
                </ul>
                <h1 v-html="blog.blog.heading" />
                <div v-html="blog.blog.description" />
                <div class="article-share">
                  <div class="row align-items-center justify-content-between">
                    <div v-if="blog.prev_blog !== null" class="col-lg-auto col-md-auto">
                      <div class="pagination-area m-0">
                        <NuxtLink noPrefetch
                          :to="blog.prev_blog !== null ? `/knowledge-desk/${blog.prev_blog?.slug}` : '#'"
                          title="previous blog"
                          class="prev page-numbers"
                          aria-label="previos blog"
                        >
                          <i class="flaticon-left-arrow" />
                        </NuxtLink>
                      </div>
                    </div>
                    <div class="col-lg-auto col-md-auto">
                      <div class="article-social-icon">
                        <ul class="social-icon">
                          <li class="title">
                            Share :
                          </li>
                          <li>
                            <a
                              :href="`https://www.facebook.com/share.php?u=${config.public.mainURL}/knowledge-desk/${blog.blog.slug}&title=${blog.blog.name}`"
                              target="_blank"
                            >
                              <span class="svg-icon">
                                <Icon name="fa6-brands:facebook-f" />
                              </span>
                            </a>
                          </li>
                          <li>
                            <a
                              :href="`https://twitter.com/share?text=${blog.blog.name}&url=${config.public.mainURL}/knowledge-desk/${blog.blog.slug}`"
                              target="_blank"
                            >
                              <span class="svg-icon">
                                <Icon name="fa6-brands:twitter" />
                              </span>
                            </a>
                          </li>
                          <li>
                            <a
                              :href="`https://www.linkedin.com/shareArticle?mini=true&url=${config.public.mainURL}/knowledge-desk/${blog.blog.slug}&title=${blog.blog.name}&source=${blog.blog.name}`"
                              target="_blank"
                            >
                              <span class="svg-icon">
                                <Icon name="fa6-brands:linkedin" />
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="blog.next_blog" class="col-lg-auto col-md-auto">
                      <div class="pagination-area m-0">
                        <NuxtLink noPrefetch
                          :to="blog.next_blog !== null ? `/knowledge-desk/${blog.next_blog?.slug}` : '#'"
                          title="next blog"
                          class="next page-numbers"
                          aria-label="next blog"
                        >
                          <i class="flaticon-chevron" />
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="blog-comment-area" class="courses-details-area pb-70">
                  <div class="courses-details-contact">
                    <div class="tab courses-details-tab">
                      <div class="tab_content current active">
                        <div class="tabs_item">
                          <div class="courses-details-tab-content">
                            <div class="courses-details-review-form">
                              <h3>Comments:</h3>
                              <template v-if="blogComments && blogComments.data.length>0">
                                <div v-for="(item, i) in blogComments.data" :key="i" class="review-comments">
                                  <div class="review-item">
                                    <div class="content">
                                      <NuxtImg
                                        placeholder="/images/placeholder.webp"
                                        src="/images/avatar.webp"
                                        alt="Images"
                                      />
                                      <div class="content-dtls">
                                        <h4 v-html="item.name" />
                                        <span v-html="item.comment_on" />
                                      </div>
                                    </div>
                                    <p v-html="item.comment" />
                                  </div>
                                </div>
                                <div class="text-center">
                                  <vue-awesome-paginate
                                    v-model="commentPage"
                                    :max-pages-shown="3"
                                    :total-items="blogComments.meta.total"
                                    :items-per-page="blogComments.meta.per_page"
                                    :on-click="commentPaginationHandler"
                                  />
                                </div>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="comments-form">
                  <div class="contact-form">
                    <h4>Leave A Comment</h4>
                    <VeeForm v-slot="{ handleSubmit }" :validation-schema="schema" as="div">
                      <form id="contactForm" @submit.prevent="handleSubmit($event, onSubmit)">
                        <div class="row">
                          <div class="col-lg-6 col-sm-6">
                            <div class="form-group">
                              <VeeField
                                id="name"
                                type="name"
                                name="name"
                                class="form-control"
                                data-error="Name*"
                                placeholder="Please enter your name*"
                              />
                              <VeeErrorMessage
                                name="name"
                                as="div"
                                class="is-invalid"
                              />
                            </div>
                          </div>
                          <div class="col-lg-6 col-sm-6">
                            <div class="form-group">
                              <VeeField
                                id="email"
                                type="email"
                                name="email"
                                class="form-control"
                                data-error="Email*"
                                placeholder="Please enter your email*"
                              />
                              <VeeErrorMessage
                                name="email"
                                as="div"
                                class="is-invalid"
                              />
                            </div>
                          </div>
                          <div class="col-lg-12 col-md-12">
                            <div class="form-group">
                              <VeeField
                                id="comment"
                                type="textarea"
                                name="comment"
                                class="form-control"
                                data-error="Comment*"
                                placeholder="Please enter your comment*"
                              />
                              <VeeErrorMessage
                                name="comment"
                                as="div"
                                class="is-invalid"
                              />
                            </div>
                          </div>
                          <div class="col-lg-12 col-md-12">
                            <button
                              type="submit"
                              :disabled="loading"
                              class="default-btn"
                            >
                              <template v-if="!loading">
                                Post A Comment
                              </template>
                              <div v-else class="spinner-border" role="status" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </VeeForm>
                  </div>
                </div>
              </template>
              <template v-else>
                <PageDetailLoading />
              </template>
            </div>
          </div>
          <div id="popular-blog-area" class="col-lg-4">
            <div class="side-bar-area">
              <div class="side-bar-widget">
                <h3 class="title">
                  Popular post
                </h3>
                <div class="widget-popular-post">
                  <PopularPostLoading v-if="blogsPending" />
                  <div v-if="!blogsPending && blogs && blogs.data.length > 0">
                    <article
                      v-for="(item, i) in blogs.data"
                      :key="i"
                      class="item"
                    >
                      <div class="info">
                        <p>{{ item.published }}</p>
                        <h4 class="title-text">
                          <NuxtLink noPrefetch :aria-label="item.name" :to="`/knowledge-desk/${item.slug}`">
                            {{ item.name }}
                          </NuxtLink>
                        </h4>
                        <p>
                          {{ item.short_description }}
                        </p>
                        <hr>
                      </div>
                    </article>
                    <div v-if="!blogsPending && blogs.data.length > 0" class="col-12 text-center">
                      <vue-awesome-paginate
                        v-model="page"
                        :max-pages-shown="3"
                        :total-items="blogs.meta.total"
                        :items-per-page="blogs.meta.per_page"
                        :on-click="blogPaginationHandler"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
