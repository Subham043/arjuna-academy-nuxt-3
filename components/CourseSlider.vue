<script setup lang="ts">
import { API_ROUTES } from '../utils/api_routes'
import type { CourseSliderType } from '../utils/types'

const { data, pending } = await useSSRFetch<{ course: CourseSliderType[]}>(() => API_ROUTES.course, {
  key: 'courses_slider',
  lazy: true,
  server: false
})

</script>

<template>
  <div class="courses-area-two section-bg pt-70 pb-70">
    <div class="container">
      <div class="row align-items-end mb-45">
        <div class="col-lg-12">
          <div class="section-title mt-rs-20 text-center">
            <span>COURSES</span>
            <h2>What are the courses offered by Arjunaa Academy?</h2>
          </div>
        </div>
      </div>
      <CourseCardLoading v-if="pending" :count="3" />
      <div v-if="!pending && data && data.course.length>0" class="course-slider-two owl-carousel owl-theme" data-aos="fade-up">
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
            pauseOnMouseEnter: true,
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
          <SwiperSlide v-for="(item, i) in data.course" :key="i" class="single-swiper-slider">
            <LazyCourseCard
              :image="item.image"
              :image_alt="item.image_alt"
              :image_title="item.image_title"
              :description="item.short_description"
              :title="item.name"
              :branches="item.branches"
              :slug="item.slug"
              :class_name="item.class"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-slider-two .single-swiper-slider{
  padding: 0 10px;
}
</style>
