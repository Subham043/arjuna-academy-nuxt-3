<script setup lang="ts">
import { object, string, number, mixed, ref as yupRef } from 'yup'
import { useToast } from 'vue-toastification'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import type { PaginationType, TestimonialType } from '@/utils/types'
import { API_ROUTES } from '@/utils/api_routes'

const config = useRuntimeConfig()
const route = useRoute()
const { $scroll } = useNuxtApp()
const toast = useToast()

useSeoMeta({
  title: () => 'Arjunaa Academy For Achievers',
  ogTitle: () => 'Arjunaa Academy For Achievers',
  twitterTitle: () => 'Arjunaa Academy For Achievers',
  description: () => 'Arjunaa Academy For Achievers',
  ogDescription: () => 'Arjunaa Academy For Achievers',
  twitterDescription: () => 'Arjunaa Academy For Achievers',
  keywords: () => 'Arjunaa Academy For Achievers',
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
    { src: 'https://checkout.razorpay.com/v1/checkout.js', async: true }
  ]
})

const scrollToForm = () => $scroll('#form-area')

const { data, pending } = await useSSRFetch<PaginationType<TestimonialType>>(() => API_ROUTES.testimonial + '?total=9&page=1', {
  key: 'testimonials_1',
  lazy: true
})

const tabVal = ref('jee-advanced')
const applyTabVal = ref('apply-tab')
const dialogVideoVisible = ref(false)

const { data: achieverStudent, pending: achieverStudentPending } = await useSSRFetch<PaginationType<AchieverStudentType>>(() => API_ROUTES.achieverStudent + `?total=12&page=1&filter[has_categories]=${tabVal.value}`, {
  key: 'achiever_student_1',
  lazy: true
})

const { handleSubmit, defineField } = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string().required(),
      email: string().email().required(),
      school_name: string().required(),
      father_name: string().required(),
      father_email: string().email().required(),
      father_phone: number()
        .typeError('phone must be a number')
        .lessThan(9999999999, 'phone must be less than 10 digits')
        .moreThan(100000000, 'phone must be equal to 10 digits')
        .required(),
      mother_name: string().required(),
      mother_email: string().email().required(),
      mother_phone: number()
        .typeError('phone must be a number')
        .lessThan(9999999999, 'phone must be less than 10 digits')
        .moreThan(100000000, 'phone must be equal to 10 digits')
        .required(),
      address: string().required(),
      program: string().required(),
      class: string().required(),
      mode: string().required(),
      password: string().required(),
      confirm_password: string()
        .required('confirm password is a required field')
        .oneOf([yupRef('password')], 'Passwords must match'),
      exam_date: mixed().when(['mode'], {
        is: 'OFFLINE',
        then: schema => schema.required(),
        otherwise: schema => schema
      }),
      exam_center: mixed().when(['mode'], {
        is: 'OFFLINE',
        then: schema => schema.required(),
        otherwise: schema => schema
      }),
      image: mixed()
        .required('Please select an passport size photo')
        .test('fileFormat', 'Please select a valid passport size photo', (value: any) => {
          if (value !== undefined) {
            return ['image/webp', 'image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(value.type)
          }
          return true
        })
    })
  )
})

const [examMode] = defineField('mode')

const loading = ref(false)

