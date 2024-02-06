<script setup lang="ts">
import type { CourseSliderType } from '../utils/types'

const props = defineProps({
  course: {
    type: Array<CourseSliderType>,
    default: []
  }
})

</script>

<template>
  <div v-if="props.course.length>0" class="course-slider-two owl-carousel owl-theme">
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
      <SwiperSlide v-for="(item, i) in props.course" :key="i" class="single-swiper-slider">
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
</template>

<style scoped>
.course-slider-two .single-swiper-slider{
  padding: 0 10px;
}
</style>
