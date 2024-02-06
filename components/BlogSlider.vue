<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'
import { API_ROUTES } from '../utils/api_routes'
import type { PaginationType, BlogType } from '../utils/types'

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

const { data, pending } = useSSRFetch<PaginationType<BlogType>>(() => API_ROUTES.blog + '?total=9&page=1&filter[is_popular]=true&sort=-published_on', {
  key: 'blogs_slider',
  lazy: true,
  server: false
})

</script>

<template>
  <div class="blog-area pt-70 pb-70">
    <div class="container">
      <div class="row align-items-end mb-45">
        <div class="col-lg-8">
          <div class="section-title mt-rs-20">
            <span>KNOWLEDGE DESK</span>
            <h2>Latest from our blogs</h2>
          </div>
        </div>
        <div class="col-lg-4 text-end">
          <NuxtLink noPrefetch to="/knowledge-desk" class="default-btn border-radius-50" aria-label="View all Blogs">
            View all Blogs
          </NuxtLink>
        </div>
      </div>
      <BlogCardLoading v-if="pending" :count="3" />
      <div ref="isSliderEl">
        <LazyBlogSwiper v-if="!pending && isSliderVisible && data" :data="data" />
      </div>
    </div>
  </div>
</template>
