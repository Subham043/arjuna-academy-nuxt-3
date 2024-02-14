<script setup lang="ts">
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import type { PropType } from 'vue'
import type { PaginationType, BlogType } from '../utils/types'
const props = defineProps({
  data: {
    type: Object as PropType<PaginationType<BlogType> | undefined>,
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
  <div v-if="props.data && props.data.data.length>0" class="w-100 blog-slider-two">
    <Carousel :settings="settings" :breakpoints="breakpoints">
      <Slide v-for="(item, i) in props.data.data" :key="i">
        <div class="single-swiper-slider">
          <BlogCard
            :image="item.image"
            :title="item.name"
            :description="item.short_description"
            :date="item.published"
            :slug="item.slug"
            :author="item.author_name"
          />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>
