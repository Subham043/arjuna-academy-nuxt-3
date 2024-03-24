<script setup lang="ts">
import type { BranchType, AchieverCategory } from '../utils/types'
const props = defineProps({
  branch_data: {
    type: Array<BranchType>,
    default: []
  },
  achiver_category: {
    type: Array<AchieverCategory>,
    default: []
  },
  achiever_category_pending: {
    type: Boolean,
    default: true
  },
  branch_pending: {
    type: Boolean,
    default: true
  }
})
const { status, signOut } = useAuth()
const logout = async () => await signOut()
</script>

<template>
  <div class="desktop-nav nav-area">
    <div class="container-fluid">
      <nav class="navbar navbar-expand-md navbar-light">
        <NuxtLink noPrefetch to="/" class="navbar-brand" aria-label="home page">
          <NuxtImg
            id="logo-one"
            format="webp"
            src="/images/logos/new-logo.webp"
            class="logo-one"
            alt="Logo"
          />
        </NuxtLink>

        <div
          id="navbarSupportedContent"
          class="collapse navbar-collapse mean-menu"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <NuxtLink
                noPrefetch
                to="/about-us"
                aria-label="about us page"
                :class="`nav-link dropdown-toggle ${($route.path.includes('about-us') || $route.path.includes('mission-vision') || $route.path.includes('leadership-team') || $route.path.includes('testimonial') || $route.path.includes('careers')) && 'nuxt-link-active'}`"
              >
                About Us
              </NuxtLink>
              <ul class="dropdown-menu">
                <li class="nav-item">
                  <NuxtLink
                    noPrefetch
                    to="/mission-vision"
                    aria-label="mission & vision page"
                    :class="`nav-link ${$route.path.includes('mission-vision') && 'nuxt-link-active'}`"
                  >
                    Mission & Vision
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink
                    noPrefetch

                    to="/leadership-team"
                    aria-label="leadership team & faculty page"
                    :class="`nav-link ${$route.path.includes('leadership-team') && 'nuxt-link-active'}`"
                  >
                    Leadership Team & Faculty
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink
                    noPrefetch

                    to="/testimonial"
                    aria-label="testimonial page"
                    :class="`nav-link ${$route.path.includes('testimonial') && 'nuxt-link-active'}`"
                  >
                    Testimonial
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink
                    noPrefetch

                    to="/careers"
                    aria-label="careers page"
                    :class="`nav-link ${$route.path.includes('careers') && 'nuxt-link-active'}`"
                  >
                    Careers
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <NuxtLink
                noPrefetch

                to="#"
                :class="`nav-link dropdown-toggle ${$route.path.includes('courses') && 'nuxt-link-active'}`"
              >
                Courses
              </NuxtLink>
              <ul v-if="props.branch_pending" class="dropdown-menu">
                <el-skeleton style="width: 100%" animated>
                  <template #template>
                    <li v-for="i in 4" :key="i" class="nav-item">
                      <el-skeleton-item variant="p" style="width: 100%" />
                      <br>
                    </li>
                  </template>
                </el-skeleton>
              </ul>
              <ul
                v-if="
                  !props.branch_pending && props.branch_data.length > 0
                "
                class="dropdown-menu"
              >
                <li
                  v-for="(item, i) in props.branch_data"
                  :key="i"
                  class="nav-item"
                >
                  <NuxtLink
                    noPrefetch
                    to="#"
                    :class="`nav-link dropdown-toggle ${$route.path.includes(item.slug) && 'nuxt-link-active'}`"
                  >
                    {{ item.name }}
                  </NuxtLink>
                  <ul class="dropdown-menu">
                    <li class="nav-item">
                      <NuxtLink
                        noPrefetch
                        to="#"
                        class="nav-link dropdown-toggle"
                      >
                        School (STD VIII to X)
                      </NuxtLink>
                      <ul class="dropdown-menu">
                        <li
                          v-for="(it, index) in item.courses"
                          :key="index"
                          class="nav-item"
                        >
                          <template
                            v-if="it.class === 'School (STD VIII to X)'"
                          >
                            <NuxtLink
                              noPrefetch
                              :to="`/${item.slug}/courses/${it.slug}`"
                              :aria-label="it.name"
                              :class="`nav-link ${$route.path.includes(it.slug) && 'nuxt-link-active'}`"
                            >
                              {{ it.name }}
                            </NuxtLink>
                          </template>
                        </li>
                      </ul>
                    </li>
                    <li class="nav-item">
                      <NuxtLink noPrefetch to="#" class="nav-link dropdown-toggle">
                        Senior Secocndary (XI, XII, PU)
                      </NuxtLink>
                      <ul class="dropdown-menu">
                        <li
                          v-for="(it, index) in item.courses"
                          :key="index"
                          class="nav-item"
                        >
                          <template
                            v-if="
                              it.class === 'Senior Secondary (XI, XII, PU)'
                            "
                          >
                            <NuxtLink
                              noPrefetch
                              :to="`/${item.slug}/courses/${it.slug}`"
                              :aria-label="it.name"
                              :class="`nav-link ${$route.path.includes(it.slug) && 'nuxt-link-active'}`"
                            >
                              {{ it.name }}
                            </NuxtLink>
                          </template>
                        </li>
                      </ul>
                    </li>
                    <li class="nav-item">
                      <NuxtLink noPrefetch to="#" class="nav-link dropdown-toggle">
                        Online
                      </NuxtLink>
                      <ul class="dropdown-menu">
                        <li
                          v-for="(it, index) in item.courses"
                          :key="index"
                          class="nav-item"
                        >
                          <template v-if="it.class === 'Online'">
                            <NuxtLink
                              noPrefetch
                              :to="`/${item.slug}/courses/${it.slug}`"
                              :aria-label="it.name"
                              :class="`nav-link ${$route.path.includes(it.slug) && 'nuxt-link-active'}`"
                            >
                              {{ it.name }}
                            </NuxtLink>
                          </template>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <NuxtLink
                noPrefetch
                to="#"
                :class="`nav-link dropdown-toggle ${$route.path.includes('achievers') && 'nuxt-link-active'}`"
              >
                Achievers
              </NuxtLink>
              <ul v-if="props.achiever_category_pending" class="dropdown-menu">
                <el-skeleton style="width: 100%" animated>
                  <template #template>
                    <li v-for="i in 4" :key="i" class="nav-item">
                      <el-skeleton-item variant="p" style="width: 100%" />
                      <br>
                    </li>
                  </template>
                </el-skeleton>
              </ul>
              <ul
                v-if="
                  !props.achiever_category_pending && props.achiver_category.length > 0
                "
                class="dropdown-menu"
              >
                <li
                  v-for="(item, i) in props.achiver_category"
                  :key="i"
                  class="nav-item"
                >
                  <template
                    v-if="
                      !props.achiever_category_pending && props.achiver_category.length > 0
                    "
                  >
                    <NuxtLink
                      noPrefetch
                      :to="`/achievers/${item.slug}`"
                      :aria-label="item.name"
                      :class="`nav-link ${$route.path.includes(item.slug) && 'nuxt-link-active'}`"
                    >
                      {{ item.name }}
                    </NuxtLink>
                  </template>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <NuxtLink
                noPrefetch
                to="#"
                :class="`nav-link dropdown-toggle ${($route.path.includes('knowledge-desk') || $route.path.includes('expert-tips') || $route.path.includes('faq') || $route.path.includes('vrddhi') || $route.path.includes('online-tests')) && 'nuxt-link-active'}`"
              >
                Knowledge Desk
              </NuxtLink>
              <ul class="dropdown-menu">
                <li class="nav-item">
                  <NuxtLink
                    noPrefetch
                    to="/knowledge-desk"
                    aria-label="blog page"
                    :class="`nav-link ${$route.path.includes('knowledge-desk') && 'nuxt-link-active'}`"
                  >
                    Blogs
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink
                    noPrefetch
                    to="/expert-tips"
                    aria-label="expert tips page"
                    :class="`nav-link ${$route.path.includes('expert-tips') && 'nuxt-link-active'}`"
                  >
                    Expert Tips
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink
                    noPrefetch
                    to="/online-tests"
                    aria-label="test page"
                    :class="`nav-link ${$route.path.includes('online-tests') && 'nuxt-link-active'}`"
                  >
                    Online Tests
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink
                    noPrefetch
                    to="/faq"
                    aria-label="faq page"
                    :class="`nav-link ${$route.path.includes('faq') && 'nuxt-link-active'}`"
                  >
                    FAQ
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink
                    noPrefetch
                    to="/vrddhi"
                    aria-label="vrddhi page"
                    :class="`nav-link ${$route.path.includes('vrddhi') && 'nuxt-link-active'}`"
                  >
                    Vrddhi
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <NuxtLink
                noPrefetch
                to="/events"
                aria-label="upcoming events page"
                :class="`nav-link ${$route.path.includes('events') && 'nuxt-link-active'}`"
              >
                Upcoming Events
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                noPrefetch
                to="/contact-us"
                aria-label="contact us page"
                :class="`nav-link ${$route.path.includes('contact-us') && 'nuxt-link-active'}`"
              >
                Contact Us
              </NuxtLink>
            </li>
            <li v-if="status === 'unauthenticated'" class="nav-item">
              <NuxtLink
                noPrefetch
                to="/auth/sign-in"
                aria-label="sign in page"
                :class="`nav-link ${$route.path.includes('auth/sign-in') && 'nuxt-link-active'}`"
              >
                Sign In
              </NuxtLink>
            </li>
            <li v-else-if="status === 'authenticated'" class="nav-item">
              <NuxtLink
                noPrefetch
                to="#"
                :class="`nav-link dropdown-toggle ${($route.path.includes('profile') || $route.path.includes('course-enrolled') || $route.path.includes('test-enrolled')) && 'nuxt-link-active'}`"
              >
                Account
              </NuxtLink>
              <ul class="dropdown-menu" style="left: unset; right: 0">
                <li class="nav-item">
                  <NuxtLink
                    noPrefetch
                    to="/profile"
                    aria-label="profile page"
                    :class="`nav-link ${$route.path.includes('profile') && 'nuxt-link-active'}`"
                  >
                    Profile
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink
                    noPrefetch
                    to="/course-enrolled"
                    aria-label="course enrolled page"
                    :class="`nav-link ${$route.path.includes('course-enrolled') && 'nuxt-link-active'}`"
                  >
                    Course Enrolled
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink
                    noPrefetch
                    to="/test-enrolled"
                    aria-label="test enrolled page"
                    :class="`nav-link ${$route.path.includes('test-enrolled') && 'nuxt-link-active'}`"
                  >
                    Test Enrolled
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <a
                    href="javascript:void(0)"
                    aria-label="logout page"
                    class="nav-link"
                    @click="logout"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>
