<script setup lang="ts">
import { API_ROUTES } from '../utils/api_routes'
import { type FeatureType } from '../utils/types'

const props = defineProps({
  server: {
    type: Boolean,
    default: true
  },
  heading: {
    type: String,
    default: ''
  },
  slug: {
    type: String,
    default: 'about-page'
  }
})

const { data, pending } = await useSSRFetch<{
  feature: FeatureType[];
}>(() => API_ROUTES.feature + `/${props.slug}`, {
  lazy: true,
  server: props.server
})

</script>

<template>
  <div class="featured-area pt-70 pb-70">
    <div class="container">
      <div class="row align-items-center mb-45">
        <div class="col-lg-8 col-md-9">
          <div class="section-title mt-rs-20">
            <span>WHAT WE DO</span>
            <h2>{{ props.heading }}</h2>
          </div>
        </div>
        <div class="col-lg-4 col-md-3 text-end">
          <NuxtLink noPrefetch to="/mission-vision" class="default-btn border-radius-50" aria-label="Mission & Vision">
            Mission & Vision
          </NuxtLink>
        </div>
      </div>
      <div v-if="pending" class="row">
        <FeatureCardLoading :count="6" />
      </div>
      <div v-if="!pending && data && data.feature.length>0" class="row">
        <div v-for="(item, i) in data.feature" :key="i" class="col-lg-4 col-6">
          <div class="featured-item-two">
            <div class="feature-icon-holder">
              <NuxtImg
                format="webp"
                loading="lazy"
                height="65px"
                placeholder="/images/placeholder.webp"
                :src="item.image"
                :alt="item.title"
                :title="item.title"
              />
              <h3 v-html="item.title" />
            </div>
            <p v-html="item.description" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
