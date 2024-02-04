<script setup lang="ts">
import { API_ROUTES } from '@/utils/api_routes'
import type { PaginationType, EventType } from '@/utils/types'

const { $scroll } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const page = ref((route.query.page && !isNaN(+route.query.page)) ? +route.query.page : 1)

const { data, pending } = await useSSRFetch<PaginationType<EventType>>(() => API_ROUTES.event + `?total=8&page=${page.value}&sort=-id`, {
  key: 'events_' + route.query.page || '1',
  lazy: true,
  watch: [page]
})

const paginationHandler = () => $scroll('#event-area', () => router.push({ query: { page: page.value } }))

</script>

<template>
  <div>
    <SeoHeader slug="events-page" />

    <BreadCrumb
      title="Events"
      :pages="[
        {
          link:'',
          name:'Events'
        }
      ]"
    />

    <div id="event-area" class="blog-area pt-70 pb-70">
      <div class="container">
        <div class="section-title mb-45 text-center">
          <h2>Latest from our <b>events</b></h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>
        </div>
        <div class="row justify-content-center">
          <EventCardLoading v-if="pending" :count="8" />
        </div>
        <div v-if="!pending && data && data.data.length>0" class="row justify-content-center">
          <div v-for="(item, i) in data.data" :key="i" class="col-lg-6 col-md-6">
            <EventCard
              :image="item.image"
              :title="item.name"
              :description="item.short_description"
              :date="item.event_date_on"
              :image_alt="item.image_alt"
              :image_title="item.image_title"
              :slug="item.slug"
            />
          </div>
          <div v-if="!pending && data && data.data.length>0" class="col-12 text-center">
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
