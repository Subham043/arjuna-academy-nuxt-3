<script setup lang="ts">
import { API_ROUTES } from '@/utils/api_routes'
import type { EventType, PaginationType } from '@/utils/types'

const config = useRuntimeConfig()
const { $scroll } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const page = ref((route.query.page && !isNaN(+route.query.page)) ? +route.query.page : 1)

const { data: event, pending: eventPending } = await useSSRFetch<{
  event: EventType,
}>(API_ROUTES.event + `/${route.params.slug}`, {
  key: 'event_' + route.params.slug,
  lazy: true
})

useSeoMeta({
  title: () => event.value ? event.value.event.meta_title : 'Arjunaa Academy For Achievers',
  ogTitle: () => event.value ? event.value.event.meta_title : 'Arjunaa Academy For Achievers',
  twitterTitle: () => event.value ? event.value.event.meta_title : 'Arjunaa Academy For Achievers',
  description: () => event.value ? event.value.event.meta_description : 'Arjunaa Academy For Achievers',
  ogDescription: () => event.value ? event.value.event.meta_description : 'Arjunaa Academy For Achievers',
  twitterDescription: () => event.value ? event.value.event.meta_description : 'Arjunaa Academy For Achievers',
  keywords: () => event.value ? event.value.event.meta_keywords : 'Arjunaa Academy For Achievers',
  ogUrl: config.public.mainURL + (route.fullPath === '/' ? '' : route.fullPath),
  ogType: 'website',
  ogImage: () => event.value ? event.value.event.image : '/images/logos/new-logo.webp',
  twitterImage: () => event.value ? event.value.event.image : '/images/logos/new-logo.webp',
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
      innerHTML: () => event.value ? event.value.event.meta_scripts : undefined
    }
  ]
})

const { data: events, pending: eventsPending } = await useSSRFetch<PaginationType<EventType>>(() => API_ROUTES.event + `?total=8&page=${page.value}&sort=-id`, {
  key: 'upcoming_events_' + route.query.page || '1',
  lazy: true,
  server: false,
  watch: [page]
})

const paginationHandler = () => $scroll('#popular-event-area', () => router.push({ query: { page: page.value } }))
</script>

<template>
  <div>
    <BreadCrumb
      :title="event ? event.event.name : ''"
      :pages="[
        {
          link:'/events',
          name:'Events'
        },
        {
          link:'',
          name:event ? event.event.name : ''
        }
      ]"
    />

    <div class="event-details-area pt-70 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <template v-if="!eventPending && event">
              <div class="event-details-content pr-20">
                <div class="event-preview-img">
                  <NuxtImg placeholder="/images/placeholder.webp" :src="event.event.image" :alt="event.event.image_alt" :title="event.event.image_title" width="1280px" />
                </div>
                <h1 v-html="event.event.heading" />
                <div v-html="event.event.description" />
                <h3 v-if="event.event.speakers.length>0" class="event-details-mt-30">
                  Our speakers
                </h3>
                <div v-if="event.event.speakers.length>0" class="row justify-content-center event-details-mt-30">
                  <div v-for="(item, i) in event.event.speakers" :key="i" class="col-lg-3 col-md-6">
                    <div class="instructors-item instructors-item-bg">
                      <div class="instructors-img">
                        <NuxtImg placeholder="/images/placeholder.webp" :src="item.image" :alt="item.image_alt" :title="item.image_title" />
                      </div>
                      <div class="content">
                        <h3 v-html="item.name" />
                        <span v-html="item.designation" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <PageDetailLoading />
            </template>
          </div>
          <div class="col-lg-4">
            <template v-if="!eventPending && event">
              <div class="event-sidebar">
                <h3 class="title">
                  Events description
                </h3>
                <ul>
                  <li>Date: <span>{{ event.event.event_date_on }}</span></li>
                  <li v-for="(item, i) in event.event.specifications" :key="i">
                    {{ item.title }}: <span v-html="item.description" />
                  </li>
                </ul>
              </div>
            </template>
            <div id="popular-event-area" class="event-sidebar">
              <h3 class="title">
                Upcoming Events
              </h3>
              <PopularPostLoading v-if="eventsPending" />
              <div v-if="!eventsPending && events && events.data.length>0">
                <article v-for="(item, i) in events.data" :key="i" class="item">
                  <div class="info">
                    <NuxtLink :to="`/events/${item.slug}`" :aria-label="item.name">
                      <h4 class="title-text" v-html="item.name" />
                    </NuxtLink>
                    <p v-html="item.short_description" />
                    <hr>
                  </div>
                </article>
                <div v-if="!eventsPending && events && events.data.length>0" class="col-12 text-center">
                  <vue-awesome-paginate
                    v-model="page"
                    :max-pages-shown="3"
                    :total-items="events.meta.total"
                    :items-per-page="events.meta.per_page"
                    :on-click="paginationHandler"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
