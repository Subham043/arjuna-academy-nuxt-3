<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'
import { API_ROUTES } from '../utils/api_routes'
import type { PaginationType, TestimonialType } from '../utils/types'

const isSliderVisible = ref(false)
const isSliderEl = ref<HTMLElement | null>(null)
const isSlidertargetVisible = useElementVisibility(isSliderEl)

watch(
  () => isSlidertargetVisible.value,
  (value) => {
    if (!isSliderVisible.value && value) {
      isSliderVisible.value = true
    }
  }
)

const { data, pending } = useSSRFetch<PaginationType<TestimonialType>>(() => API_ROUTES.testimonial + '?total=9&page=1', {
  key: 'testimonials_slider',
  lazy: true,
  server: false
})

</script>

<template>
  <div class="testimonials-area pb-70">
    <div class="container">
      <div class="row align-items-center mb-20">
        <div class="col-lg-8 col-md-9">
          <div class="section-title mt-rs-20">
            <span>TESTIMONIAL</span>
            <h2>Testimonials describe what has been, & are a promise of what is to come</h2>
          </div>
        </div>
        <div class="col-lg-4 col-md-3 text-end">
          <NuxtLink noPrefetch to="/testimonial" class="default-btn border-radius-50" aria-label="View all Testimonial">
            View all Testimonial
          </NuxtLink>
        </div>
      </div>
      <TestimonialCardLoading v-if="pending" :count="3" />
      <div ref="isSliderEl">
        <LazyTestimonialSwiper v-if="!pending && isSliderVisible && data" :data="data" />
      </div>
    </div>
  </div>
</template>
