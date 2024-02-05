<script setup lang="ts">
import { API_ROUTES } from '@/utils/api_routes'
import type { LegalType } from '@/utils/types'

const config = useRuntimeConfig()
const route = useRoute()

const { data: legal, pending: legalPending, error } = await useSSRFetch<{
  legal: LegalType
}>(API_ROUTES.legal + `/${route.params.slug}`, {
  key: 'legal_' + route.params.slug,
  lazy: true
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.message
  })
}

useSeoMeta({
  title: () => legal.value ? legal.value.legal.meta_title : 'Arjunaa Academy For Achievers',
  ogTitle: () => legal.value ? legal.value.legal.meta_title : 'Arjunaa Academy For Achievers',
  twitterTitle: () => legal.value ? legal.value.legal.meta_title : 'Arjunaa Academy For Achievers',
  description: () => legal.value ? legal.value.legal.meta_description : 'Arjunaa Academy For Achievers',
  ogDescription: () => legal.value ? legal.value.legal.meta_description : 'Arjunaa Academy For Achievers',
  twitterDescription: () => legal.value ? legal.value.legal.meta_description : 'Arjunaa Academy For Achievers',
  keywords: () => legal.value ? legal.value.legal.meta_keywords : 'Arjunaa Academy For Achievers',
  ogUrl: config.public.mainURL + (route.fullPath === '/' ? '' : route.fullPath),
  ogType: 'website',
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
      innerHTML: () => legal.value ? legal.value.legal.meta_scripts : undefined
    }
  ]
})

</script>

<template>
  <div>
    <BreadCrumb
      :title="legal ? legal.legal.page_name : ''"
      :pages="[
        {
          link:'',
          name:'Legal'
        },
        {
          link:'',
          name:legal ? legal.legal.page_name : ''
        }
      ]"
    />

    <div class="blog-details-area pt-70 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="blog-details-content pr-20">
              <template v-if="!legalPending && legal">
                <h1 v-html="legal.legal.heading" />
                <div v-html="legal.legal.description" />
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
