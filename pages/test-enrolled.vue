<script setup lang="ts">
import { API_ROUTES } from '@/utils/api_routes'
import type { PaginationType, OnlineTestEnrolledType } from '@/utils/types'

definePageMeta({
  middleware: 'auth'
})

const { $scroll } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const page = ref((route.query.page && !isNaN(+route.query.page)) ? +route.query.page : 1)

const { data, pending } = await useSSRFetch<PaginationType<OnlineTestEnrolledType>>(() => API_ROUTES.test_enrolled + `?total=12&page=${page.value}`, {
  key: 'test_enrolled_' + route.query.page || '1',
  lazy: true,
  watch: [page]
})

const paginationHandler = () => $scroll('#test-enrolled-area', () => router.push({ query: { page: page.value } }))

</script>

<template>
  <div id="test-enrolled-area">
    <BreadCrumb
      title="Test Enrolled"
      :pages="[
        {
          link:'',
          name:'Test Enrolled'
        }
      ]"
    />

    <div class="user-area pt-70 pb-70">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-lg-12">
            <div v-if="pending" class="text-center">
              <div
                class="spinner-border"
                role="status"
              />
            </div>
            <div v-if="!pending && data && data.data.length>0" class="mobile-overflow-scroll">
              <table class="table table-bordered table-responsive">
                <thead>
                  <tr class="table-primary text-center">
                    <th scope="col">
                      Test Name
                    </th>
                    <th scope="col">
                      Test Status
                    </th>
                    <th scope="col">
                      Enrollment Type
                    </th>
                    <th scope="col">
                      Amount
                    </th>
                    <th scope="col">
                      Payment Status
                    </th>
                    <th scope="col">
                      Reason
                    </th>
                    <th scope="col">
                      Applied On
                    </th>
                    <th scope="col">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr v-for="(item, i) in data.data" :key="i">
                    <th scope="row">
                      {{ item.test_name }}
                    </th>
                    <td>{{ item.test_status }}</td>
                    <td>{{ item.enrollment_type }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.enrollment_type==='Free' ? '' : item.payment_status }}</td>
                    <td>{{ item.reason }}</td>
                    <td>{{ item.created_at }}</td>
                    <td>
                      <NuxtLink
                        noPrefetch
                        :to="'/online-tests/' + item.test_slug"
                        aria-label="test enrolled page detail"
                        :class="`btn btn-dark btn-sm`"
                      >
                        View
                      </NuxtLink>
                    </td>
                  </tr>
                </tbody>
              </table>
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
