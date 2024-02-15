<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel'
import { API_ROUTES } from '../utils/api_routes'
import type { BannerType } from '../utils/types'

const { data, pending } = await useSSRFetch<{
  banner: BannerType[]
}>(() => API_ROUTES.bannerSection, {
  key: 'banner_slider',
  lazy: true,
  server: true
})

</script>

<template>
  <div class="hero-slider-area">
    <BannerCardLoading v-if="pending" />
    <div v-if="!pending && data && data.banner.length>0" class="hero-slider owl-carousel owl-theme">
      <Carousel>
        <Slide v-for="(item, i) in data.banner" :key="i">
          <div class="single-swiper-slider">
            <div class="hero-item">
              <div class="container-fluid">
                <div class="row align-items-center">
                  <div class="col-lg-6 order-2-sm">
                    <div class="hero-content">
                      <span class="top-title" v-html="item.title" />
                      <h1 v-html="item.heading" />
                      <p v-html="item.description" />
                      <div class="banner-btn">
                        <a :href="item.button_link" target="_blank" class="default-btn border-radius-50" :aria-label="item.button_text" v-html="item.button_text" />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 order-1-sm">
                    <div class="hero-img">
                      <NuxtImg
                        format="webp"
                        width="753px"
                        height="754px"
                        loading="eager"
                        :src="item.banner_image"
                        class="hero"
                        :alt="item.banner_image_alt"
                        :title="item.banner_image_title"
                      />
                      <div class="hero-bg-shape">
                        <NuxtImg
                          preload
                          loading="eager"
                          format="webp"
                          src="/images/home-three/bg-shape1.webp"
                          class="bg-img-shape1"
                          alt="Hero"
                        />
                      </div>
                      <div class="top-content">
                        <div class="hero-img-content">
                          <NuxtImg
                            format="webp"
                            placeholder="/images/placeholder.webp"
                            loading="lazy"
                            width="512px"
                            height="512px"
                            :src="item.counter_image_1"
                            :alt="item.counter_title_1"
                            :title="item.counter_title_1"
                          />
                          <div class="content">
                            <h3 v-html="item.counter_title_1" />
                            <p v-html="item.counter_description_1" />
                          </div>
                        </div>
                      </div>
                      <div class="right-content">
                        <div class="hero-img-content">
                          <NuxtImg
                            format="webp"
                            placeholder="/images/placeholder.webp"
                            loading="lazy"
                            width="512px"
                            height="512px"
                            :src="item.counter_image_2"
                            :alt="item.counter_title_2"
                            :title="item.counter_title_2"
                          />
                          <div class="content">
                            <h3 v-html="item.counter_title_2" />
                            <p v-html="item.counter_description_2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
      </Carousel>
    </div>
    <div class="hero-shape">
      <div class="shape1">
        <NuxtImg
          format="webp"
          loading="lazy"
          src="/images/home-three/shape.png"
          height="50px"
          alt="Shape"
        />
      </div>
      <div class="shape2">
        <NuxtImg
          format="webp"
          loading="lazy"
          src="/images/home-three/shape2.png"
          height="50px"
          alt="Shape"
        />
      </div>
    </div>
  </div>
</template>
