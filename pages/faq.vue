<script setup lang="ts">
import { API_ROUTES } from '@/utils/api_routes'
import type { PaginationType, FaqType } from '@/utils/types'

const { $scroll } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const page = ref((route.query.page && !isNaN(+route.query.page)) ? +route.query.page : 1)

const { data, pending } = useSSRFetch<PaginationType<FaqType>>(() => API_ROUTES.faq + `?total=12&page=${page.value}`, {
  key: 'faq_' + route.query.page || '1',
  lazy: true,
  watch: [page]
})

const paginationHandler = () => $scroll('#faq-area', () => router.push({ query: { page: page.value } }))

</script>

<template>
  <div>
    <SeoHeader slug="faq-page" />

    <BreadCrumb
      title="FAQ"
      :pages="[
        {
          link:'',
          name:'FAQ'
        }
      ]"
    />

    <div class="faq-area pt-70 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="faq-img">
              <NuxtImg
                loading="lazy"
                format="webp"
                placeholder="/images/placeholder.webp"
                src="/images/faq.webp"
                alt="faq"
                title="faq"
                class="faq-page-img"
              />
              <div class="shape">
                <NuxtImg
                  format="webp"
                  loading="lazy"
                  src="/images/faq-shape.png"
                  height="90px"
                  alt="Faq"
                  title="Faq"
                />
              </div>
            </div>
          </div>
          <div id="faq-area" class="col-lg-6">
            <div class="faq-accordion pl-20">
              <div class="section-title mb-45">
                <span>FAQ</span>
                <h2>Frequently asked question</h2>
              </div>
              <div v-if="pending" class="row justify-content-center">
                <div v-for="i in 20" :key="i" class="col-lg-12 col-md-12">
                  <el-skeleton style="width: 100%" animated>
                    <template #template>
                      <el-skeleton-item variant="p" style="width: 50%" />
                      <br>
                      <el-skeleton-item variant="text" style="width: 100%;" />
                      <br>
                      <el-skeleton-item variant="text" style="width: 100%;" />
                      <br>
                      <el-skeleton-item variant="text" style="width: 100%;" />
                      <br>
                      <br>
                    </template>
                  </el-skeleton>
                </div>
              </div>
              <ul v-if="!pending && data && data.data.length>0" class="accordion">
                <li v-for="(item, i) in data.data" :key="i" class="accordion-item">
                  <h4 class="accordion-title active" v-html="item.question" />
                  <div class="accordion-content show" v-html="item.answer" />
                </li>
              </ul>
              <div v-if="!pending && data && data.data.length>0" class="col-12 text-center mt-4">
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
      </div>
    </div>
  </div>
</template>
