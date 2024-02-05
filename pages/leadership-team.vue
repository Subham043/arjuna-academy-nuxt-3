<script setup lang="ts">
import { API_ROUTES } from '../utils/api_routes'
import type { PaginationType, ManagementType, StaffType } from '../utils/types'

const { $scroll } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const page = ref((route.query.page && !isNaN(+route.query.page)) ? +route.query.page : 1)

const { data, pending } = await useSSRFetch<{
  data: ManagementType[];
}>(() => API_ROUTES.management, {
  lazy: true,
  server: true
})

const { data: staff, pending: staffPending } = await useSSRFetch<PaginationType<StaffType>>(() => API_ROUTES.staff + `?total=12&page=${page.value}`, {
  key: 'staff_' + route.query.page || '1',
  lazy: true,
  server: false,
  watch: [page]
})

const paginationHandler = () => $scroll('#instructor-area', () => router.push({ query: { page: page.value } }))

</script>

<template>
  <div>
    <SeoHeader slug="leadership-page" />

    <BreadCrumb
      title="Leadership Team"
      :pages="[
        {
          link:'',
          name:'Leadership Team'
        }
      ]"
    />

    <template v-if="pending">
      <div v-for="i in 4" :key="i" :class="`instructors-details-area ${i===1 && 'pt-100'} pb-70`">
        <div v-if="(i+1)%2===0" class="container">
          <div class="row">
            <div class="col-lg-5">
              <div class="instructors-details-img faq-img">
                <el-skeleton style="width: 100%" animated>
                  <template #template>
                    <el-skeleton-item variant="image" style="width: 100%; height: 240px;" />
                  </template>
                </el-skeleton>
              </div>
            </div>
            <div class="col-lg-7">
              <div class="instructors-details-content pl-20">
                <el-skeleton style="width: 100%" animated>
                  <template #template>
                    <el-skeleton-item variant="h3" style="width: 30%" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 20%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                  </template>
                </el-skeleton>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="container">
          <div class="row">
            <div class="col-lg-7">
              <div class="instructors-details-content pl-20">
                <el-skeleton style="width: 100%" animated>
                  <template #template>
                    <el-skeleton-item variant="h3" style="width: 30%" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 20%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                    <br>
                    <el-skeleton-item variant="text" style="width: 100%;" />
                  </template>
                </el-skeleton>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="instructors-details-img faq-img">
                <el-skeleton style="width: 100%" animated>
                  <template #template>
                    <el-skeleton-item variant="image" style="width: 100%; height: 240px;" />
                  </template>
                </el-skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="!pending && data && data.data.length>0">
      <div v-for="(item, i) in data.data" :key="i" :class="`instructors-details-area ${i===0 && 'pt-70'} pb-70`">
        <div v-if="(i+1)%2===0" class="container">
          <div class="row">
            <div class="col-lg-5 order-1-sm">
              <div class="instructors-details-img faq-img">
                <NuxtImg placeholder="/images/placeholder.webp" :src="item.image" :alt="item.image_alt" :title="item.image_title" />
                <div class="shape">
                  <h2><span class="badge bg-warning" v-html="item.designation" /></h2>
                </div>
              </div>
            </div>
            <div class="col-lg-7 order-2-sm">
              <div class="instructors-details-content pl-20">
                <h2 v-html="item.name" />
                <i class="d-inline-flex mb-3 fw-semibold text-success-emphasis bg-success-subtle " v-html="item.qualification" />
                <div v-html="item.description" />
              </div>
            </div>
          </div>
        </div>
        <div v-else class="container">
          <div class="row">
            <div class="col-lg-7 order-2-sm">
              <div class="instructors-details-content pl-20">
                <h2 v-html="item.name" />
                <i class="d-inline-flex mb-3 fw-semibold text-success-emphasis bg-success-subtle " v-html="item.qualification" />
                <div v-html="item.description" />
              </div>
            </div>
            <div class="col-lg-5 order-1-sm">
              <div class="instructors-details-img faq-img">
                <NuxtImg placeholder="/images/placeholder.webp" :src="item.image" :alt="item.image_alt" :title="item.image_title" />
                <div class="shape">
                  <h2><span class="badge bg-warning" v-html="item.designation" /></h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div id="instructor-area" class="instructors-area instructors-area-rs pb-70">
      <div class="container">
        <div class="section-title text-center mb-45">
          <h2>Our Faculties</h2>
        </div>
        <div v-if="staffPending" class="row justify-content-center">
          <div v-for="i in 8" :key="i" class="col-lg-3 col-md-6 col-sm-6">
            <el-skeleton style="width: 100%" animated>
              <template #template>
                <el-skeleton-item variant="image" style="width: 100%; height: 240px;" />
                <div style="padding: 14px;">
                  <el-skeleton-item variant="p" style="width: 50%" />
                  <br>
                  <el-skeleton-item variant="text" style="width: 30%;" />
                </div>
              </template>
            </el-skeleton>
          </div>
        </div>
        <div v-if="!staffPending && staff && staff.data.length>0" class="row justify-content-center" data-aos="fade-up">
          <div v-for="(item, i) in staff.data" :key="i" class="col-lg-3 col-md-6 col-sm-6">
            <InstructorCard
              :image="item.image"
              :image_alt="item.image_alt"
              :image_title="item.image_title"
              :name="item.name"
              :designation="item.designation"
              :description="item.description"
            />
          </div>
          <div v-if="!pending && staff && staff.data.length>0" class="col-12 text-center mt-4">
            <vue-awesome-paginate
              v-model="page"
              :max-pages-shown="3"
              :total-items="staff.meta.total"
              :items-per-page="staff.meta.per_page"
              :on-click="paginationHandler"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
