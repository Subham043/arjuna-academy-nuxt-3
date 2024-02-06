<script setup lang="ts">
import { API_ROUTES } from '@/utils/api_routes'

const { data, pending } = useSSRFetch<{
  mission: {
    mission: string;
    vision: string;
  }
}>(() => API_ROUTES.mission_vision, {
  key: 'mission_vision',
  lazy: true
})

</script>

<template>
  <div>
    <SeoHeader slug="mission-vision-page" />

    <BreadCrumb
      title="Mission & Vision"
      :pages="[
        {
          link:'',
          name:'Mission & Vision'
        }
      ]"
    />

    <div class="faq-area pt-70 pb-70">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-4">
            <div class="faq-img">
              <NuxtImg
                format="webp"
                loading="lazy"
                placeholder="/images/placeholder.webp"
                src="/images/mission.webp"
                height="300px"
                alt="faq"
              />
              <div class="shape">
                <NuxtImg format="webp" loading="lazy" src="/images/faq-shape.png" height="80px" alt="Faq" />
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="faq-accordion pl-20">
              <ul class="accordion">
                <li class="accordion-item">
                  <h2 class="accordion-title active">
                    Mission
                  </h2>
                  <div class="accordion-content show">
                    <el-skeleton v-if="pending" :rows="6" animated />
                    <p v-else-if="data" v-html="data.mission.mission" />
                  </div>
                </li>
                <li class="accordion-item">
                  <h2 class="accordion-title active">
                    Vision
                  </h2>
                  <div class="accordion-content show">
                    <el-skeleton v-if="pending" :rows="6" animated />
                    <p v-else-if="data" v-html="data.mission.vision" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
