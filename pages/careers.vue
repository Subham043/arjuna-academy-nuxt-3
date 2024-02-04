<script setup lang="ts">
import { object, string, number, mixed } from 'yup'
import { useToast } from 'vue-toastification'
import type { CollapseModelValue } from 'element-plus'
import { API_ROUTES } from '@/utils/api_routes'
import type { PaginationType, JobOpeningType } from '@/utils/types'

const { $scroll } = useNuxtApp()
const toast = useToast()
const route = useRoute()
const router = useRouter()
const page = ref((route.query.page && !isNaN(+route.query.page)) ? +route.query.page : 1)
const accordianValue = ref('0')
const dialogVideoVisible = ref(false)
const loading = ref(false)

const { data, pending } = await useSSRFetch<PaginationType<JobOpeningType>>(() => API_ROUTES.job_opening + `?total=9&page=${page.value}`, {
  key: 'job_openings_' + route.query.page || '1',
  lazy: true,
  watch: [page]
})

const paginationHandler = () => $scroll('#job-area', () => router.push({ query: { page: page.value } }))

const schema = object({
  name: string().required(),
  email: string().email().required(),
  phone: number()
    .typeError('phone must be a number')
    .lessThan(9999999999, 'phone must be less than 10 digits')
    .moreThan(100000000, 'phone must be equal to 10 digits')
    .required(),
  cv: mixed()
    .required('Please select an image')
    .test('fileFormat', 'Please select a valid image', (value:any) => {
      if (value !== undefined) {
        return ['image/webp', 'image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(value.type)
      }
      return true
    })
})

const onSubmit = async (values: any, actions: any) => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('phone', values.phone)
    formData.append('email', values.email)
    formData.append('cv', values.cv)
    const response = await useCustomFetch(API_ROUTES.job_opening + `/enquiry/${accordianValue.value}/create`, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      toast.success(content.message)
      actions.resetForm()
      dialogVideoVisible.value = false
    } else {
      throw content
    }
  } catch (err: any) {
    toast.error(err?.message)
    actions.setErrors({
      email: err?.errors?.email?.length > 0 && err?.errors?.email[0],
      name: err?.errors?.name?.length > 0 && err?.errors?.name[0],
      phone: err?.errors?.phone?.length > 0 && err?.errors?.phone[0],
      cv: err?.errors?.cv?.length > 0 && err?.errors?.cv[0]
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <SeoHeader slug="careers-page" />

    <BreadCrumb
      title="Careers"
      :pages="[
        {
          link:'',
          name:'Careers'
        }
      ]"
    />

    <div class="enrolled-area pt-70 pb-70">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-5">
            <div class="enrolled-img-two mb-30" data-speed="0.05" data-revert="true">
              <NuxtImg placeholder="/images/placeholder.webp" src="/images/parent-say.webp" alt="Enrolled" width="500px" />
            </div>
          </div>
          <div class="col-lg-7">
            <div class="enrolled-content mb-30">
              <div class="section-title">
                <span>Careers</span>
                <h2>
                  Working at Arjunaa Academy For Achievers
                </h2>
                <p>
                  At AAAEDU, our vision is driven by our people. We strongly believe our success lies in our people. We take great pride in the exceptional pedagogy and quality of education we deliver to our students. We make an unusual effort to identify and recruit the very best person for every job. We extend a lot of ownership to our people and offer our people the opportunity to move ahead more rapidly than is possible at most other places.
                </p>
                <p>
                  We're looking for mission-focused candidates who have a deeper meaning in their work. We advocate for diversity and create a welcoming space for the employees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="featured-area pt-70 pb-70" data-aos="fade-up">
      <div class="container">
        <div class="row align-items-center mb-45">
          <div class="col-lg-12 col-md-12">
            <div class="section-title mt-rs-20 text-center">
              <span>Why Choose us</span>
              <h2>Why Join AAAEDU?</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-6">
            <div class="featured-item-two">
              <div class="feature-icon-holder">
                <NuxtImg placeholder="/images/placeholder.webp" src="/images/careers/heartbeat@1x.png" />
                <h3>Your wellbeing is our priority</h3>
              </div>
              <p>To be empowered to do your best, your wellbeing needs to come first. We prioritize the health, happiness, and wellbeing of an individual.</p>
            </div>
          </div>
          <div class="col-lg-6 col-6">
            <div class="featured-item-two">
              <div class="feature-icon-holder">
                <NuxtImg placeholder="/images/placeholder.webp" src="/images/careers/teamwork@1x.png" />
                <h3>Inclusion</h3>
              </div>
              <p>We foster a collaborative, inclusive culture that inspires you to give the best. We strive to create an accessible and inclusive experience for all candidates.</p>
            </div>
          </div>
          <div class="col-lg-6 col-6">
            <div class="featured-item-two">
              <div class="feature-icon-holder">
                <NuxtImg placeholder="/images/placeholder.webp" src="/images/careers/green-leaf@1x.png" />
                <h3>Learn and grow</h3>
              </div>
              <p>AAAEDU is a great place to start your working life, and we offer the opportunity to feel good by doing well in your everyday work. Our supportive environment enables you to learn, develop and be your best in the role that best suits you.</p>
            </div>
          </div>
          <div class="col-lg-6 col-6">
            <div class="featured-item-two">
              <div class="feature-icon-holder">
                <NuxtImg placeholder="/images/placeholder.webp" src="/images/careers/respect--1-@1x.png" />
                <h3>Integrity, Respect, Courage, and Transparency</h3>
              </div>
              <p>The employees are a crucial fabric of our culture. We work on four essential principles: Integrity, Respect, Courage, and Transparency. We are committed to putting ethics first, and these principles allow us to continue to be the most trusted Institute. We empower our people to approach challenges to fulfil the students' dreams.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="featured-area pt-70 pb-70">
      <div class="container">
        <div class="row align-items-center mb-45">
          <div class="col-lg-12 col-md-12">
            <div class="section-title mt-rs-20 text-center">
              <span>Current Openings</span>
              <h2>Explore a Bright Career at AAAEDU</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div id="job-area" class="col-lg-12 col-12">
            <div v-if="pending" class="row justify-content-center">
              <div v-for="i in 9" :key="i" class="col-lg-12 col-md-12">
                <el-skeleton style="width: 100%" animated>
                  <template #template>
                    <el-skeleton-item variant="p" style="width: 100%; height: 50px;" />
                    <br>
                  </template>
                </el-skeleton>
              </div>
            </div>
            <el-collapse v-if="!pending && data && data.data.length>0" accordion :value="accordianValue" data-aos="fade-up" @change="(val:CollapseModelValue)=>{accordianValue=val as string}">
              <el-collapse-item v-for="(item, i) in data.data" :key="i" :name="item.id">
                <template #title>
                  <div class="w-100 d-flex align-items-center justify-content-between">
                    <h4 class="col-auto m-0">
                      {{ item.name }}
                    </h4>
                    <button class="btn btn-success d-none-sm">
                      {{ accordianValue==item.id.toString() ? 'Hide' : 'View' }} Job Description
                    </button>
                  </div>
                </template>
                <div class="section-title" v-html="item.description" />
                <button class="btn btn-outline-warning mt-2" @click="dialogVideoVisible=true">
                  Apply Now
                </button>
              </el-collapse-item>
            </el-collapse>
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
    <el-dialog v-model="dialogVideoVisible" title="Recruitment Form" width="50%" top="20px">
      <div class="contact-form">
        <VeeForm v-slot="{ handleSubmit }" :validation-schema="schema" as="div">
          <form id="contactForm" @submit.prevent="handleSubmit($event, onSubmit)">
            <div class="row">
              <div class="col-lg-12">
                <div class="form-group">
                  <VeeField
                    id="name"
                    type="name"
                    name="name"
                    class="form-control"
                    data-error="Name*"
                    placeholder="Name*"
                  />
                  <VeeErrorMessage
                    name="name"
                    as="div"
                    class="is-invalid"
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group">
                  <VeeField
                    id="email"
                    type="email"
                    name="email"
                    class="form-control"
                    data-error="Email*"
                    placeholder="Email*"
                  />
                  <VeeErrorMessage
                    name="email"
                    as="div"
                    class="is-invalid"
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group">
                  <VeeField
                    id="phone"
                    type="phone"
                    name="phone"
                    class="form-control"
                    data-error="Phone*"
                    placeholder="Phone*"
                  />
                  <VeeErrorMessage
                    name="phone"
                    as="div"
                    class="is-invalid"
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group">
                  <label class="form-label">CV* <code>(Only PDF | JPG | PNG | PDF files are allowed. Max-size 512kb)</code></label>
                  <VeeField
                    id="cv"
                    type="file"
                    name="cv"
                    class="form-control"
                  />
                  <VeeErrorMessage
                    name="cv"
                    as="div"
                    class="is-invalid"
                  />
                </div>
              </div>
              <div class="col-lg-12 col-md-12 text-center">
                <button type="submit" :disabled="loading" class="default-btn">
                  <template v-if="!loading">
                    Submit Now
                  </template>
                  <div v-else class="spinner-border" role="status" />
                </button>
              </div>
            </div>
          </form>
        </VeeForm>
      </div>
    </el-dialog>
  </div>
</template>
