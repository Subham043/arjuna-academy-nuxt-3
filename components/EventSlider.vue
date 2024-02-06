<script setup lang="ts">
import { API_ROUTES } from '../utils/api_routes'
import type { PaginationType, EventType } from '../utils/types'

const { data, pending } = useSSRFetch<PaginationType<EventType>>(() => API_ROUTES.event + '?total=8&page=1&sort=-id', {
  key: 'events_slider',
  lazy: true,
  server: false
})

</script>

<template>
  <div class="event-area section-bg pt-70 pb-70">
    <div class="container">
      <div class="row align-items-end mb-45">
        <div class="col-lg-8">
          <div class="section-title mt-rs-20">
            <span>EVENTS</span>
            <h2>Upcoming events schedule</h2>
          </div>
        </div>
        <div class="col-lg-4 text-end">
          <NuxtLink noPrefetch to="/events" class="default-btn border-radius-50" aria-label="View all Events">
            View all Events
          </NuxtLink>
        </div>
      </div>
      <EventCardLoading v-if="pending" :count="2" />
      <LazyEventSwiper v-if="!pending && data" :data="data" />
    </div>
  </div>
</template>
