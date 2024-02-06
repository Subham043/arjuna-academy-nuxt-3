<script setup lang="ts">
import { API_ROUTES } from '@/utils/api_routes'
import type { SeoType } from '@/utils/types'

const props = defineProps({
  slug: {
    type: String,
    default: 'home-page'
  },
  schemas: {
    type: Array<any>,
    default: []
  }
})

const config = useRuntimeConfig()
const route = useRoute()

const { data } = useSSRFetch<{
  seo: SeoType
}>(() => API_ROUTES.seo + `/${props.slug}`, {
  key: 'seos_' + props.slug,
  lazy: true,
  server: true
})

useSchemaOrg([...props.schemas])

useSeoMeta({
  title: () => data.value ? data.value.seo.meta_title : 'Arjunaa Academy For Achievers',
  ogTitle: () => data.value ? data.value.seo.meta_title : 'Arjunaa Academy For Achievers',
  twitterTitle: () => data.value ? data.value.seo.meta_title : 'Arjunaa Academy For Achievers',
  description: () => data.value ? data.value.seo.meta_description : 'Arjunaa Academy For Achievers',
  ogDescription: () => data.value ? data.value.seo.meta_description : 'Arjunaa Academy For Achievers',
  twitterDescription: () => data.value ? data.value.seo.meta_description : 'Arjunaa Academy For Achievers',
  keywords: () => data.value ? data.value.seo.meta_keywords : 'Arjunaa Academy For Achievers',
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
      innerHTML: () => data.value ? data.value.seo.meta_scripts : undefined
    }
  ]
})

</script>

<template>
  <div />
</template>
