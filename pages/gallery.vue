<script setup lang="ts">
import { API_ROUTES } from '../utils/api_routes'
import type { PaginationType, GalleryType } from '../utils/types'

const { $scroll } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const page = ref((route.query.page && !isNaN(+route.query.page)) ? +route.query.page : 1)

const { data, pending } = useSSRFetch<PaginationType<GalleryType>>(() => API_ROUTES.gallery + `?total=12&page=${page.value}`, {
  key: 'staff_' + route.query.page || '1',
  lazy: true,
  watch: [page]
})

const paginationHandler = () => $scroll('#gallery-area', () => router.push({ query: { page: page.value } }))

</script>

<template>
  <div>
    <SeoHeader slug="gallery-page" />

    <BreadCrumb
      title="Gallery"
      :pages="[
        {
          link:'',
          name:'Gallery'
        }
      ]"
    />

    <div id="gallery-area" class="blog-area pt-70 pb-70">
      <div class="container">
        <div class="section-title mb-45 text-center">
          <h2>Photo Gallery</h2>
          <p>
            "Photographs open doors into the past & also allow a look into the future."
          </p>
          <p>
            "Reliving some of the happiest & memorable moments here"
          </p>
        </div>
        <div class="row justify-content-center">
          <BlogCardLoading v-if="pending" :count="6" />
        </div>
        <div v-if="!pending && data && data.data.length>0">
          <viewer :options="{zoom_in: false}" :images="data.data" class="row justify-content-center">
            <div v-for="(item, i) in data.data" :key="i" class="col-lg-4 col-md-6">
              <div class="blog-card">
                <NuxtImg
                  loading="lazy"
                  placeholder="/images/placeholder.webp"
                  :src="item.image"
                  :alt="item.image_alt"
                  :title="item.image_title"
                  style="cursor: pointer;"
                />
                <div class="content">
                  <h3 v-html="item.title" />
                  <p v-html="item.description" />
                </div>
              </div>
            </div>
            <div v-if="!pending && data && data.data.length>0" class="col-12 text-center mt-4">
              <vue-awesome-paginate
                v-model="page"
                :max-pages-shown="3"
                :total-items="data.meta.total"
                :items-per-page="data.meta.per_page"
                :on-click="paginationHandler"
              />
            </div>
          </viewer>
        </div>
      </div>
    </div>
  </div>
</template>
