<script setup lang="ts">
import type { PropType } from 'vue'
import type { PaginationType, BlogType } from '../utils/types'
const props = defineProps({
  data: {
    type: Object as PropType<PaginationType<BlogType> | undefined>,
    default: undefined
  }
})

</script>

<template>
  <div v-if="props.data && props.data.data.length>0" class="w-100 blog-slider-two">
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
</template>

<style scoped>
.blog-slider-two .single-swiper-slider{
  padding: 0 10px;
}
</style>
