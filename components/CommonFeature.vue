<script setup lang="ts">
import { API_ROUTES } from '../utils/api_routes'
import { type FeatureType } from '../utils/types'

const { data, pending } = useSSRFetch<{
  feature: FeatureType[];
}>(() => API_ROUTES.feature + '/common', {
  lazy: true,
  server: true
})

</script>

<template>
  <div class="featured-area featured-area-mt pb-70">
    <div class="container">
      <FeatureCardLoading v-if="pending" :count="3" />
      <div v-if="!pending && data && data.feature.length>0" class="row justify-content-center">
        <div v-for="(item, i) in data.feature" :key="i" class="col-lg-4 col-6">
          <div class="featured-item">
            <NuxtImg
              loading="lazy"
              placeholder="/images/placeholder.webp"
              :src="item.image"
              class="featured-img"
              :alt="item.title"
              :title="item.title"
            />
            <h3 v-html="item.title" />
            <p v-html="item.description" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
