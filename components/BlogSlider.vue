<script setup lang="ts">
import { API_ROUTES } from '../utils/api_routes'
import type { PaginationType, BlogType } from '../utils/types'

const { data, pending } = await useSSRFetch<PaginationType<BlogType>>(() => API_ROUTES.blog + '?total=9&page=1&filter[is_popular]=true&sort=-published_on', {
  key: 'blogs_slider',
  lazy: true,
  server: false
})

</script>

<template>
  <div class="blog-area pt-70 pb-70">
    <div class="container">
      <div class="row align-items-end mb-45">
        <div class="col-lg-8">
          <div class="section-title mt-rs-20">
            <span>KNOWLEDGE DESK</span>
            <h2>Latest from our blogs</h2>
          </div>
        </div>
        <div class="col-lg-4 text-end">
          <NuxtLink to="/knowledge-desk" class="default-btn border-radius-50" aria-label="View all Blogs">
            View all Blogs
          </NuxtLink>
        </div>
      </div>
      <BlogCardLoading v-if="pending" :count="3" />
      <div v-if="!pending && data && data.data.length>0" class="w-100 blog-slider-two" data-aos="fade-up">
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
            <BlogCard
              :image="item.image"
              :title="item.name"
              :description="item.short_description"
              :date="item.published"
              :slug="item.slug"
              :author="item.author_name"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-slider-two .single-swiper-slider{
  padding: 0 10px;
}
</style>
