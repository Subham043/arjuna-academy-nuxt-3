<script setup lang="ts">
import { object, string, number } from 'yup'
import { useToast } from 'vue-toastification'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { API_ROUTES } from '@/utils/api_routes'
import type { CampaignType } from '~/utils/types'

const config = useRuntimeConfig()

const toast = useToast()
const route = useRoute()

const { data, pending, error } = useSSRFetch<{
  campaign: CampaignType;
}>(() => API_ROUTES.campaign + `/${route.params.slug}`, {
  key: 'campaign_' + route.params.slug,
  lazy: true
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.message
  })
}

useSeoMeta({
  title: () => data.value ? data.value.campaign.meta_title : 'Arjunaa Academy For Achievers',
  ogTitle: () => data.value ? data.value.campaign.meta_title : 'Arjunaa Academy For Achievers',
  twitterTitle: () => data.value ? data.value.campaign.meta_title : 'Arjunaa Academy For Achievers',
  description: () => data.value ? data.value.campaign.meta_description : 'Arjunaa Academy For Achievers',
  ogDescription: () => data.value ? data.value.campaign.meta_description : 'Arjunaa Academy For Achievers',
  twitterDescription: () => data.value ? data.value.campaign.meta_description : 'Arjunaa Academy For Achievers',
  keywords: () => data.value ? data.value.campaign.meta_keywords : 'Arjunaa Academy For Achievers',
  ogUrl: config.public.mainURL + (route.fullPath === '/' ? '' : route.fullPath),
  ogType: 'website',
  ogImage: () => data.value ? data.value.campaign.image : '/images/logos/new-logo.webp',
  twitterImage: () => data.value ? data.value.campaign.image : '/images/logos/new-logo.webp',
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
      innerHTML: () => data.value ? data.value.campaign.meta_scripts : undefined
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

const loading = ref(false)

const onSubmit = handleSubmit(async (values: any, actions: any) => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('phone', values.phone)
    formData.append('email', values.email)
    const response = await useCustomFetch(API_ROUTES.campaign + `/enquiry/${data.value ? data.value.campaign.id : ''}`, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      toast.success('Enquiry Recieved Successfully.')
      actions.resetForm()
    } else {
      throw content
    }
  } catch (err: any) {
    toast.error(err?.message)
    actions.setErrors({
      email: err?.errors?.email?.length > 0 && err?.errors?.email[0],
      name: err?.errors?.name?.length > 0 && err?.errors?.name[0],
      phone: err?.errors?.phone?.length > 0 && err?.errors?.phone[0]
    })
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="blog-details-area pb-70">
      <div class="container">
        <div class="row">
          <template v-if="!pending && data">
            <div class="col-lg-12">
              <div class="blog-details-content">
                <div class="blog-preview-img">
                  <NuxtImg
                    preload
                    loading="eager"
                    format="webp"
                    placeholder="/images/placeholder.webp"
                    :src="data.campaign.image"
                    :alt="data.campaign.image_alt"
                    :title="data.campaign.image_title"
                    width="1280px"
                  />
                </div>
              </div>
            </div>
            <div v-if="data.campaign.include_form === true" class="col-lg-3">
              <div class="register-form form-sticky">
                <div class="top-header">
                  <h3 class="size" v-html="data.campaign.form_heading" />
                </div>
                <div class="contact-form px-3">
                  <h5 class="text-center">
                    Fill in your details
                  </h5>
                  <form
                    id="contactForm"
                    method="post"
                    @submit.prevent="onSubmit"
                  >
                    <div class="row">
                      <div class="col-lg-12 col-sm-12">
                        <div class="form-group">
                          <CustomElInput name="name" placeholder="Your Name*" />
                        </div>
                      </div>
                      <div class="col-lg-12 col-sm-12">
                        <div class="form-group">
                          <CustomElInput name="email" placeholder="Your Email*" />
                        </div>
                      </div>
                      <div class="col-lg-12 col-sm-12">
                        <div class="form-group">
                          <CustomElInput name="phone" placeholder="Your Phone*" />
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
              </div>
            </div>
            <div :class="data.campaign.include_form === true ? 'col-lg-9' : 'col-lg-12'">
              <div class="blog-details-content pr-20 main-content">
                <template v-if="!pending && data">
                  <h1 v-html="data.campaign.heading" />
                  <div v-html="data.campaign.description" />
                  <template v-if="data.campaign.include_testimonial === true">
                    <div class="section-title text-center">
                      <span>TESTIMONIAL</span>
                      <h2 v-html="data.campaign.testimonial_heading" />
                    </div>
                    <div v-if="data.campaign.testimonials.length>0" class="testimonials-slider-two row justify-content-center mt-4">
                      <div
                        v-for="(item, i) in data.campaign.testimonials"
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
                  <template v-if="data.campaign.include_topper === true">
                    <div class="section-title text-center">
                      <span>ACHIEVERS</span>
                      <h2 v-html="data.campaign.topper_heading" />
                    </div>
                    <div v-if="data.campaign.achievers.length>0" class="achiever-row row justify-content-center mt-4">
                      <div v-for="(item, i) in data.campaign.achievers" :key="i" class="col-lg-3 col-md-4 col-sm-6">
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
                  <div class="article-share">
                    <div class="row align-items-center justify-content-center">
                      <div class="col-lg-auto col-md-auto">
                        <div class="article-social-icon">
                          <ul class="social-icon">
                            <li class="title">
                              Share :
                            </li>
                            <li>
                              <a
                                :href="`https://www.facebook.com/share.php?u=${config.public.mainURL}/${data.campaign.slug}&title=${data.campaign.name}`"
                                target="_blank"
                              >
                                <span class="svg-icon">
                                  <Icon name="fa6-brands:facebook-f" />
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                :href="`https://twitter.com/share?text=${data.campaign.name}&url=${config.public.mainURL}/${data.campaign.slug}`"
                                target="_blank"
                              >
                                <span class="svg-icon">
                                  <Icon name="fa6-brands:twitter" />
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                :href="`https://www.linkedin.com/shareArticle?mini=true&url=${config.public.mainURL}/${data.campaign.slug}&title=${data.campaign.name}&source=${data.campaign.name}`"
                                target="_blank"
                              >
                                <span class="svg-icon">
                                  <Icon name="fa6-brands:linkedin" />
                                </span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
          <template v-else>
            <el-skeleton style="width: 100%" animated>
              <template #template>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="blog-details-content pr-20">
                      <div class="blog-preview-img">
                        <el-skeleton-item variant="image" style="width: 100%; height: 440px;" />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <el-skeleton-item variant="rect" style="width: 100%; height: 400px;" />
                  </div>
                  <div class="col-lg-9">
                    <el-skeleton-item variant="p" style="width: 50%" />
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
                    <el-skeleton-item variant="text" style="width: 50%;" />
                  </div>
                </div>
              </template>
            </el-skeleton>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
