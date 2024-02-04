<script setup lang="ts">
import { API_ROUTES } from '@/utils/api_routes'
import type { PaginationType, TestimonialType } from '@/utils/types'

const { $scroll } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const page = ref((route.query.page && !isNaN(+route.query.page)) ? +route.query.page : 1)

const { data, pending } = await useSSRFetch<PaginationType<TestimonialType>>(() => API_ROUTES.testimonial + `?total=9&page=${page.value}`, {
  key: 'testimonials_' + route.query.page || '1',
  lazy: true,
  watch: [page]
})

const paginationHandler = () => $scroll('#testimonial-area', () => router.push({ query: { page: page.value } }))

</script>

<template>
  <div>
    <SeoHeader slug="testimonial-page" />

    <BreadCrumb
      title="Testimonial"
      :pages="[
        {
          link:'',
          name:'Testimonial'
        }
      ]"
    />

    <div id="testimonial-area" class="testimonials-area pt-70 pb-70">
      <div class="container">
        <div class="section-title text-center">
          <span>TESTIMONIAL</span>
          <h2>What our learers have to say</h2>
        </div>
        <TestimonialCardLoading v-if="pending" :count="9" />
        <div v-if="!pending && data && data.data.length>0" class="testimonials-slider-two row">
          <div
            v-for="(item, i) in data.data"
            :key="i"
            class="col-lg-4 col-md-6 col-sm-12"
          >
            <TestimonialCard
              :image="item.image"
              :name="item.name"
              :star="item.star"
              :message="item.message"
              :designation="item.designation"
            />
          </div>
        </div>
        <div v-if="!pending && data && data.data.length>0" class="col-12 text-center">
          <vue-awesome-paginate
            v-model="page"
            :max-pages-shown="3"
            :total-items="data.meta.total"
            :items-per-page="data.meta.per_page"
            :on-click="paginationHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>
