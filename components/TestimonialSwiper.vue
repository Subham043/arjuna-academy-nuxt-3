<script setup lang="ts">
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import type { PropType } from 'vue'
import type { PaginationType, TestimonialType } from '../utils/types'
const props = defineProps({
  data: {
    type: Object as PropType<PaginationType<TestimonialType> | undefined>,
    default: undefined
  }
})
const settings = computed(() => {
  return {
    itemsToShow: 1,
    snapAlign: 'center',
    autoplay: 3000,
    pauseAutoplayOnHover: true,
    wrapAround: true
  }
})
const breakpoints = ref({
  // 700px and up
  700: {
    itemsToShow: 1,
    snapAlign: 'center',
    autoplay: 3000,
    pauseAutoplayOnHover: true,
    wrapAround: true
  },
  // 1024 and up
  1024: {
    itemsToShow: 2,
    snapAlign: 'start',
    autoplay: 3000,
    pauseAutoplayOnHover: true,
    wrapAround: true
  },
  // 1200 and up
  1200: {
    itemsToShow: 3,
    snapAlign: 'start',
    autoplay: 3000,
    pauseAutoplayOnHover: true,
    wrapAround: true
  }
})
</script>

<template>
  <div v-if="props.data && props.data.data.length>0" class="testimonials-slider-two owl-carousel owl-theme">
    <Carousel :settings="settings" :breakpoints="breakpoints">
      <Slide v-for="(item, i) in props.data.data" :key="i">
        <div class="single-swiper-slider">
          <TestimonialCard
            :image="item.image"
            :name="item.name"
            :star="item.star"
            :message="item.message"
            :designation="item.designation"
          />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>
