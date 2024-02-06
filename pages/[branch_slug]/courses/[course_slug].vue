<script setup lang="ts">
import { object, string, number } from 'yup'
import { useToast } from 'vue-toastification'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { API_ROUTES } from '@/utils/api_routes'
import type { CourseDetailType } from '@/utils/types'

useHead({
  script: [
    { src: 'https://checkout.razorpay.com/v1/checkout.js', async: true }
  ]
})

const config = useRuntimeConfig()

const toast = useToast()
const route = useRoute()
const loading = ref(false)

const { data, pending, error } = useSSRFetch<CourseDetailType>(() => API_ROUTES.course + `/${route.params.course_slug}/branch/${route.params.branch_slug}`, {
  key: `course_detail_${route.params.course_slug}_branch_${route.params.branch_slug}`,
  lazy: true
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.message
  })
}

useSeoMeta({
  title: () => (data.value && data.value.course.branch_details.length > 0) ? data.value.course.branch_details[0].meta_title : 'Arjunaa Academy For Achievers',
  ogTitle: () => (data.value && data.value.course.branch_details.length > 0) ? data.value.course.branch_details[0].meta_title : 'Arjunaa Academy For Achievers',
  twitterTitle: () => (data.value && data.value.course.branch_details.length > 0) ? data.value.course.branch_details[0].meta_title : 'Arjunaa Academy For Achievers',
  description: () => (data.value && data.value.course.branch_details.length > 0) ? data.value.course.branch_details[0].meta_description : 'Arjunaa Academy For Achievers',
  ogDescription: () => (data.value && data.value.course.branch_details.length > 0) ? data.value.course.branch_details[0].meta_description : 'Arjunaa Academy For Achievers',
  twitterDescription: () => (data.value && data.value.course.branch_details.length > 0) ? data.value.course.branch_details[0].meta_description : 'Arjunaa Academy For Achievers',
  keywords: () => (data.value && data.value.course.branch_details.length > 0) ? data.value.course.branch_details[0].meta_keywords : 'Arjunaa Academy For Achievers',
  ogUrl: config.public.mainURL + (route.fullPath === '/' ? '' : route.fullPath),
  ogType: 'website',
  ogImage: () => data.value ? data.value.course.image : '/images/logos/new-logo.webp',
  twitterImage: () => data.value ? data.value.course.image : '/images/logos/new-logo.webp',
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
      innerHTML: () => (data.value && data.value.course.branch_details.length > 0) ? data.value.course.branch_details[0].meta_scripts : undefined
    }
  ]
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string().required(),
      email: string().email().required(),
      phone: number()
        .typeError('phone must be a number')
        .lessThan(9999999999, 'phone must be less than 10 digits')
        .moreThan(100000000, 'phone must be equal to 10 digits')
        .required()
    })
  )
})

const onEnroll = handleSubmit(async (values: any, actions: any) => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('phone', values.phone)
    const response = await useCustomFetch(API_ROUTES.course + `/${route.params.course_slug}/branch/${route.params.branch_slug}/enroll`, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      loadRazorpay(content.enrollmentForm)
      actions.resetForm()
    } else {
      throw content
    }
  } catch (err: any) {
    toast.error(err?.message)
    actions.setErrors({
      name: err?.errors?.name?.length > 0 && err?.errors?.name[0],
      email: err?.errors?.email?.length > 0 && err?.errors?.email[0],
      phone: err?.errors?.phone?.length > 0 && err?.errors?.phone[0]
    })
  } finally {
    loading.value = false
  }
})

const loadRazorpay = (resp:any) => {
  const options = {
    key: config.public.RAZORPAY_KEY_ID,
    amount: resp.discounted_amount * 100,
    currency: 'INR',
    name: 'Arjunaa Academy For Achievers',
    description: (data.value && data.value.course.branch_details.length > 0) ? `Enrollment for ${data.value.course.name}` : 'Enrollment',
    image: '/images/logos/new-logo.webp',
    order_id: resp.razorpay_order_id,
    prefill: {
      name: resp.name,
      email: resp.email,
      contact: resp.phone
    },
    theme: {
      color: '#354620'
    },
    handler: async (response:any) => {
      await verifyPayment(response)
    }
  }
  const rzp = new (window as any).Razorpay(options)
  rzp.open()
}

