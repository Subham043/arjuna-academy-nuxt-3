<script setup lang="ts">
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import type { CourseSliderType } from '../utils/types'

const props = defineProps({
  course: {
    type: Array<CourseSliderType>,
    default: []
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
  <div v-if="props.course.length>0" class="course-slider-two owl-carousel owl-theme">
    <Carousel :settings="settings" :breakpoints="breakpoints">
      <Slide v-for="(item, i) in props.course" :key="i">
        <div class="single-swiper-slider">
          <CourseCard
            :image="item.image"
            :image_alt="item.image_alt"
            :image_title="item.image_title"
            :description="item.short_description"
            :title="item.name"
            :branches="item.branches"
            :slug="item.slug"
            :class_name="item.class"
          />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>
