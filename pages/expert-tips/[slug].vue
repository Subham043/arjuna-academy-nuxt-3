<script setup lang="ts">
import { API_ROUTES } from '@/utils/api_routes'
import type { ExpertTipType } from '@/utils/types'

const config = useRuntimeConfig()
const route = useRoute()

const { data: expertTip, pending: expertTipPending, error } = await useSSRFetch<{
  expertTip: ExpertTipType,
  next_expertTip: ExpertTipType,
  prev_expertTip: ExpertTipType
}>(API_ROUTES.expertTip + `/${route.params.slug}`, {
  key: 'expert_tip_' + route.params.slug,
  lazy: true
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.message
  })
}

useSeoMeta({
  title: () => expertTip.value ? expertTip.value.expertTip.meta_title : 'Arjunaa Academy For Achievers',
  ogTitle: () => expertTip.value ? expertTip.value.expertTip.meta_title : 'Arjunaa Academy For Achievers',
  twitterTitle: () => expertTip.value ? expertTip.value.expertTip.meta_title : 'Arjunaa Academy For Achievers',
  description: () => expertTip.value ? expertTip.value.expertTip.meta_description : 'Arjunaa Academy For Achievers',
  ogDescription: () => expertTip.value ? expertTip.value.expertTip.meta_description : 'Arjunaa Academy For Achievers',
  twitterDescription: () => expertTip.value ? expertTip.value.expertTip.meta_description : 'Arjunaa Academy For Achievers',
  keywords: () => expertTip.value ? expertTip.value.expertTip.meta_keywords : 'Arjunaa Academy For Achievers',
  ogUrl: config.public.mainURL + (route.fullPath === '/' ? '' : route.fullPath),
  ogType: 'article',
  ogImage: '/images/logos/new-logo.webp',
  twitterImage: '/images/logos/new-logo.webp',
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
      innerHTML: () => expertTip.value ? expertTip.value.expertTip.meta_scripts : undefined
    }
  ]
})
</script>

<template>
  <div>
    <BreadCrumb
      :title="expertTip ? expertTip.expertTip.name : ''"
      :pages="[
        {
          link:'/expert-tips',
          name:'Expert Tips'
        },
        {
          link:'',
          name:expertTip ? expertTip.expertTip.name : ''
        }
      ]"
    />

    <div class="blog-details-area pt-70 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="blog-details-content pr-20">
              <template v-if="!expertTipPending && expertTip">
                <ul class="tag-list">
                  <li>
                    <span class="svg-icon">
                      <Icon name="fa6-solid:calendar-days" />&nbsp; {{ expertTip.expertTip.published }}
                    </span>
                  </li>
                  <li>
                    <span class="svg-icon">
                      <Icon name="fa6-solid:user" />&nbsp;
                      <NuxtLink noPrefetch to="/leadership-team" :aria-label="expertTip.expertTip.author_name" v-html="expertTip.expertTip.author_name" />
                    </span>
                  </li>
                </ul>
                <h1 v-html="expertTip.expertTip.heading" />
                <div v-html="expertTip.expertTip.description" />
                <div class="article-share">
                  <div class="row align-items-center justify-content-between">
                    <div v-if="expertTip.prev_expertTip" class="col-lg-auto col-md-auto">
                      <div class="pagination-area m-0">
                        <NuxtLink noPrefetch :to="expertTip.prev_expertTip ? `/expert-tips/${expertTip.prev_expertTip.slug}` : '#'" title="previous expert tip" class="prev page-numbers" aria-label="previous expert tip">
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
                            <a aria-label="facebook share" :href="`https://www.facebook.com/share.php?u=${config.public.mainURL}/expert-tips/${expertTip.expertTip.slug}&title=${expertTip.expertTip.name}`" target="_blank">
                              <span class="svg-icon">
                                <Icon name="fa6-brands:facebook-f" />
                              </span>
                            </a>
                          </li>
                          <li>
                            <a aria-label="twitter share" :href="`https://twitter.com/share?text=${expertTip.expertTip.name}&url=${config.public.mainURL}/expert-tips/${expertTip.expertTip.slug}`" target="_blank">
                              <span class="svg-icon">
                                <Icon name="fa6-brands:twitter" />
                              </span>
                            </a>
                          </li>
                          <li>
                            <a aria-label="linkedin share" :href="`https://www.linkedin.com/shareArticle?mini=true&url=${config.public.mainURL}/expert-tips/${expertTip.expertTip.slug}&title=${expertTip.expertTip.name}&source=${expertTip.expertTip.name}`" target="_blank">
                              <span class="svg-icon">
                                <Icon name="fa6-brands:linkedin" />
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="expertTip.next_expertTip!==null" class="col-lg-auto col-md-auto">
                      <div class="pagination-area m-0">
                        <NuxtLink noPrefetch :to="expertTip.next_expertTip!==null ? `/expert-tips/${expertTip.next_expertTip.slug}` : '#'" title="next expert tip" class="next page-numbers" aria-label="next expert tip">
                          <i class="flaticon-chevron" />
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <PageDetailLoading :image="false" />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
