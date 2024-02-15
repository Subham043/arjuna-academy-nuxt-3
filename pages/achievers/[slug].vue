<script setup lang="ts">
import { API_ROUTES } from '@/utils/api_routes'
import type { AchieverCategoryType, AchieverStudentType, PaginationType } from '@/utils/types'

const config = useRuntimeConfig()
const { $scroll } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const page = ref((route.query.page && !isNaN(+route.query.page)) ? +route.query.page : 1)

const { data: achieverCategory, pending: achieverCategoryPending, error } = await useSSRFetch<{
  achiverCategory: AchieverCategoryType
}>(API_ROUTES.achieverCategory + `/${route.params.slug}`, {
  key: 'achiever_category_' + route.params.slug,
  lazy: true
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.message
  })
}

useSeoMeta({
  title: () => achieverCategory.value ? achieverCategory.value.achiverCategory.meta_title : 'Arjunaa Academy For Achievers',
  ogTitle: () => achieverCategory.value ? achieverCategory.value.achiverCategory.meta_title : 'Arjunaa Academy For Achievers',
  twitterTitle: () => achieverCategory.value ? achieverCategory.value.achiverCategory.meta_title : 'Arjunaa Academy For Achievers',
  description: () => achieverCategory.value ? achieverCategory.value.achiverCategory.meta_description : 'Arjunaa Academy For Achievers',
  ogDescription: () => achieverCategory.value ? achieverCategory.value.achiverCategory.meta_description : 'Arjunaa Academy For Achievers',
  twitterDescription: () => achieverCategory.value ? achieverCategory.value.achiverCategory.meta_description : 'Arjunaa Academy For Achievers',
  keywords: () => achieverCategory.value ? achieverCategory.value.achiverCategory.meta_keywords : 'Arjunaa Academy For Achievers',
  ogUrl: config.public.mainURL + (route.fullPath === '/' ? '' : route.fullPath),
  ogType: 'website',
  ogImage: '/images/logos/new-logo.webp',
  twitterImage: '/images/logos/new-logo.webp',
  twitterCard: 'summary_large_image',
  colorScheme: 'normal',
  themeColor: '#354620'
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: config.public.mainURL + (route.fullPath === '/' ? '' : route.fullPath)
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => achieverCategory.value ? achieverCategory.value.achiverCategory.meta_scripts : undefined
    }
  ]
})

const { data: achieverStudent, pending: achieverStudentPending } = await useSSRFetch<PaginationType<AchieverStudentType>>(() => API_ROUTES.achieverStudent + `?total=12&page=${page.value}&filter[has_categories]=${route.params.slug}`, {
  key: 'achiever_student_' + route.query.slug || '1',
  lazy: true,
  watch: [page]
})

const paginationHandler = () => $scroll('#achiever-area', () => router.push({ query: { page: page.value } }))

</script>

<template>
  <div>
    <BreadCrumb
      :title="achieverCategory ? achieverCategory.achiverCategory.name : ''"
      :pages="[
        {
          link:'',
          name:achieverCategory ? achieverCategory.achiverCategory.name : ''
        }
      ]"
    />

    <div id="achiever-area" class="blog-area pt-70 pb-70">
      <div class="container">
        <div v-if="!achieverCategoryPending && achieverCategory" class="section-title mb-45 text-center">
          <h2 v-html="achieverCategory.achiverCategory.heading" />
          <p v-html="achieverCategory.achiverCategory.description" />
        </div>
        <div v-if="achieverCategoryPending" class="section-title mb-45 text-center">
          <el-skeleton style="width: 100%" animated>
            <template #template>
              <el-skeleton-item variant="h1" style="width: 30%" />
              <br>
              <el-skeleton-item variant="text" style="width: 50%;" />
              <br>
              <el-skeleton-item variant="text" style="width: 50%;" />
            </template>
          </el-skeleton>
        </div>
        <AchieverStudentLoading v-if="achieverStudentPending" :count="8" />
        <div v-if="!achieverStudentPending && achieverStudent && achieverStudent.data.length>0" class="achiever-row row justify-content-center">
          <div v-for="(item, i) in achieverStudent.data" :key="i" class="col-lg-2 col-md-4 col-sm-6">
            <AchieverStudentCard
              :image="item.image"
              :image_alt="item.image_alt"
              :image_title="item.image_title"
              :name="item.name"
              :rank="item.rank"
              :college="item.college"
            />
          </div>
          <div v-if="!achieverStudentPending && achieverStudent && achieverStudent.data.length>0" class="col-12 text-center mt-4">
            <vue-awesome-paginate
              v-model="page"
              :max-pages-shown="3"
              :total-items="achieverStudent.meta.total"
              :items-per-page="achieverStudent.meta.per_page"
              :on-click="paginationHandler"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
