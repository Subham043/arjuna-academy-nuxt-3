<script setup lang="ts">
import { API_ROUTES } from '@/utils/api_routes'
import type { PaginationType, OnlineTestType } from '@/utils/types'

const { $scroll } = useNuxtApp()
const { status: authStatus } = useAuth()
const route = useRoute()
const router = useRouter()
const page = ref((route.query.page && !isNaN(+route.query.page)) ? +route.query.page : 1)
const status = ref('All')
const options = ref([{
  value: 'All',
  label: 'All'
}, {
  value: 'Pending',
  label: 'Pending'
}, {
  value: 'Ongoing',
  label: 'Ongoing'
}, {
  value: 'Completed',
  label: 'Completed'
}, {
  value: 'Eliminated',
  label: 'Eliminated'
}])

const { data, pending } = useSSRFetch<PaginationType<OnlineTestType>>(() => (authStatus.value === 'authenticated' ? API_ROUTES.authTests : API_ROUTES.tests) + `?total=9&page=${page.value}${status.value === 'All' ? '' : `&filter[has_status]=${status.value}`}`, {
  key: 'online_tests_' + route.query.page || '1',
  lazy: true,
  watch: [page, status]
})

const paginationHandler = () => $scroll('#event-area', () => router.push({ query: { page: page.value } }))
</script>

<template>
  <div>
    <BreadCrumb
      title="Online Test"
      :pages="[
        {
          link:'',
          name:'Online Test'
        }
      ]"
    />

    <div id="blog-area" class="blog-area pt-70 pb-70">
      <div class="container">
        <div class="section-title mb-45 text-center">
          <h2>Latest from our <b>Online Tests</b></h2>
          <p>
            Explore The Latest Updates About NEET, JEE, IIT Exams And Foundation Courses
          </p>
          <div v-if="authStatus === 'authenticated'" class="row justify-content-end align-items-center">
            <div class="col-md-2 col-sm-12">
              <el-select v-model="status" placeholder="Filter">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div v-if="pending" class="row justify-content-center">
          <OnlineTestCardLoading :count="9" />
        </div>
        <div v-if="!pending && data && data.data.length>0" class="row justify-content-center">
          <div v-for="(item, i) in data.data" :key="i" class="col-lg-4 col-md-6">
            <OnlineTestCard
              :image="item.image"
              :title="item.name"
              :description="item.short_description"
              :is_paid="item.is_paid"
              :slug="item.slug"
              :amount="item.amount"
              :image_alt="item.image_alt"
              :image_title="item.image_title"
              :enrollment="item.is_test_enrolled"
            />
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
  </div>
</template>
