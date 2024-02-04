<script setup lang="ts">
const dialogVideoVisible = ref(false)
const dialogBannerVisible = ref(true)
</script>

<template>
  <div>
    <SeoHeader slug="about-page" />

    <BreadCrumb
      title="About Us"
      :pages="[
        {
          link:'',
          name:'About Us'
        }
      ]"
    />

    <WhoWeAreCard
      :first="true"
      slug="about-page"
    />

    <div class="play-area ptb-100">
      <div class="container">
        <div class="title text-center mb-45">
          <h2>
            "A <span>leader</span> is one who knows the way, goes the way & shows the way"
          </h2>
        </div>
        <div class="play-btn-area" data-aos="fade-up">
          <a href="javascript:void(0)" class="play-btn" aria-label="Video Popup" @click="dialogVideoVisible = true">
            <i class="flaticon-play-button-arrowhead" />
          </a>
        </div>
      </div>
    </div>

    <CounterComponent />

    <WhatWeDoCard heading="Why choose Arjunaa Academy for Achievers?" slug="about-page" :server="false" />

    <el-dialog v-model="dialogVideoVisible" title="Hareesh PK" width="90%" top="20px">
      <iframe
        v-if="dialogVideoVisible"
        src="https://www.youtube.com/embed/sfCJJZ0Wmi8?rel=0&autoplay=1&loop=1"
        frameborder="0"
        width="100%"
        height="550"
        allowfullscreen
      />
    </el-dialog>

    <el-dialog v-model="dialogBannerVisible" title="ARJUNAA ACADEMY FOR ACHIEVERS" width="80%" top="10vh">
      <NuxtImg placeholder="/images/placeholder.webp" src="/images/jee-main.webp" title="ARJUNAA ACADEMY FOR ACHIEVERS" alt="ARJUNAA ACADEMY FOR ACHIEVERS" class="w-100" />
    </el-dialog>
  </div>
</template>
