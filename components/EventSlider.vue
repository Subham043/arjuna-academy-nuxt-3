<script setup lang="ts">
import { API_ROUTES } from '../utils/api_routes'
import type { PaginationType, EventType } from '../utils/types'

const { data, pending } = await useSSRFetch<PaginationType<EventType>>(() => API_ROUTES.event + '?total=8&page=1&sort=-id', {
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
          <NuxtLink to="/events" class="default-btn border-radius-50" aria-label="View all Events">
            View all Events
          </NuxtLink>
        </div>
      </div>
      <EventCardLoading v-if="pending" :count="2" />
      <div v-if="!pending && data && data.data.length>0" class="event-slider owl-carousel owl-theme" data-aos="fade-up">
        <Swiper
          :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
          :loop="true"
          :navigation="true"
          :centered-slides="false"
          :css-mode="true"
          :no-swiping="false"
          :space-between="10"
          :pagination="{
            dynamicBullets: true,
          }"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true
          }"
          :breakpoints="{
            600: {
              slidesPerView: 1
            },
            1024: {
              slidesPerView: 2
            },
            1200: {
              slidesPerView: 2
            }
          }"
        >
          <SwiperSlide v-for="(item, i) in data.data" :key="i" class="single-swiper-slider">
            <EventCard
              :image="item.image"
              :title="item.name"
              :description="item.short_description"
              :date="item.event_date_on"
              :slug="item.slug"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-slider .single-swiper-slider{
  padding: 0 10px;
}
</style>
