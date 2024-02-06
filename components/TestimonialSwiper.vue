<script setup lang="ts">
import type { PropType } from 'vue'
import type { PaginationType, TestimonialType } from '../utils/types'
const props = defineProps({
  data: {
    type: Object as PropType<PaginationType<TestimonialType> | undefined>,
    default: undefined
  }
})

</script>

<template>
  <div v-if="props.data && props.data.data.length>0" class="testimonials-slider-two owl-carousel owl-theme">
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
      <SwiperSlide v-for="(item, i) in props.data.data" :key="i" class="single-swiper-slider">
        <LazyTestimonialCard
          :image="item.image"
          :name="item.name"
          :star="item.star"
          :message="item.message"
          :designation="item.designation"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.testimonials-slider-two .single-swiper-slider{
  padding: 0 10px;
}
</style>
