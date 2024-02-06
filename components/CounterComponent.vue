<script setup lang="ts">
import { API_ROUTES } from '../utils/api_routes'
import { type CounterType } from '../utils/types'

const { data, pending } = useSSRFetch<{
  counter: CounterType[];
}>(API_ROUTES.counter, {
  lazy: true,
  server: false
})
</script>

<template>
  <div class="counter-area-three pb-70">
    <div class="container">
      <div v-if="pending" class="row justify-content-center">
        <div v-for="i in 4" :key="i" class="col-lg-3 col-md-6 col-sm-12">
          <el-skeleton style="width: 100%" animated>
            <template #template>
              <div class="counter-card box-shadow px-1">
                <el-skeleton-item variant="circle" style="width: 100px; height: 100px;" />
                <el-skeleton-item variant="p" style="width: 50%" />
                <br>
              </div>
            </template>
          </el-skeleton>
        </div>
      </div>
      <div v-if="!pending && data && data.counter.length>0" class="row">
        <div v-for="(item, i) in data.counter" :key="i" class="col-lg-3 col-md-6 col-sm-6">
          <div class="counter-card box-shadow">
            <div class="row align-item-center">
              <NuxtImg
                loading="lazy"
                format="webp"
                placeholder="/images/placeholder.webp"
                :src="item.image"
                :alt="item.image_alt"
                :title="item.image_title"
                style="height: 80px; object-fit: contain; width: auto !important;"
              />
              <div class="col-lg-auto col-md-auto col-sm-12 counter-card-content">
                <h3><span class="odometer">{{ item.counter }}</span>+</h3>
                <p v-html="item.title" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
