<script setup lang="ts">
import { API_ROUTES } from '../utils/api_routes'
import { type BranchType, type AchieverCategory } from '../utils/types'

const { status, signOut } = useAuth()
const route = useRoute()
const drawer = useState('drawer', () => false)

const logout = async () => await signOut()

const drawerToggler = () => (drawer.value = !drawer.value)

watch(() => route.fullPath, () => {
  drawer.value = false
})

const { data: achieverCategoryData, pending: achieverCategoryPending } =
  await useSSRFetch<{
    achiverCategory: AchieverCategory[];
  }>(() => API_ROUTES.achieverCategory, {
    key: 'achiever_category_header',
    lazy: true
  })

const { data: branchData, pending: branchPending } = await useSSRFetch<{
  branch: BranchType[];
}>(() => API_ROUTES.branch + '/all', {
  key: 'branch_header',
  lazy: true
})
</script>

<template>
  <div>
    <header class="top-header">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-lg-9 col-md-8">
            <div class="header-left">
              <ul>
                <li>
                  <span class="svg-icon">
                    <Icon name="fa6-solid:phone" />
                  </span>
                  <a
                    href="tel:+917676642258"
                    aria-label="76766 42258"
                  >76766 42258</a>
                </li>
                <li>
                  <span class="svg-icon">
                    <Icon name="fa6-solid:envelope" />
                  </span>
                  <a
                    href="mailto:info@aaaedu.in"
                    aria-label="info@aaaedu.in"
                  ><span>info@aaaedu.in</span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-md-4">
            <div class="header-right">
              <ul class="social-list">
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
        </div>
      </div>
    </header>

    <div id="navbar" class="navbar-area">
      <div class="mobile-responsive-nav">
        <div class="container">
          <div class="mobile-responsive-menu">
            <div class="logo">
              <NuxtLink to="/" aria-label="home page">
                <NuxtImg
                  id="logo-one-mobile"
                  src="/images/logos/logo-sm.webp"
                  class="logo-one mobile-logo"
                  alt="logo"
                />
                <NuxtImg
                  id="logo-two-mobile"
                  src="/images/logos/logo-sm.webp"
                  class="logo-two mobile-logo"
                  alt="logo"
                />
              </NuxtLink>
            </div>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="drawerToggler"
            >
              <span class="svg-icon">
                <Icon name="fa6-solid:bars" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div class="desktop-nav nav-area">
        <div class="container-fluid">
          <nav class="navbar navbar-expand-md navbar-light">
            <NuxtLink to="/" class="navbar-brand" aria-label="home page">
              <NuxtImg
                id="logo-one"
                src="/images/logos/new-logo.webp"
                class="logo-one"
                alt="Logo"
              />
              <NuxtImg
                id="logo-two"
                src="/images/logos/logo-sm.webp"
                class="logo-two"
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
                    to="/about-us"
                    aria-label="about us page"
                    :class="`nav-link dropdown-toggle ${($route.path.includes('about-us') || $route.path.includes('mission-vision') || $route.path.includes('leadership-team') || $route.path.includes('testimonial') || $route.path.includes('careers')) && 'nuxt-link-active'}`"
                  >
                    About Us
                  </NuxtLink>
                  <ul class="dropdown-menu">
                    <li class="nav-item">
                      <NuxtLink
                        to="/mission-vision"
                        aria-label="mission & vision page"
                        :class="`nav-link ${$route.path.includes('mission-vision') && 'nuxt-link-active'}`"
                      >
                        Mission & Vision
                      </NuxtLink>
                    </li>
                    <li class="nav-item">
                      <NuxtLink
                        to="/leadership-team"
                        aria-label="leadership team & faculty page"
                        :class="`nav-link ${$route.path.includes('leadership-team') && 'nuxt-link-active'}`"
                      >
                        Leadership Team & Faculty
                      </NuxtLink>
                    </li>
                    <li class="nav-item">
                      <NuxtLink
                        to="/testimonial"
                        aria-label="testimonial page"
                        :class="`nav-link ${$route.path.includes('testimonial') && 'nuxt-link-active'}`"
                      >
                        Testimonial
                      </NuxtLink>
                    </li>
                    <li class="nav-item">
                      <NuxtLink
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
                    to="#"
                    :class="`nav-link dropdown-toggle ${$route.path.includes('courses') && 'nuxt-link-active'}`"
                  >
                    Courses
                  </NuxtLink>
                  <ul v-if="branchPending" class="dropdown-menu">
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
                      !branchPending &&
                        branchData &&
                        branchData.branch.length > 0
                    "
                    class="dropdown-menu"
                  >
                    <li
                      v-for="(item, i) in branchData.branch"
                      :key="i"
                      class="nav-item"
                    >
                      <NuxtLink
                        to="#"
                        :class="`nav-link dropdown-toggle ${$route.path.includes(item.slug) && 'nuxt-link-active'}`"
                      >
                        {{ item.name }}
                      </NuxtLink>
                      <ul class="dropdown-menu">
                        <li class="nav-item">
                          <NuxtLink
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
                          <NuxtLink to="#" class="nav-link dropdown-toggle">
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
                          <NuxtLink to="#" class="nav-link dropdown-toggle">
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
                    to="#"
                    :class="`nav-link dropdown-toggle ${$route.path.includes('achievers') && 'nuxt-link-active'}`"
                  >
                    Achievers
                  </NuxtLink>
                  <ul v-if="achieverCategoryPending" class="dropdown-menu">
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
                      !achieverCategoryPending &&
                        achieverCategoryData &&
                        achieverCategoryData.achiverCategory.length > 0
                    "
                    class="dropdown-menu"
                  >
                    <li
                      v-for="(item, i) in achieverCategoryData.achiverCategory"
                      :key="i"
                      class="nav-item"
                    >
                      <template
                        v-if="
                          !achieverCategoryPending &&
                            achieverCategoryData &&
                            achieverCategoryData.achiverCategory.length > 0
                        "
                      >
                        <NuxtLink
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
                    to="#"
                    :class="`nav-link dropdown-toggle ${($route.path.includes('knowledge-desk') || $route.path.includes('expert-tips') || $route.path.includes('faq') || $route.path.includes('vrddhi') || $route.path.includes('online-tests')) && 'nuxt-link-active'}`"
                  >
                    Knowledge Desk
                  </NuxtLink>
                  <ul class="dropdown-menu">
                    <li class="nav-item">
                      <NuxtLink
                        to="/knowledge-desk"
                        aria-label="blog page"
                        :class="`nav-link ${$route.path.includes('knowledge-desk') && 'nuxt-link-active'}`"
                      >
                        Blogs
                      </NuxtLink>
                    </li>
                    <li class="nav-item">
                      <NuxtLink
                        to="/expert-tips"
                        aria-label="expert tips page"
                        :class="`nav-link ${$route.path.includes('expert-tips') && 'nuxt-link-active'}`"
                      >
                        Expert Tips
                      </NuxtLink>
                    </li>
                    <li class="nav-item">
                      <NuxtLink
                        to="/online-tests"
                        aria-label="test page"
                        :class="`nav-link ${$route.path.includes('online-tests') && 'nuxt-link-active'}`"
                      >
                        Online Tests
                      </NuxtLink>
                    </li>
                    <li class="nav-item">
                      <NuxtLink
                        to="/faq"
                        aria-label="faq page"
                        :class="`nav-link ${$route.path.includes('faq') && 'nuxt-link-active'}`"
                      >
                        FAQ
                      </NuxtLink>
                    </li>
                    <li class="nav-item">
                      <NuxtLink
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
                    to="/events"
                    aria-label="upcoming events page"
                    :class="`nav-link ${$route.path.includes('events') && 'nuxt-link-active'}`"
                  >
                    Upcoming Events
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink
                    to="/contact-us"
                    aria-label="contact us page"
                    :class="`nav-link ${$route.path.includes('contact-us') && 'nuxt-link-active'}`"
                  >
                    Contact Us
                  </NuxtLink>
                </li>
                <li v-if="status === 'unauthenticated'" class="nav-item">
                  <NuxtLink
                    to="/auth/sign-in"
                    aria-label="sign in page"
                    :class="`nav-link ${$route.path.includes('auth/sign-in') && 'nuxt-link-active'}`"
                  >
                    Sign In
                  </NuxtLink>
                </li>
                <li v-else-if="status === 'authenticated'" class="nav-item">
                  <NuxtLink
                    to="#"
                    :class="`nav-link dropdown-toggle ${$route.path.includes('profile') && 'nuxt-link-active'}`"
                  >
                    Account
                  </NuxtLink>
                  <ul class="dropdown-menu" style="left: unset; right: 0">
                    <li class="nav-item">
                      <NuxtLink
                        to="/profile"
                        aria-label="profile page"
                        :class="`nav-link ${$route.path.includes('profile') && 'nuxt-link-active'}`"
                      >
                        Profile
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
      <el-drawer
        v-model="drawer"
        title="Arjunaa Academy for Achievers"
        size="80%"
        direction="rtl"
      >
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <NuxtLink to="/" aria-label="home page">
              <i class="el-icon-s-home" />
              <span>Home</span>
            </NuxtLink>
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <i class="el-icon-reading" />
              <span>Courses</span>
            </template>
            <el-sub-menu
              v-for="(item, i) in branchData?.branch"
              :key="i"
              :index="`1-${i}`"
            >
              <template
                v-if="
                  !branchPending && branchData && branchData.branch.length > 0
                "
                #title
              >
                <p>{{ item.name }}</p>
              </template>
              <el-sub-menu :index="`1-${i}-1`">
                <template #title>
                  School
                </template>
                <template v-for="(it, index) in item.courses" :key="index">
                  <NuxtLink
                    v-if="it.class == 'School (STD VIII to X)'"
                    :aria-label="it.name"
                    :to="`/${item.slug}/courses/${it.slug}`"
                  >
                    <el-menu-item :index="`1-${i}-3-${index}`">
                      <span>{{ it.name }}</span>
                    </el-menu-item>
                  </NuxtLink>
                </template>
              </el-sub-menu>
              <el-sub-menu :index="`1-${i}-2`">
                <template #title>
                  Senior Secondary
                </template>
                <template v-for="(it, index) in item.courses" :key="index">
                  <NuxtLink
                    v-if="it.class == 'Senior Secondary (XI, XII, PU)'"
                    :aria-label="it.name"
                    :to="`/${item.slug}/courses/${it.slug}`"
                  >
                    <el-menu-item :index="`1-${i}-3-${index}`">
                      <span>{{ it.name }}</span>
                    </el-menu-item>
                  </NuxtLink>
                </template>
              </el-sub-menu>
              <el-sub-menu :index="`1-${i}-3`">
                <template #title>
                  Online
                </template>
                <template v-for="(it, index) in item.courses" :key="index">
                  <NuxtLink
                    v-if="it.class == 'Online'"
                    :aria-label="it.name"
                    :to="`/${item.slug}/courses/${it.slug}`"
                  >
                    <el-menu-item :index="`1-${i}-3-${index}`">
                      <span>{{ it.name }}</span>
                    </el-menu-item>
                  </NuxtLink>
                </template>
              </el-sub-menu>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <i class="el-icon-school" />
              <span>About Us</span>
            </template>
            <NuxtLink to="/mission-vision" aria-label="mission & vision page">
              <el-menu-item index="3-1">
                Mission & Vision
              </el-menu-item>
            </NuxtLink>
            <NuxtLink
              to="/leadership-team"
              aria-label="leadership team & faculty page"
            >
              <el-menu-item index="3-2">
                Leadership Team & Faculty
              </el-menu-item>
            </NuxtLink>
            <NuxtLink to="/testimonial" aria-label="testimonial page">
              <el-menu-item index="3-3">
                Testimonial
              </el-menu-item>
            </NuxtLink>
            <NuxtLink to="/careers" aria-label="careers page">
              <el-menu-item index="3-4">
                Careers
              </el-menu-item>
            </NuxtLink>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <i class="el-icon-trophy" />
              <span>Achievers</span>
            </template>
            <NuxtLink
              v-for="(item, i) in achieverCategoryData?.achiverCategory"
              :key="i"
              :to="`/achievers/${item.slug}`"
              :aria-label="item.name"
            >
              <template
                v-if="
                  !achieverCategoryPending &&
                    achieverCategoryData &&
                    achieverCategoryData.achiverCategory.length > 0
                "
              >
                <el-menu-item :index="`4-${i + 1}`">
                  <span>{{ item.name }}</span>
                </el-menu-item>
              </template>
            </NuxtLink>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <i class="el-icon-notebook-2" />
              <span>Knowledge Desk</span>
            </template>
            <NuxtLink to="/knowledge-desk" aria-label="blogs page">
              <el-menu-item index="5-1">
                Blogs
              </el-menu-item>
            </NuxtLink>
            <NuxtLink to="/expert-tips" aria-label="expert tips page">
              <el-menu-item index="5-2">
                Expert Tips
              </el-menu-item>
            </NuxtLink>
            <NuxtLink to="/online-tests" aria-label="online test page">
              <el-menu-item index="5-5">
                Online Tests
              </el-menu-item>
            </NuxtLink>
            <NuxtLink to="/faq" aria-label="tips page">
              <el-menu-item index="5-3">
                Faq
              </el-menu-item>
            </NuxtLink>
            <NuxtLink to="/vrddhi" aria-label="vrddhi page">
              <el-menu-item index="5-4">
                Vrddhi
              </el-menu-item>
            </NuxtLink>
          </el-sub-menu>
          <el-menu-item index="6">
            <NuxtLink to="/events" aria-label="upcoming events page">
              <i class="el-icon-data-analysis" />
              <span>Upcoming Events</span>
            </NuxtLink>
          </el-menu-item>
          <el-menu-item index="7">
            <NuxtLink to="/contact-us" aria-label="contact us page">
              <i class="el-icon-service" />
              <span>Contact Us</span>
            </NuxtLink>
          </el-menu-item>
          <el-menu-item v-if="status === 'unauthenticated'" index="8">
            <NuxtLink to="/auth/sign-in" aria-label="sign in page">
              <i class="el-icon-user" />
              <span>Sign In</span>
            </NuxtLink>
          </el-menu-item>
          <el-sub-menu v-else-if="status === 'authenticated'" index="9">
            <template #title>
              <i class="el-icon-user" />
              <span>Account</span>
            </template>
            <NuxtLink to="/profile" aria-label="profile page">
              <el-menu-item index="9-1">
                Profile
              </el-menu-item>
            </NuxtLink>
            <el-menu-item
              index="9-2"
              aria-label="logout page"
              @click="logout"
            >
              Logout
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-drawer>
    </div>
  </div>
</template>
