<script setup lang="ts">
import { API_ROUTES } from '../utils/api_routes'
import type { PaginationType, TestimonialType } from '../utils/types'

const { data, pending } = await useSSRFetch<PaginationType<TestimonialType>>(() => API_ROUTES.testimonial + '?total=9&page=1', {
  key: 'testimonials_slider',
  lazy: true,
  server: false
})

</script>

<template>
  <div class="testimonials-area pb-70">
    <div class="container">
      <div class="row align-items-center mb-20">
        <div class="col-lg-8 col-md-9">
          <div class="section-title mt-rs-20">
            <span>TESTIMONIAL</span>
            <h2>Testimonials describe what has been, & are a promise of what is to come</h2>
          </div>
        </div>
        <div class="col-lg-4 col-md-3 text-end">
          <NuxtLink noPrefetch to="/testimonial" class="default-btn border-radius-50" aria-label="View all Testimonial">
            View all Testimonial
          </NuxtLink>
        </div>
      </div>
      <TestimonialCardLoading v-if="pending" :count="3" />
      <div v-if="!pending && data && data.data.length>0" class="testimonials-slider-two owl-carousel owl-theme" data-aos="fade-up">
        <Swiper
          :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
          :loop="true"
          :navigation="true"
          :centered-slides="true"
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
              slidesPerView: 3
            }
          }"
        >
          <SwiperSlide v-for="(item, i) in data.data" :key="i" class="single-swiper-slider">
            <TestimonialCard
              :image="item.image"
              :name="item.name"
              :star="item.star"
              :message="item.message"
              :designation="item.designation"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<style scoped>
.testimonials-slider-two .single-swiper-slider{
  padding: 0 10px;
}
</style>
