<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel'
import type { PropType } from 'vue'
import type { PaginationType, EventType } from '../utils/types'
const props = defineProps({
  data: {
    type: Object as PropType<PaginationType<EventType> | undefined>,
    default: undefined
  }
})
const settings = computed(() => {
  return {
    itemsToShow: 1,
    snapAlign: 'center',
    autoplay: 0,
    pauseAutoplayOnHover: false,
    wrapAround: false
  }
})
const breakpoints = ref({
  // 700px and up
  700: {
    itemsToShow: 1,
    snapAlign: 'center',
    autoplay: 0,
    pauseAutoplayOnHover: false,
    wrapAround: false
  },
  // 1024 and up
  1024: {
    itemsToShow: 2,
    snapAlign: 'start',
    autoplay: 0,
    pauseAutoplayOnHover: false,
    wrapAround: false
  },
  // 1200 and up
  1200: {
    itemsToShow: 2,
    snapAlign: 'start',
    autoplay: 0,
    pauseAutoplayOnHover: false,
    wrapAround: false
  }
})

</script>

<template>
  <div v-if="props.data && props.data.data.length>0" class="event-slider owl-carousel owl-theme">
    <Carousel :settings="settings" :breakpoints="breakpoints">
      <Slide v-for="(item, i) in props.data.data" :key="i">
        <div class="single-swiper-slider">
          <EventCard
            :image="item.image"
            :title="item.name"
            :description="item.short_description"
            :date="item.event_date_on"
            :slug="item.slug"
          />
        </div>
      </Slide>

      <!-- <template #addons>
        <Navigation />
      </template> -->
    </Carousel>
  </div>
</template>
