<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'
import { API_ROUTES } from '../utils/api_routes'
import type { CourseSliderType } from '../utils/types'

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

const { data, pending } = useSSRFetch<{ course: CourseSliderType[]}>(() => API_ROUTES.course, {
  key: 'courses_slider',
  lazy: true,
  server: false,
  immediate: false,
  watch: [isSliderVisible]
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
      <div ref="isSliderEl">
        <LazyCourseSwiper v-if="!pending && data && data.course.length>0" :course="data.course" />
      </div>
    </div>
  </div>
</template>