const classOptions = useState('classOptions', () => [
  {
    value: '7th',
    label: 'SEVEN'
  },
  {
    value: '8th',
    label: 'EIGHT'
  },
  {
    value: '9th',
    label: 'NINE'
  },
  {
    value: '10th',
    label: 'TEN'
  }
])
const modeOptions = useState('modeOptions', () => [
  {
    value: 'ONLINE',
    label: 'ONLINE'
  },
  {
    value: 'OFFLINE',
    label: 'OFFLINE'
  }
])
const examDateOptions = useState('examDateOptions', () => [
  {
    value: 'October 26, 2025',
    label: 'October 26, 2025'
  },
  {
    value: 'November 1, 2025',
    label: 'November 1, 2025'
  },
  {
    value: 'November 2, 2025',
    label: 'November 2, 2025'
  }
])
const examCenterOptions = useState('examCenterOptions', () => [
  {
    value: 'Vijayanagar - Arjunaa Academy for Achievers centre',
    label: 'Vijayanagar - Arjunaa Academy for Achievers centre'
  },
  {
    value: 'Malleshwaram - Maharani Lakshmi Ammanni PU college Margosa Rd, Malleshwaram, Bengaluru, Karnataka 560012',
    label: 'Malleshwaram - Maharani Lakshmi Ammanni PU college Margosa Rd, Malleshwaram, Bengaluru, Karnataka 560012'
  },
  {
    value: 'Whitefield - Varthur Road - The Green School Bangalore, # 30/2 and 34/5 Kotur Village, Muthasandra Post, KOTUR, Hobli Hoskote, Taluk, Bengaluru, Karnataka 560087',
    label: 'Whitefield - Varthur Road - The Green School Bangalore, # 30/2 and 34/5 Kotur Village, Muthasandra Post, KOTUR, Hobli Hoskote, Taluk, Bengaluru, Karnataka 560087'
  },
  {
    value: 'Konanakunte cross',
    label: 'Konanakunte cross'
  }
])
const programOptions = useState('programOptions', () => [
  {
    value: 'Trio of Tens Integrated JEE Mains Batch (30 Students only)',
    label: 'Trio of Tens Integrated JEE Mains Batch (30 Students only)'
  },
  {
    value: 'Hareesh Sir’s Premium Trio of Tens Integrated JEE Advanced Batch (30 Students)',
    label: 'Hareesh Sir’s Premium Trio of Tens Integrated JEE Advanced Batch (30 Students)'
  },
  {
    value: 'Shushrutha Integrated NEET Batch (30 Students)',
    label: 'Shushrutha Integrated NEET Batch (30 Students)'
  },
  {
    value: 'Siddhartha Integrated CET Batch (30 Students)',
    label: 'Siddhartha Integrated CET Batch (30 Students)'
  },
  {
    value: 'Sumedha Weekend JEE & NEET Foundation',
    label: 'Sumedha Weekend JEE & NEET Foundation'
  },
  {
    value: 'Sarthak Class 9 ICSE Batch/ Sarthak Class 9 CBSE Batch',
    label: 'Sarthak Class 9 ICSE Batch/ Sarthak Class 9 CBSE Batch'
  },
  {
    value: 'Sumedha Class 9 Foundation',
    label: 'Sumedha Class 9 Foundation'
  },
  {
    value: 'Sarthak Class 10 ICSE Batch/ Sarthak Class 10 CBSE Batch',
    label: 'Sarthak Class 10 ICSE Batch/ Sarthak Class 10 CBSE Batch'
  },
  {
    value: 'Sumedha Class 10 Foundation',
    label: 'Sumedha Class 10 Foundation'
  }
])

const loadRazorpay = (resp: any) => {
  const options = {
    key: config.public.RAZORPAY_KEY_ID,
    amount: 99.0 * 100,
    currency: 'INR',
    name: 'Arjunaa Academy For Achievers',
    description: 'Admission Test',
    image: '/images/logos/new-logo.webp',
    order_id: resp.razorpay_order_id,
    prefill: {
      name: resp.name,
      email: resp.email,
      contact: resp.father_phone
    },
    theme: {
      color: '#354620'
    },
    handler: async (response: any) => {
      await verifyPayment(response)
    }
  }
  const rzp = new (window as any).Razorpay(options)
  rzp.open()
}

const verifyPayment = async (data: any) => {
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
    const response = await useCustomFetch('/api/v1/admission/verify', {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      toast.success(content.message)
      applyTabVal.value = 'applied-tab'
    } else {
      throw content
    }
  } catch (err: any) {
    if (err?.message) { toast.error(err.message) }
    if (err?.error) { toast.error(err.error) }
  } finally {
    loading.close()
  }
}

