<script setup lang="ts">
import { API_ROUTES } from '../utils/api_routes'
import { type LegalType } from '../utils/types'

const { data: legalData, pending } = await useSSRFetch<{
  legal: LegalType[];
}>(API_ROUTES.legal, {
  lazy: true,
  server: false
})
</script>
<template>
  <footer class="footer-area">
    <div class="container pt-3">
      <div class="row">
        <div class="col-lg-12 col-sm-12 mb-3">
          <div class="footer-widget text-center">
            <div class="footer-logo">
              <NuxtLink noPrefetch to="/">
                <NuxtImg
                  loading="lazy"
                  format="webp"
                  placeholder="/images/placeholder.webp"
                  src="/images/logos/new-logo.webp"
                  alt="Images"
                  aria-label="home page"
                />
              </NuxtLink>
            </div>
            <ul class="social-link">
              <li>
                <a
                  href="https://www.facebook.com/www.aaaedu.in/"
                  target="_blank"
                  aria-label="facebook page"
                >
                  <span class="svg-icon">
                    <Icon name="fa6-brands:facebook-f" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/academy_arjunaa"
                  target="_blank"
                  aria-label="twitter page"
                >
                  <span class="svg-icon">
                    <Icon name="fa6-brands:twitter" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/arjunaa_academy_for_achievers/"
                  target="_blank"
                  aria-label="instagram page"
                >
                  <span class="svg-icon">
                    <Icon name="fa6-brands:instagram" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://in.linkedin.com/company/arjunaa-academy-for-achievers"
                  target="_blank"
                  aria-label="linkedin page"
                >
                  <span class="svg-icon">
                    <Icon name="fa6-brands:linkedin" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCcPOkcZ_YGpTMcVnLJQYLPA"
                  target="_blank"
                  aria-label="youtube page"
                >
                  <span class="svg-icon">
                    <Icon name="fa6-brands:youtube" />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="footer-widget ps-5">
            <h3>About us</h3>
            <ul class="footer-list">
              <li>
                <NuxtLink noPrefetch to="/about-us" aria-label="about us page">
                  About Us
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  noPrefetch
                  to="/mission-vision"
                  aria-label="mission & vision page"
                >
                  Mission & Vision
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  noPrefetch
                  to="/leadership-team"
                  aria-label="leadership team & faculty page"
                >
                  Leadership Team & Faculty
                </NuxtLink>
              </li>
              <li>
                <NuxtLink noPrefetch to="/testimonial" aria-label="testimonial page">
                  Testimonial
                </NuxtLink>
              </li>
              <li>
                <NuxtLink noPrefetch to="/careers" aria-label="contact us page">
                  Careers
                </NuxtLink>
              </li>
              <li>
                <NuxtLink noPrefetch to="/contact-us" aria-label="contact us page">
                  Contact Us
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="footer-widget ps-5">
            <h3>Resources</h3>
            <ul class="footer-list">
              <li>
                <NuxtLink noPrefetch to="/knowledge-desk" aria-label="knowledge desk page">
                  Knowledge Desk
                </NuxtLink>
              </li>
              <li>
                <NuxtLink noPrefetch to="/expert-tips" aria-label="expert tips page">
                  Expert Tips
                </NuxtLink>
              </li>
              <li>
                <NuxtLink noPrefetch to="/faq" aria-label="faq page">
                  FAQ
                </NuxtLink>
              </li>
              <li>
                <NuxtLink noPrefetch to="/gallery" aria-label="gallery page">
                  Gallery
                </NuxtLink>
              </li>
              <li>
                <NuxtLink noPrefetch to="/events" aria-label="events page">
                  Events
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  noPrefetch
                  to="/2-year-integrated-day-scholar-and-residential-program"
                  aria-label="Day Scholar / Residential"
                >
                  Day Scholar / Residential
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="footer-widget ps-5">
            <h3>Legal</h3>
            <ul v-if="pending" class="footer-list">
              <el-skeleton style="width: 100%" animated>
                <template #template>
                  <li v-for="i in 4" :key="i">
                    <el-skeleton-item variant="p" style="width: 100%" />
                    <br>
                  </li>
                </template>
              </el-skeleton>
            </ul>
            <ul
              v-if="!pending && legalData && legalData.legal.length > 0"
              class="footer-list"
            >
              <li v-for="(item, i) in legalData.legal" :key="i">
                <NuxtLink
                  noPrefetch
                  :to="`/legal/${item.slug}`"
                  :aria-label="item.page_name"
                >
                  {{ item.page_name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="footer-widget ps-5">
            <h3>Official Info</h3>
            <ul class="footer-contact">
              <li>
                <span class="svg-icon">
                  <Icon name="fa6-solid:map-pin" />
                </span>
                <div class="content">
                  <h4>Location:</h4>
                  <span><a
                    href="https://goo.gl/maps/pDUVxh6ZVWEanYsi6"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="3rd Floor, No.02, CHBCS 1st Layout, 1st Floor, 5th Main, Vijaya Nagar"
                  >3rd Floor, No.02, CHBCS 1st Layout, 1st Floor, 5th Main,
                    Vijaya Nagar</a></span>
                </div>
              </li>
              <li>
                <span class="svg-icon">
                  <Icon name="fa6-solid:envelope" />
                </span>
                <div class="content">
                  <h4>Email:</h4>
                  <span><a
                    href="mailto:info@aaaedu.in"
                    aria-label="info@aaaedu.in"
                  >info@aaaedu.in</a></span>
                </div>
              </li>
              <li>
                <span class="svg-icon">
                  <Icon name="fa6-solid:phone" />
                </span>
                <div class="content">
                  <h4>Phone:</h4>
                  <span><a
                    href="tel:7676642258"
                    aria-label="76766 42258"
                  >76766 42258</a></span><br>
                  <span><a
                    href="tel:8197554516"
                    aria-label="81975 54516"
                  >81975 54516</a></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright-area">
      <div class="container">
        <div class="copy-right-text text-center">
          <p>
            Copyright © {{ new Date().getFullYear() }}
            <NuxtLink
              noPrefetch
              to="/"
              aria-label="Arjunaa Academy for Achievers"
            >
              Arjunaa Academy for Achievers
            </NuxtLink>. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
