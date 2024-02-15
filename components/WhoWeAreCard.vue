<script setup lang="ts">
import { API_ROUTES } from '../utils/api_routes'
import { type AboutType } from '../utils/types'

const props = defineProps({
  server: {
    type: Boolean,
    default: true
  },
  heading_center: {
    type: Boolean,
    default: false
  },
  first: {
    type: Boolean,
    default: false
  },
  slug: {
    type: String,
    default: 'about-page'
  }
})

const { data, pending } = await useSSRFetch<{
  about: AboutType;
}>(() => API_ROUTES.aboutSection + `/${props.slug}`, {
  lazy: true,
  server: props.server
})

</script>

<template>
  <div>
    <template v-if="!pending && data">
      <div :class="`enrolled-area-two ${props.first ? 'pt-70' : ''} pb-70`">
        <div class="container">
          <div class="row align-items-center">
            <div v-if="props.heading_center" class="col-lg-12">
              <div class="section-title text-center mb-3">
                <h2 v-html="data.about.heading" />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="enrolled-img-three mb-30 pr-20">
                <NuxtImg
                  format="webp"
                  preload
                  loading="eager"
                  width="777px"
                  :src="data.about.image"
                  :alt="data.about.image_alt"
                  :title="data.about.image_title"
                />
                <div class="enrolled-img-content">
                  <NuxtImg
                    format="webp"
                    loading="lazy"
                    placeholder="/images/placeholder.webp"
                    :src="data.about.counter_image"
                    :alt="data.about.counter_title"
                    :title="data.about.counter_title"
                  />
                  <div class="content">
                    <h3 v-html="data.about.counter_title" />
                    <p v-html="data.about.counter_description" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="enrolled-content mb-30">
                <div class="section-title">
                  <h2 v-if="!props.heading_center" v-html="data.about.heading" />
                  <div v-html="data.about.description" />
                </div>
                <div class="text-center-sm">
                  <NuxtLink noPrefetch to="/leadership-team" class="default-btn border-radius-50" aria-label="View Leaders">
                    View Leaders
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <el-skeleton style="width: 100%" animated>
        <template #template>
          <div :class="`enrolled-area-two pt-100 pb-70`">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-lg-6">
                  <div class="enrolled-img-three mb-30 pr-20">
                    <el-skeleton-item variant="image" style="width: 100%; height: 440px;" />
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="enrolled-content mb-30">
                    <div class="section-title">
                      <el-skeleton-item variant="p" style="width: 50%" />
                      <br>
                      <el-skeleton-item variant="text" style="width: 100%;" />
                      <br>
                      <el-skeleton-item variant="text" style="width: 100%;" />
                      <br>
                      <el-skeleton-item variant="text" style="width: 100%;" />
                      <br>
                      <el-skeleton-item variant="text" style="width: 100%;" />
                      <br>
                      <el-skeleton-item variant="text" style="width: 100%;" />
                      <br>
                      <el-skeleton-item variant="text" style="width: 100%;" />
                      <br>
                      <el-skeleton-item variant="text" style="width: 100%;" />
                      <br>
                      <el-skeleton-item variant="text" style="width: 100%;" />
                      <br>
                      <el-skeleton-item variant="text" style="width: 100%;" />
                      <br>
                      <el-skeleton-item variant="text" style="width: 100%;" />
                      <br>
                      <el-skeleton-item variant="text" style="width: 50%;" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </template>
  </div>
</template>