const onSubmit = handleSubmit(async (values: any, actions: any) => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('school_name', values.school_name)
    formData.append('email', values.email)
    formData.append('father_name', values.father_name)
    formData.append('father_email', values.father_email)
    formData.append('father_phone', values.father_phone)
    formData.append('mother_name', values.mother_name)
    formData.append('mother_email', values.mother_email)
    formData.append('mother_phone', values.mother_phone)
    formData.append('address', values.address)
    formData.append('program', values.program)
    formData.append('class', values.class)
    formData.append('password', values.password)
    formData.append('confirm_password', values.confirm_password)
    formData.append('image', values.image)
    formData.append('mode', values.mode)
    if (values.mode === 'OFFLINE') {
      formData.append('exam_date', values.exam_date)
      formData.append('exam_center', values.exam_center)
    }
    const response = await useCustomFetch(API_ROUTES.admission_registration, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      if (content.data.payment_status === 'PENDING') {
        loadRazorpay(content.data)
      } else {
        toast.success(content.message)
        applyTabVal.value = 'applied-tab'
      }
      actions.resetForm()
    } else {
      throw content
    }
  } catch (err: any) {
    toast.error(err?.message)
    actions.setErrors({
      email: err?.errors?.email?.length > 0 && err?.errors?.email[0],
      name: err?.errors?.name?.length > 0 && err?.errors?.name[0],
      school_name: err?.errors?.school_name?.length > 0 && err?.errors?.school_name[0],
      father_name: err?.errors?.father_name?.length > 0 && err?.errors?.father_name[0],
      father_phone: err?.errors?.father_phone?.length > 0 && err?.errors?.father_name[0],
      father_email: err?.errors?.father_email?.length > 0 && err?.errors?.father_email[0],
      mother_name: err?.errors?.mother_name?.length > 0 && err?.errors?.mother_name[0],
      mother_phone: err?.errors?.mother_phone?.length > 0 && err?.errors?.mother_name[0],
      mother_email: err?.errors?.mother_email?.length > 0 && err?.errors?.mother_email[0],
      class: err?.errors?.class?.length > 0 && err?.errors?.class[0],
      program: err?.errors?.program?.length > 0 && err?.errors?.program[0],
      address: err?.errors?.address?.length > 0 && err?.errors?.address[0],
      image: err?.errors?.image?.length > 0 && err?.errors?.image[0],
      mode: err?.errors?.mode?.length > 0 && err?.errors?.mode[0],
      exam_date: err?.errors?.exam_date?.length > 0 && err?.errors?.exam_date[0],
      exam_center: err?.errors?.exam_center?.length > 0 && err?.errors?.exam_center[0],
      password: err?.errors?.password?.length > 0 && err?.errors?.password[0],
      confirm_password: err?.errors?.confirm_password?.length > 0 && err?.errors?.confirm_password[0]
    })
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="w-100">
      <img src="/images/admission_3.webp" alt="banner-admission" class="banner-img-admission">
    </div>

    <div class="pt-70 pb-60">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12">
            <div class="enrolled-content mb-30">
              <div class="section-title text-center">
                <span class="fs-4">AAASAT 2025</span>
                <div class="head-one">
                  <h2>Arjunaa Scholarship and Aptitude Test</h2>
                </div>
              </div>
              <div class="section-title">
                <p>
                  AAA is the only Institute in Bangalore for IIT JEE & Medical - invested in mindful
                  learning where talent is nurtured through our finite batch of 30 students with utmost personal
                  attention since 2012.
                </p>
              </div>
              <div class="row">
                <div class="col-lg-12 col-12">
                  <ul class="enrolled-list">
                    <li>
                      <i class="flaticon-check" /> Arjunaa’s Competency Based Exam for <span class="text-dark">Class 7th
                        to 10th Students</span>
                    </li>
                    <li>
                      <i class="flaticon-check" /> Arjunaa’s Competency Based Offline Exam Date : <span
                        class="text-dark"
                      >OCTOBER 26th 2025
                        Sunday,
                        NOVEMBER 1st 2025 Saturday and
                        November 2nd Sunday</span>
                    </li>
                    <li>
                      <i class="flaticon-check" /> Arjunaa’s Competency Based Online Exam Date : <span
                        class="text-dark"
                      >OCTOBER 26th 2025
                        Sunday to November 2nd Sunday</span>
                    </li>
                    <li>
                      <i class="flaticon-check" /> Last Date to Register for AAASAT - <span class="text-dark">October
                        24th 2025</span>
                    </li>
                  </ul>
                  <div class="text-center">
                    <button class="default-btn border-radius-50" aria-label="APPLY NOW" @click="scrollToForm">
                      REGISTER NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="enrolled-area pt-70">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-5">
            <div class="enrolled-img-two mb-30" data-speed="0.05" data-revert="true">
              <NuxtImg
                format="webp"
                loading="lazy"
                placeholder="/images/img-placeholder.webp"
                src="/images/admission_4.webp"
                width="500px"
                alt="Enrolled"
              />
            </div>
          </div>
          <div class="col-lg-7">
            <div class="enrolled-content mb-30">
              <div class="section-title text-center">
                <span class="fs-4">SCHOLARSHIP</span>
                <div class="head-one">
                  <h2>Rewards</h2>
                </div>
              </div>
              <div class="confetti">
                <div class="pyro">
                  <div class="before" />
                  <div class="after" />
                </div>
                <table class="content-table">
                  <thead>
                    <tr>
                      <th>% Marks in Entrance Test</th>
                      <th class="text-center">
                        Scholarship % (on AAA fees)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Above 95% (High Honors)</td>
                      <td class="text-center">
                        100%
                      </td>
                    </tr>
                    <tr>
                      <td>90%-95% (Honors)</td>
                      <td class="text-center">
                        80%
                      </td>
                    </tr>
                    <tr>
                      <td>85%-90% (Excellent)</td>
                      <td class="text-center">
                        65%
                      </td>
                    </tr>
                    <tr>
                      <td>75%-85% (Distinction)</td>
                      <td class="text-center">
                        50%
                      </td>
                    </tr>
                    <tr>
                      <td>65%-75% (Very Good)</td>
                      <td class="text-center">
                        35%
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  To all other students we would like to announce, Get AIR&lt;1000 JEE Main / JEE
                  Advanced / NEET & get entire 2 year AAA fee refunded
                </p>
                <p><code>** Above scholarship slab is not valid for school batches **</code></p>
                <p><code>** Scholarship on AAA fee only and not on Uniform or college fee **</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="play-area pt-70">
      <div class="container">
        <div class="title text-center mb-45">
          <h2>
            "A <span>leader</span> is one who knows the way, goes the way & shows the way"
          </h2>
        </div>
        <div class="play-btn-area">
          <a href="javascript:void(0)" class="play-btn" aria-label="Video Popup" @click="dialogVideoVisible = true">
            <i class="flaticon-play-button-arrowhead" />
          </a>
        </div>
      </div>
    </div>

    <div class="pt-70">
      <div class="container">
        <div class="section-title text-center mb-20">
          <span>ACHIEVERS</span>
          <h2>Our Achievers</h2>
        </div>
        <el-tabs v-model="tabVal" type="border-card">
          <el-tab-pane label="JEE ADVANCED" name="jee-advanced">
            <AchieverStudentLoading v-if="achieverStudentPending" :count="8" />
            <div
              v-if="!achieverStudentPending && achieverStudent && achieverStudent.data.length > 0"
              class="achiever-row row justify-content-center"
            >
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
              <div class="col-lg-12 col-md-12 text-center">
                <NuxtLink
                  noPrefetch
                  to="/achievers/jee-advanced"
                  class="default-btn border-radius-50"
                  aria-label="View All achievers"
                >
                  View All achievers
                </NuxtLink>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="JEE MAINS" name="jee-mains">
            <AchieverStudentLoading v-if="achieverStudentPending" :count="8" />
            <div
              v-if="!achieverStudentPending && achieverStudent && achieverStudent.data.length > 0"
              class="achiever-row row justify-content-center"
            >
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
              <div class="col-lg-12 col-md-12 text-center">
                <NuxtLink
                  noPrefetch
                  to="/achievers/jee-mains"
                  class="default-btn border-radius-50"
                  aria-label="View All achievers"
                >
                  View All achievers
                </NuxtLink>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="NEET" name="neet">
            <AchieverStudentLoading v-if="achieverStudentPending" :count="8" />
            <div
              v-if="!achieverStudentPending && achieverStudent && achieverStudent.data.length > 0"
              class="achiever-row row justify-content-center"
            >
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
              <div class="col-lg-12 col-md-12 text-center">
                <NuxtLink
                  noPrefetch
                  to="/achievers/neet"
                  class="default-btn border-radius-50"
                  aria-label="View All achievers"
                >
                  View All achievers
                </NuxtLink>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="K-CET" name="k-cet">
            <AchieverStudentLoading v-if="achieverStudentPending" :count="8" />
            <div
              v-if="!achieverStudentPending && achieverStudent && achieverStudent.data.length > 0"
              class="achiever-row row justify-content-center"
            >
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
              <div class="col-lg-12 col-md-12 text-center">
                <NuxtLink
                  noPrefetch
                  to="/achievers/k-cet"
                  class="default-btn border-radius-50"
                  aria-label="View All achievers"
                >
                  View All achievers
                </NuxtLink>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="NSTSE" name="nstse">
            <AchieverStudentLoading v-if="achieverStudentPending" :count="8" />
            <div
              v-if="!achieverStudentPending && achieverStudent && achieverStudent.data.length > 0"
              class="achiever-row row justify-content-center"
            >
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
              <div class="col-lg-12 col-md-12 text-center">
                <NuxtLink
                  noPrefetch
                  to="/achievers/nstse"
                  class="default-btn border-radius-50"
                  aria-label="View All achievers"
                >
                  View All achievers
                </NuxtLink>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="faq-area pt-70" style="margin-top: 2rem;">
      <div class="container-fluid px-0">
        <div class="row">
          <div class="col-lg-5">
            <div class="faq-img">
              <NuxtImg
                format="webp"
                loading="lazy"
                placeholder="/images/img-placeholder.webp"
                src="/images/admission_2.webp"
                width="700px"
                alt="faq"
              />
              <div class="shape">
                <NuxtImg format="webp" loading="lazy" src="/images/faq-shape.png" height="90px" alt="Faq" />
              </div>
            </div>
          </div>
          <div class="col-lg-7 col-sm-12">
            <div id="form-area" class="contact-widget-area faq-contact">
              <div class="container">
                <div class="register-form">
                  <div class="top-header text-center">
                    <h3>AAASAT 2025</h3>
                  </div>
                  <el-tabs v-model="applyTabVal" type="border-card">
                    <el-tab-pane label="APPLY NOW" name="apply-tab">
                      <div class="contact-form">
                        <form id="contactForm" method="post" @submit.prevent="onSubmit">
                          <div class="row">
                            <div class="col-12">
                              <h3 class="user-title">
                                Personal Information
                              </h3>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-group">
                                <CustomElInput name="name" placeholder="Name*" />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-group">
                                <CustomElInput name="email" placeholder="Email*" />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-group">
                                <CustomElInput name="school_name" placeholder="School Name*" />
                              </div>
                            </div>
                            <div class="col-lg-12 col-md-12">
                              <div class="form-group">
                                <CustomElInput name="address" type="textarea" placeholder="Address*" />
                              </div>
                            </div>
                            <div class="col-lg-12 col-md-12">
                              <div class="form-group">
                                <label class="form-label">Choose Passport Size Photo* <br>
                                  <code>(Only JPEG | WEBP | JPG | PNG files are allowed. Max-size 512kb)</code></label>
                                <VeeField id="image" type="file" name="image" class="form-control" />
                                <VeeErrorMessage name="image" as="div" class="is-invalid" />
                              </div>
                            </div>
                            <div class="col-12">
                              <h3 class="user-title">
                                Father's Information
                              </h3>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-group">
                                <CustomElInput name="father_name" placeholder="Father's Name*" />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-group">
                                <CustomElInput name="father_phone" placeholder="Father's Phone*" />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-group">
                                <CustomElInput name="father_email" placeholder="Father's Email*" />
                              </div>
                            </div>
                            <div class="col-12">
                              <h3 class="user-title">
                                Mother's Information
                              </h3>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-group">
                                <CustomElInput name="mother_name" placeholder="Mother's Name*" />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-group">
                                <CustomElInput name="mother_phone" placeholder="Mother's Phone*" />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-group">
                                <CustomElInput name="mother_email" placeholder="Mother's Email*" />
                              </div>
                            </div>
                            <div class="col-12">
                              <h3 class="user-title">
                                Admission's Information
                              </h3>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-group">
                                <CustomElSelect name="class" placeholder="Select Your Class*" :options="classOptions" />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-group">
                                <CustomElSelect
                                  name="program"
                                  placeholder="Select Your Program*"
                                  :options="programOptions"
                                />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-group">
                                <CustomElSelect
                                  name="mode"
                                  placeholder="Select Your Exam Mode*"
                                  :options="modeOptions"
                                />
                              </div>
                            </div>
                            <div v-if="examMode === 'OFFLINE'" class="col-12 mb-3">
                              <h3 class="user-title">
                                Please give us your comfortable date & time to
                                attend the admission test
                              </h3>
                            </div>
                            <div v-if="examMode === 'OFFLINE'" class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <CustomElSelect
                                  name="exam_date"
                                  placeholder="Select Exam Date*"
                                  :options="examDateOptions"
                                />
                              </div>
                            </div>
                            <div v-if="examMode === 'OFFLINE'" class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <CustomElSelect
                                  name="exam_center"
                                  placeholder="Select Exam Center*"
                                  :options="examCenterOptions"
                                />
                              </div>
                            </div>
                            <div class="col-12">
                              <h3 class="user-title">
                                Security's Information
                              </h3>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <CustomElInput type="password" name="password" placeholder="Password*" />
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <CustomElInput
                                  type="password"
                                  name="confirm_password"
                                  placeholder="Confirm Password*"
                                />
                              </div>
                            </div>
                            <div class="col-lg-12 col-md-12">
                              <button type="submit" :disabled="loading" class="default-btn">
                                <template v-if="!loading">
                                  Submit
                                </template>
                                <div v-else class="spinner-border" role="status" />
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="ALREADY APPLIED" name="applied-tab">
                      abc
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="testimonial-area" class="testimonials-area pt-70 pb-70">
      <div class="container">
        <div class="section-title text-center">
          <span>TESTIMONIAL</span>
          <h2>What our learner's have to say</h2>
        </div>
        <TestimonialCardLoading v-if="pending" :count="9" />
        <div v-if="!pending && data && data.data.length > 0" class="testimonials-slider-two row">
          <div v-for="(item, i) in data.data" :key="i" class="col-lg-4 col-md-6 col-sm-12">
            <TestimonialCard
              :image="item.image"
              :name="item.name"
              :star="item.star"
              :message="item.message"
              :designation="item.designation"
            />
          </div>
        </div>
        <div class="col-lg-12 col-md-12 text-center">
          <NuxtLink noPrefetch to="/testimonial" class="default-btn border-radius-50" aria-label="View all Testimonial">
            View all Testimonial
          </NuxtLink>
        </div>
      </div>
    </div>

    <el-dialog v-model="dialogVideoVisible" title="Hareesh PK" width="90%" top="20px">
      <iframe
        v-if="dialogVideoVisible"
        src="https://www.youtube.com/embed/sfCJJZ0Wmi8?rel=0&autoplay=1&loop=1"
        frameborder="0"
        width="100%"
        height="550"
        allowfullscreen
      />
    </el-dialog>
  </div>
</template>

<style scoped>
.banner-img-admission{
  width: 100%;
  object-fit: cover;
  height: 470px;
  object-fit: cover;
  object-position: center;
}

.fs-4{
  font-size: 1.2rem;
  font-weight: 600;
}

.head-one h2 {
  text-align: center;
  text-transform: uppercase;
  padding-bottom: 5px;
  position: relative;
}

.head-one h2:before {
  width: 28px;
  height: 5px;
  display: block;
  content: "";
  position: absolute;
  bottom: 3px;
  left: 50%;
  margin-left: -14px;
  background-color: var(--mainColor);
}

.head-one h2:after {
  width: 100px;
  height: 1px;
  display: block;
  content: "";
  position: relative;
  margin-top: 25px;
  left: 50%;
  margin-left: -50px;
  background-color: var(--mainColor);
}

.enrolled-list li{
  font-size: 16px;
}

.content-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  width: 100%;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.content-table thead tr {
  background-color: var(--titleColor);
  color: #ffffff;
  text-align: left;
  font-weight: bold;
}

.content-table th,
.content-table td {
  padding: 12px 15px;
}

.content-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.content-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.content-table tbody tr:last-of-type {
  border-bottom: 2px solid var(--titleColor);
}

.content-table tbody tr.active-row {
  font-weight: bold;
  color: var(--titleColor);
}

.confetti{
  position: relative;
}

.pyro>.before,
.pyro>.after {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff;
  -moz-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -webkit-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -o-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -ms-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
}

.pyro>.after {
  -moz-animation-delay: 1.25s, 1.25s, 1.25s;
  -webkit-animation-delay: 1.25s, 1.25s, 1.25s;
  -o-animation-delay: 1.25s, 1.25s, 1.25s;
  -ms-animation-delay: 1.25s, 1.25s, 1.25s;
  animation-delay: 1.25s, 1.25s, 1.25s;
  -moz-animation-duration: 1.25s, 1.25s, 6.25s;
  -webkit-animation-duration: 1.25s, 1.25s, 6.25s;
  -o-animation-duration: 1.25s, 1.25s, 6.25s;
  -ms-animation-duration: 1.25s, 1.25s, 6.25s;
  animation-duration: 1.25s, 1.25s, 6.25s;
}

@-webkit-keyframes bang {
  to {
    box-shadow: -225px -400.6666666667px #0091ff, -124px -14.6666666667px #ff00a6, -211px -212.6666666667px #ffc400, -218px -305.6666666667px #e600ff, 94px -12.6666666667px #00ff11, 187px -239.6666666667px #4000ff, -134px -105.6666666667px #eeff00, 7px 12.3333333333px #ff0044, -19px -142.6666666667px #9900ff, -63px -336.6666666667px #00e1ff, 148px -283.6666666667px #ffae00, -226px 11.3333333333px #59ff00, 108px 39.3333333333px #ff001e, -238px 41.3333333333px #0055ff, -246px -304.6666666667px #ff3700, 242px 58.3333333333px #00ff51, 78px -70.6666666667px #004dff, 122px -45.6666666667px #00aeff, -41px -2.6666666667px #80ff00, -35px -246.6666666667px #ff4d00, -228px -262.6666666667px #5500ff, -26px 81.3333333333px #ff6a00, -82px -71.6666666667px #ff0091, 194px -186.6666666667px #4800ff, -76px -247.6666666667px #fff700, -36px -349.6666666667px #e1ff00, -197px 43.3333333333px #ff4400, -218px -211.6666666667px #9100ff, -14px -106.6666666667px #ff5100, -180px -154.6666666667px #ff0066, 226px 35.3333333333px #00ff80, 245px -172.6666666667px #ff9d00, -43px -367.6666666667px #0088ff, -12px -350.6666666667px #002fff, -1px -95.6666666667px #ff0062, 0px -171.6666666667px #ff1e00, 34px -163.6666666667px #0037ff, 63px -285.6666666667px #6fff00, 94px -293.6666666667px #0080ff, 236px -177.6666666667px #ea00ff, -19px -328.6666666667px #00ff95, 13px -333.6666666667px #c8ff00, -40px 72.3333333333px #00b3ff, 17px -28.6666666667px #00ff80, -106px 47.3333333333px #1e00ff, 174px -31.6666666667px #cc00ff, 72px 79.3333333333px blue, 88px -60.6666666667px #ff2200, -234px -241.6666666667px #8800ff, 238px -322.6666666667px #ffdd00, -164px -273.6666666667px #00ff2f;
  }
}

@-moz-keyframes bang {
  to {
    box-shadow: -225px -400.6666666667px #0091ff, -124px -14.6666666667px #ff00a6, -211px -212.6666666667px #ffc400, -218px -305.6666666667px #e600ff, 94px -12.6666666667px #00ff11, 187px -239.6666666667px #4000ff, -134px -105.6666666667px #eeff00, 7px 12.3333333333px #ff0044, -19px -142.6666666667px #9900ff, -63px -336.6666666667px #00e1ff, 148px -283.6666666667px #ffae00, -226px 11.3333333333px #59ff00, 108px 39.3333333333px #ff001e, -238px 41.3333333333px #0055ff, -246px -304.6666666667px #ff3700, 242px 58.3333333333px #00ff51, 78px -70.6666666667px #004dff, 122px -45.6666666667px #00aeff, -41px -2.6666666667px #80ff00, -35px -246.6666666667px #ff4d00, -228px -262.6666666667px #5500ff, -26px 81.3333333333px #ff6a00, -82px -71.6666666667px #ff0091, 194px -186.6666666667px #4800ff, -76px -247.6666666667px #fff700, -36px -349.6666666667px #e1ff00, -197px 43.3333333333px #ff4400, -218px -211.6666666667px #9100ff, -14px -106.6666666667px #ff5100, -180px -154.6666666667px #ff0066, 226px 35.3333333333px #00ff80, 245px -172.6666666667px #ff9d00, -43px -367.6666666667px #0088ff, -12px -350.6666666667px #002fff, -1px -95.6666666667px #ff0062, 0px -171.6666666667px #ff1e00, 34px -163.6666666667px #0037ff, 63px -285.6666666667px #6fff00, 94px -293.6666666667px #0080ff, 236px -177.6666666667px #ea00ff, -19px -328.6666666667px #00ff95, 13px -333.6666666667px #c8ff00, -40px 72.3333333333px #00b3ff, 17px -28.6666666667px #00ff80, -106px 47.3333333333px #1e00ff, 174px -31.6666666667px #cc00ff, 72px 79.3333333333px blue, 88px -60.6666666667px #ff2200, -234px -241.6666666667px #8800ff, 238px -322.6666666667px #ffdd00, -164px -273.6666666667px #00ff2f;
  }
}

@-o-keyframes bang {
  to {
    box-shadow: -225px -400.6666666667px #0091ff, -124px -14.6666666667px #ff00a6, -211px -212.6666666667px #ffc400, -218px -305.6666666667px #e600ff, 94px -12.6666666667px #00ff11, 187px -239.6666666667px #4000ff, -134px -105.6666666667px #eeff00, 7px 12.3333333333px #ff0044, -19px -142.6666666667px #9900ff, -63px -336.6666666667px #00e1ff, 148px -283.6666666667px #ffae00, -226px 11.3333333333px #59ff00, 108px 39.3333333333px #ff001e, -238px 41.3333333333px #0055ff, -246px -304.6666666667px #ff3700, 242px 58.3333333333px #00ff51, 78px -70.6666666667px #004dff, 122px -45.6666666667px #00aeff, -41px -2.6666666667px #80ff00, -35px -246.6666666667px #ff4d00, -228px -262.6666666667px #5500ff, -26px 81.3333333333px #ff6a00, -82px -71.6666666667px #ff0091, 194px -186.6666666667px #4800ff, -76px -247.6666666667px #fff700, -36px -349.6666666667px #e1ff00, -197px 43.3333333333px #ff4400, -218px -211.6666666667px #9100ff, -14px -106.6666666667px #ff5100, -180px -154.6666666667px #ff0066, 226px 35.3333333333px #00ff80, 245px -172.6666666667px #ff9d00, -43px -367.6666666667px #0088ff, -12px -350.6666666667px #002fff, -1px -95.6666666667px #ff0062, 0px -171.6666666667px #ff1e00, 34px -163.6666666667px #0037ff, 63px -285.6666666667px #6fff00, 94px -293.6666666667px #0080ff, 236px -177.6666666667px #ea00ff, -19px -328.6666666667px #00ff95, 13px -333.6666666667px #c8ff00, -40px 72.3333333333px #00b3ff, 17px -28.6666666667px #00ff80, -106px 47.3333333333px #1e00ff, 174px -31.6666666667px #cc00ff, 72px 79.3333333333px blue, 88px -60.6666666667px #ff2200, -234px -241.6666666667px #8800ff, 238px -322.6666666667px #ffdd00, -164px -273.6666666667px #00ff2f;
  }
}

@-ms-keyframes bang {
  to {
    box-shadow: -225px -400.6666666667px #0091ff, -124px -14.6666666667px #ff00a6, -211px -212.6666666667px #ffc400, -218px -305.6666666667px #e600ff, 94px -12.6666666667px #00ff11, 187px -239.6666666667px #4000ff, -134px -105.6666666667px #eeff00, 7px 12.3333333333px #ff0044, -19px -142.6666666667px #9900ff, -63px -336.6666666667px #00e1ff, 148px -283.6666666667px #ffae00, -226px 11.3333333333px #59ff00, 108px 39.3333333333px #ff001e, -238px 41.3333333333px #0055ff, -246px -304.6666666667px #ff3700, 242px 58.3333333333px #00ff51, 78px -70.6666666667px #004dff, 122px -45.6666666667px #00aeff, -41px -2.6666666667px #80ff00, -35px -246.6666666667px #ff4d00, -228px -262.6666666667px #5500ff, -26px 81.3333333333px #ff6a00, -82px -71.6666666667px #ff0091, 194px -186.6666666667px #4800ff, -76px -247.6666666667px #fff700, -36px -349.6666666667px #e1ff00, -197px 43.3333333333px #ff4400, -218px -211.6666666667px #9100ff, -14px -106.6666666667px #ff5100, -180px -154.6666666667px #ff0066, 226px 35.3333333333px #00ff80, 245px -172.6666666667px #ff9d00, -43px -367.6666666667px #0088ff, -12px -350.6666666667px #002fff, -1px -95.6666666667px #ff0062, 0px -171.6666666667px #ff1e00, 34px -163.6666666667px #0037ff, 63px -285.6666666667px #6fff00, 94px -293.6666666667px #0080ff, 236px -177.6666666667px #ea00ff, -19px -328.6666666667px #00ff95, 13px -333.6666666667px #c8ff00, -40px 72.3333333333px #00b3ff, 17px -28.6666666667px #00ff80, -106px 47.3333333333px #1e00ff, 174px -31.6666666667px #cc00ff, 72px 79.3333333333px blue, 88px -60.6666666667px #ff2200, -234px -241.6666666667px #8800ff, 238px -322.6666666667px #ffdd00, -164px -273.6666666667px #00ff2f;
  }
}

@keyframes bang {
  to {
    box-shadow: -225px -400.6666666667px #0091ff, -124px -14.6666666667px #ff00a6, -211px -212.6666666667px #ffc400, -218px -305.6666666667px #e600ff, 94px -12.6666666667px #00ff11, 187px -239.6666666667px #4000ff, -134px -105.6666666667px #eeff00, 7px 12.3333333333px #ff0044, -19px -142.6666666667px #9900ff, -63px -336.6666666667px #00e1ff, 148px -283.6666666667px #ffae00, -226px 11.3333333333px #59ff00, 108px 39.3333333333px #ff001e, -238px 41.3333333333px #0055ff, -246px -304.6666666667px #ff3700, 242px 58.3333333333px #00ff51, 78px -70.6666666667px #004dff, 122px -45.6666666667px #00aeff, -41px -2.6666666667px #80ff00, -35px -246.6666666667px #ff4d00, -228px -262.6666666667px #5500ff, -26px 81.3333333333px #ff6a00, -82px -71.6666666667px #ff0091, 194px -186.6666666667px #4800ff, -76px -247.6666666667px #fff700, -36px -349.6666666667px #e1ff00, -197px 43.3333333333px #ff4400, -218px -211.6666666667px #9100ff, -14px -106.6666666667px #ff5100, -180px -154.6666666667px #ff0066, 226px 35.3333333333px #00ff80, 245px -172.6666666667px #ff9d00, -43px -367.6666666667px #0088ff, -12px -350.6666666667px #002fff, -1px -95.6666666667px #ff0062, 0px -171.6666666667px #ff1e00, 34px -163.6666666667px #0037ff, 63px -285.6666666667px #6fff00, 94px -293.6666666667px #0080ff, 236px -177.6666666667px #ea00ff, -19px -328.6666666667px #00ff95, 13px -333.6666666667px #c8ff00, -40px 72.3333333333px #00b3ff, 17px -28.6666666667px #00ff80, -106px 47.3333333333px #1e00ff, 174px -31.6666666667px #cc00ff, 72px 79.3333333333px blue, 88px -60.6666666667px #ff2200, -234px -241.6666666667px #8800ff, 238px -322.6666666667px #ffdd00, -164px -273.6666666667px #00ff2f;
  }
}

@-webkit-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}

@-moz-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}

@-o-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}

@-ms-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}

@keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}

@-webkit-keyframes position {

  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }

  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }

  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }

  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }

  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}

@-moz-keyframes position {

  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }

  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }

  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }

  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }

  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}

@-o-keyframes position {

  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }

  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }

  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }

  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }

  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}

@-ms-keyframes position {

  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }

  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }

  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }

  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }

  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}

@keyframes position {

  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }

  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }

  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }

  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }

  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}

.faq-area{
  background-color: #f5f5f5;
}

.contact-form{
  padding: 0;
  background-color: transparent;
}
</style>
