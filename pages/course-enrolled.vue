<script setup lang="ts">
import { API_ROUTES } from '@/utils/api_routes'
import type { PaginationType, CourseEnrolledType } from '@/utils/types'

definePageMeta({
  middleware: 'auth'
})

const { $scroll } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const page = ref((route.query.page && !isNaN(+route.query.page)) ? +route.query.page : 1)

const { data, pending } = await useSSRFetch<PaginationType<CourseEnrolledType>>(() => API_ROUTES.course_enrolled + `?total=12&page=${page.value}`, {
  key: 'course_enrolled_' + route.query.page || '1',
  lazy: true,
  watch: [page]
})

const paginationHandler = () => $scroll('#course-enrolled-area', () => router.push({ query: { page: page.value } }))

</script>

<template>
  <div id="course-enrolled-area">
    <BreadCrumb
      title="Course Enrolled"
      :pages="[
        {
          link:'',
          name:'Course Enrolled'
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
                      Course Name
                    </th>
                    <th scope="col">
                      Branch
                    </th>
                    <th scope="col">
                      Amount
                    </th>
                    <th scope="col">
                      Payment Status
                    </th>
                    <th scope="col">
                      Applied On
                    </th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr v-for="(item, i) in data.data" :key="i">
                    <th scope="row">
                      {{ item.course }}
                    </th>
                    <td>{{ item.branch }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.payment_status }}</td>
                    <td>{{ item.created_at }}</td>
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