const verifyPayment = async (data:any) => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  try {
    const formData = new FormData()
    formData.append('razorpay_order_id', data.razorpay_order_id)
    formData.append('razorpay_payment_id', data.razorpay_payment_id)
    formData.append('razorpay_signature', data.razorpay_signature)
    const response = await useCustomFetch('/api/v1/enrollment/verify', {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      toast.success(content.message)
    } else {
      throw content
    }
  } catch (err:any) {
    if (err?.message) { toast.error(err.message) }
    if (err?.error) { toast.error(err.error) }
  } finally {
    loading.close()
  }
}

const onRequestCallback = handleSubmit(async (values: any, actions: any) => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('phone', values.phone)
    const response = await useCustomFetch(API_ROUTES.course + `/${route.params.course_slug}/branch/${route.params.branch_slug}/request`, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      toast.success('We have received your request. Our team will contact you soon.')
      actions.resetForm()
    } else {
      throw content
    }
  } catch (err: any) {
    toast.error(err?.message)
    actions.setErrors({
      name: err?.errors?.name?.length > 0 && err?.errors?.name[0],
      email: err?.errors?.email?.length > 0 && err?.errors?.email[0],
      phone: err?.errors?.phone?.length > 0 && err?.errors?.phone[0]
    })
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <div>
    <div class="inner-banner inner-banner-bg9">
      <div class="container">
        <div class="inner-title">
          <h1 v-html="data ? data.course.name : ''" />
          <ul>
            <li>
              <NuxtLink noPrefetch to="/">
                Home
              </NuxtLink>
            </li>
            <li>Courses</li>
            <li v-html="data ? data.course.name : ''" />
          </ul>
        </div>
      </div>
    </div>

    <div class="courses-details-area pt-70 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <template v-if="!pending && data">
              <div class="courses-details-contact">
                <div class="tab courses-details-tab">
                  <div class="tab_content current active">
                    <div class="tabs_item">
                      <div class="courses-details-tab-content">
                        <div v-if="data.course.branch_details.length>0" class="courses-details-into" v-html="data.course.branch_details[0].description" />
                        <div class="courses-details-into" v-html="data.course.description" />
                        <template v-if="data.course.branch_details.length>0 && data.course.branch_details[0].include_staff === true">
                          <div class="section-title text-center">
                            <span>STAFFS</span>
                            <h2 v-html="data.course.branch_details[0].staff_heading" />
                          </div>
                          <div v-if="data.course.branch_details[0].staffs.length>0" class="instructor-row row justify-content-center mt-4">
                            <div v-for="(item, i) in data.course.branch_details[0].staffs" :key="i" class="col-lg-4 col-md-6 col-sm-6">
                              <InstructorCard
                                :image="item.image"
                                :image_alt="item.image_alt"
                                :image_title="item.image_title"
                                :name="item.name"
                                :designation="item.designation"
                                :description="item.description"
                              />
                            </div>
                          </div>
                        </template>
                        <template v-if="data.course.branch_details.length>0 && data.course.branch_details[0].include_topper === true">
                          <div class="section-title text-center">
                            <span>ACHIEVERS</span>
                            <h2 v-html="data.course.branch_details[0].topper_heading" />
                          </div>
                          <div v-if="data.course.branch_details[0].achievers.length>0" class="achiever-row row justify-content-center mt-4">
                            <div v-for="(item, i) in data.course.branch_details[0].achievers" :key="i" class="col-lg-3 col-md-4 col-sm-6">
                              <AchieverStudentCard
                                :image="item.image"
                                :image_alt="item.image_alt"
                                :image_title="item.image_title"
                                :name="item.name"
                                :rank="item.rank"
                                :college="item.college"
                              />
                            </div>
                          </div>
                        </template>
                        <template v-if="data.course.branch_details.length>0 && data.course.branch_details[0].include_testimonial === true">
                          <div class="section-title text-center">
                            <span>TESTIMONIAL</span>
                            <h2 v-html="data.course.branch_details[0].testimonial_heading" />
                          </div>
                          <div v-if="data.course.branch_details[0].testimonials.length>0" class="testimonials-slider-two row justify-content-center mt-4">
                            <div
                              v-for="(item, i) in data.course.branch_details[0].testimonials"
                              :key="i"
                              class="col-lg-6 col-md-6 col-sm-12"
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
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <PageDetailLoading :image="false" />
            </template>
          </div>
          <div class="col-lg-4">
            <template v-if="!pending && data">
              <div class="courses-details-sidebar">
                <NuxtImg placeholder="/images/placeholder.webp" :src="data.course.image" :alt="data.course.image_alt" :title="data.course.image_title" class="w-100" />
                <div class="content">
                  <span class="d-flex justify-content-between align-items-center">
                    <small v-if="data.course.branch_details.length>0 && data.course.branch_details[0].discount!=0" class="d-inline-flex m-0 px-2 py-1 fw-semibold text-success-emphasis bg-success-subtle border border-success-subtle rounded-2">{{ data.course.branch_details[0].discount }}% OFF</small>
                    <h5 class="d-inline m-0"><code v-if="data.course.branch_details.length>0 && data.course.branch_details[0].discount!=0"><del>&#8377;{{ data.course.branch_details[0].amount }}</del></code> <span>&#8377;{{ data.course.branch_details[0].discounted_amount }}</span></h5>
                  </span>
                  <hr>
                  <div>
                    <form id="contactForm" method="post" @submit.prevent="onEnroll">
                      <div class="row">
                        <div class="col-12">
                          <h3 class="user-title">
                            Fill in your details
                          </h3>
                        </div>
                        <div class="col-lg-12 col-md-12 mb-2">
                          <div class="form-group">
                            <CustomElInput name="name" placeholder="Name*" />
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12 mb-2">
                          <div class="form-group">
                            <CustomElInput name="email" placeholder="Email*" />
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12 mb-3">
                          <div class="form-group">
                            <CustomElInput name="phone" placeholder="Phone*" />
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12">
                          <div class="d-flex align-items-center">
                            <button type="button" :disabled="loading" class="default-btn" @click.prevent="onEnroll">
                              <template v-if="!loading">
                                Enroll Now
                              </template>
                              <div v-else class="spinner-border" role="status" />
                            </button>
                            <button type="button" :disabled="loading" class="default-btn mx-1" @click.prevent="onRequestCallback">
                              <template v-if="!loading">
                                Request Callback
                              </template>
                              <div v-else class="spinner-border" role="status" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <ul class="social-link">
                    <li class="social-title">
                      Share this course:
                    </li>
                    <li>
                      <a aria-label="facebook share" :href="`https://www.facebook.com/share.php?u=${config.public.mainURL}/${route.params.branch_slug}/courses/${route.params.course_slug}&title=${data.course.name}`" target="_blank">
                        <span class="svg-icon">
                          <Icon name="fa6-brands:facebook-f" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a aria-label="twitter share" :href="`https://twitter.com/share?text=${data.course.name}&url=${config.public.mainURL}/${route.params.branch_slug}/courses/${route.params.course_slug}`" target="_blank">
                        <span class="svg-icon">
                          <Icon name="fa6-brands:twitter" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a aria-label="linkedin share" :href="`https://www.linkedin.com/shareArticle?mini=true&url=${config.public.mainURL}/${route.params.branch_slug}/courses/${route.params.course_slug}&title=${data.course.name}&source=${data.course.name}`" target="_blank">
                        <span class="svg-icon">
                          <Icon name="fa6-brands:linkedin" />
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            <template v-else>
              <el-skeleton style="width: 100%" animated>
                <template #template>
                  <div class="courses-details-sidebar">
                    <el-skeleton-item variant="rect" style="width: 100%; height: 440px;" />
                  </div>
                </template>
              </el-skeleton>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
