<script setup lang="ts">
import { API_ROUTES } from '@/utils/api_routes'
import type { PaginationType, ExpertTipType } from '@/utils/types'

const route = useRoute()
const router = useRouter()
const page = ref((route.query.page && !isNaN(+route.query.page)) ? +route.query.page : 1)

const { data, pending } = await useSSRFetch<PaginationType<ExpertTipType>>(() => API_ROUTES.expertTip + `?total=12&page=${page.value}&sort=-published_on`, {
  key: 'expert_tips_' + route.query.page || '1',
  lazy: true,
  watch: [page]
})

const paginationHandler = () => router.push({ query: { page: page.value } })

</script>

<template>
  <div>
    <SeoHeader slug="expert-tips-page" />

    <BreadCrumb
      title="Expert Tips"
      :pages="[
        {
          link:'',
          name:'Expert Tips'
        }
      ]"
    />

    <div id="expertTip-area" class="blog-area pt-70 pb-70">
      <div class="container">
        <div class="section-title mb-45 text-center">
          <h2>Latest from our <b>expert tips</b></h2>
          <p>
            “Mantras to crack JEE & NEET”
          </p>
        </div>
        <div v-if="pending" class="row justify-content-center">
          <div v-for="i in 8" :key="i" class="col-lg-6 col-md-6">
            <el-skeleton style="width: 100%" animated>
              <template #template>
                <el-skeleton-item variant="text" style="width: 30%;" />
                <br>
                <el-skeleton-item variant="p" style="width: 50%" />
                <br>
                <el-skeleton-item variant="text" style="width: 100%;" />
              </template>
            </el-skeleton>
          </div>
        </div>
        <div v-if="!pending && data && data.data.length>0" class="row justify-content-center">
          <div v-for="(item, i) in data.data" :key="i" class="col-lg-6 col-md-6">
            <EventCard
              :title="item.name"
              :description="item.short_description"
              :date="item.published"
              :author="item.author_name"
              :slug="item.slug"
              :is_event="false"
            />
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
        </div>
      </div>
    </div>
  </div>
</template>
