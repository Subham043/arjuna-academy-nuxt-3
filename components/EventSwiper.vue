<script setup lang="ts">
import type { PropType } from 'vue'
import type { PaginationType, EventType } from '../utils/types'
const props = defineProps({
  data: {
    type: Object as PropType<PaginationType<EventType> | undefined>,
    default: undefined
  }
})

</script>

<template>
  <div v-if="props.data && props.data.data.length>0" class="event-slider owl-carousel owl-theme">
    <Swiper
      :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
      :loop="true"
      :navigation="true"
      :centered-slides="false"
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
          slidesPerView: 2
        }
      }"
    >
      <SwiperSlide v-for="(item, i) in props.data.data" :key="i" class="single-swiper-slider">
        <EventCard
          :image="item.image"
          :title="item.name"
          :description="item.short_description"
          :date="item.event_date_on"
          :slug="item.slug"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.event-slider .single-swiper-slider{
  padding: 0 10px;
}
</style>
