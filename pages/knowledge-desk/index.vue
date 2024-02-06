<script setup lang="ts">
import { API_ROUTES } from '@/utils/api_routes'
import type { PaginationType, BlogType } from '@/utils/types'

const { $scroll } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const page = ref((route.query.page && !isNaN(+route.query.page)) ? +route.query.page : 1)

const { data, pending } = useSSRFetch<PaginationType<BlogType>>(() => API_ROUTES.blog + `?total=12&page=${page.value}&sort=-published_on`, {
  key: 'blogs_' + route.query.page || '1',
  lazy: true,
  watch: [page]
})

const paginationHandler = () => $scroll('#blog-area', () => router.push({ query: { page: page.value } }))

</script>

<template>
  <div>
    <SeoHeader slug="blogs-page" />

    <BreadCrumb
      title="Knowledge Desk"
      :pages="[
        {
          link:'',
          name:'Knowledge Desk'
        }
      ]"
    />

    <div id="blog-area" class="blog-area pt-70 pb-70">
      <div class="container">
        <div class="section-title mb-45 text-center">
          <h2>Latest from our <b>blogs</b></h2>
          <p>
            Explore The Latest Updates About NEET, JEE, IIT Exams And Foundation Courses
          </p>
        </div>
        <div v-if="pending" class="row justify-content-center">
          <BlogCardLoading :count="9" />
        </div>
        <div v-if="!pending && data && data.data.length>0" class="row justify-content-center">
          <div v-for="(item, i) in data.data" :key="i" class="col-lg-4 col-md-6">
            <BlogCard
              :image="item.image"
              :title="item.name"
              :description="item.short_description"
              :date="item.published"
              :slug="item.slug"
              :author="item.author_name"
              :image_alt="item.image_alt"
              :image_title="item.image_title"
            />
          </div>
          <div v-if="!pending && data && data.data.length>0" class="col-12 text-center mt-4">
            <vue-awesome-paginate
              v-model="page"
              :max-pages-shown="3"
              :total-items="data.meta.total"
              :items-per-page="data.meta.per_page"
              :on-click="paginationHandler"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
