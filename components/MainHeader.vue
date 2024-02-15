<script setup lang="ts">
import { API_ROUTES } from '../utils/api_routes'
import { type BranchType, type AchieverCategory } from '../utils/types'

const { width } = useWindowSize()
const route = useRoute()
const drawer = useState<boolean>('drawer', () => false)

const drawerToggler = () => (drawer.value = !drawer.value)

watch(() => route.fullPath, () => {
  drawer.value = false
})

const { data: achieverCategoryData, pending: achieverCategoryPending } =
  await useSSRFetch<{
    achiverCategory: AchieverCategory[];
  }>(() => API_ROUTES.achieverCategory, {
    key: 'achiever_category_header',
    lazy: true,
    server: false
  })

const { data: branchData, pending: branchPending } = await useSSRFetch<{
  branch: BranchType[];
}>(() => API_ROUTES.branch + '/all', {
  key: 'branch_header',
  lazy: true,
  server: false
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
              <NuxtLink noPrefetch to="/" aria-label="home page">
                <NuxtImg
                  id="logo-one-mobile"
                  preload
                  format="webp"
                  src="/images/logos/logo-sm.webp"
                  class="logo-one mobile-logo"
                  alt="logo"
                />
                <NuxtImg
                  id="logo-two-mobile"
                  format="webp"
                  width="60px"
                  height="60px"
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

      <LazyMainHeaderMenu v-if="width > 992" :branch_pending="branchPending" :branch_data="branchData?.branch" :achiever_category_pending="achieverCategoryPending" :achiver_category="achieverCategoryData?.achiverCategory" />
      <LazyMainSideBar v-if="width < 992" :branch_pending="branchPending" :branch_data="branchData?.branch" :achiever_category_pending="achieverCategoryPending" :achiver_category="achieverCategoryData?.achiverCategory" />
    </div>
  </div>
</template>
