<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'

const isCourseSliderVisible = ref(false)
const isCourseSliderEl = ref<HTMLElement | null>(null)
const isCourseSlidertargetVisible = useElementVisibility(isCourseSliderEl)

watch(
  () => isCourseSlidertargetVisible.value,
  (value) => {
    if (!isCourseSliderVisible.value && value) {
      isCourseSliderVisible.value = true
    }
  }
)

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
</script>

<template>
  <div>
    <SeoHeader
      slug="home-page"
      :schemas="[
        {
          '@context': 'https://schema.org/',
          '@type': 'WebSite',
          name: 'Arjunaa Academy for Achievers',
          url: 'https://www.aaaedu.in/',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.aaaedu.in/?s={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'CollegeOrUniversity',
          name: 'Arjunaa Academy for Achievers',
          alternateName: 'Arjunaa Academy',
          url: 'https://www.aaaedu.in/',
          logo: 'https://www.aaaedu.in/assets/img/new-logo.jpg',
          sameAs: [
            'https://www.facebook.com/www.aaaedu.in/',
            'https://twitter.com/academy_arjunaa',
            'https://www.instagram.com/arjunaa_academy_for_achievers/',
            'https://www.youtube.com/channel/UCcPOkcZ_YGpTMcVnLJQYLPA',
            'https://in.linkedin.com/company/arjunaa-academy-for-achievers'
          ]
        },
        {
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: 'Arjunaa Academy Feedback of Achievers',
          description: 'Students of Arjunaa Academy speak about institute and coaching style and practice. How the institute and coaches help them in preparation of studies and exams.',
          thumbnailUrl: '',
          uploadDate: '2020-05-08',
          publisher: {
            '@type': 'Organization',
            name: 'Arjunaa Academy for Achievers',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.aaaedu.in/assets/img/new-logo.webp',
              width: '',
              height: ''
            }
          },
          contentUrl: 'https://www.youtube.com/watch?v=S9Z9BR_KAz4&list=TLGG6RaqinZghqAxMjExMjAyMQ'
        }
      ]"
    />

    <BannerSlider />

    <CommonFeature />

    <LazyWhoWeAreCard
      :heading_center="true"
      slug="home-page"
    />

    <div ref="isCourseSliderEl">
      <LazyCourseSlider v-if="isCourseSliderVisible" />
    </div>

    <LazyWhatWeDoCard heading="Why Arjunaa Academy for Achievers is the Top Coaching Centre in Bangalore?" slug="home-page" :server="true" />

    <div class="register-area pb-70">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="play-btn-area-two">
              <div class="hero-content text-center" style="max-width: 100% !important; position:relative">
                <span class="top-title">START LEARNING</span>
                <h1 style="color: white !important;">
                  Admission Open For {{ new Date().getFullYear()-1 }} - {{ new Date().getFullYear() }}
                </h1>
                <div class="banner-btn justify-content-center">
                  <a href="/pdf/brochure.pdf" target="_blank" aria-label="Download Brochure" class="default-btn two border-radius-50 mr-2">Download Brochure</a>
                  <el-dropdown>
                    <NuxtLink noPrefetch to="/" class="default-btn border-radius-50 m-0" aria-label="Admission Form">
                      Admission Form
                    </NuxtLink>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>
                          <NuxtLink noPrefetch to="/admission/class-8-9-10" class="text-dark" aria-label="Class 8, 9 & 10">
                            Class 8, 9 & 10
                          </NuxtLink>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <NuxtLink noPrefetch to="/admission/puc" class="text-dark" aria-label="Class 11 or 1st PUC">
                            Class 11 or 1st PUC
                          </NuxtLink>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div ref="isSliderEl">
      <LazyTestimonialSlider v-if="isSliderVisible" />
      <LazyEventSlider v-if="isSliderVisible" />
      <LazyBlogSlider v-if="isSliderVisible" />
    </div>
  </div>
</template>
