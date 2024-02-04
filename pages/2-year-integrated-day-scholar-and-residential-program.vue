<script setup lang="ts">
import { object, string, number } from 'yup'
import { useToast } from 'vue-toastification'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { API_ROUTES } from '@/utils/api_routes'

const toast = useToast()

const { handleSubmit, defineField } = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string().required(),
      email: string().email().required(),
      phone: number()
        .typeError('phone must be a number')
        .lessThan(9999999999, 'phone must be less than 10 digits')
        .moreThan(100000000, 'phone must be equal to 10 digits')
        .required(),
      course: string().required(),
      branch: string().required()
    })
  )
})

const [course] = defineField('course')

const loading = ref(false)
const courseOptions = useState('courseOptions', () => [
  {
    value: 'Day Scholar',
    label: 'Day Scholar'
  },
  {
    value: 'Residential',
    label: 'Residential'
  }
])
const dayScholarBranchOptions = useState('dayScholarBranchOptions', () => [
  {
    value: 'Vijayanagar (PU & CBSE)',
    label: 'Vijayanagar (PU & CBSE)'
  },
  {
    value: 'NPS Kengeri (CBSE)',
    label: 'NPS Kengeri (CBSE)'
  },
  {
    value: 'VSS School, Ullal (CBSE)',
    label: 'VSS School, Ullal (CBSE)'
  },
  {
    value: 'Vedantha College, Vasanthapura (PU)',
    label: 'Vedantha College, Vasanthapura (PU)'
  }
])
const residentialBranchOptions = useState('residentialBranchOptions', () => [
  {
    value: 'Vijayanagar (for both boys & girls)',
    label: 'Vijayanagar (for both boys & girls)'
  },
  {
    value: 'Vedantha College, Vasanthapura (for girls only)',
    label: 'Vedantha College, Vasanthapura (for girls only)'
  },
  {
    value: 'Parivarthana College, Mysore (for both boys & girls)',
    label: 'Parivarthana College, Mysore (for both boys & girls)'
  }
])

const onSubmit = handleSubmit(async (values: any, actions: any) => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('phone', values.phone)
    formData.append('email', values.email)
    formData.append('course', values.course)
    formData.append('branch', values.branch)
    const response = await useCustomFetch(API_ROUTES.day_scholar, {
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
      phone: err?.errors?.phone?.length > 0 && err?.errors?.phone[0],
      course: err?.errors?.course?.length > 0 && err?.errors?.course[0],
      branch: err?.errors?.branch?.length > 0 && err?.errors?.branch[0]
    })
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <SeoHeader slug="day-scholar-page" />

    <div class="blog-details-area">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="blog-details-content">
              <div class="blog-preview-img">
                <NuxtImg
                  v-if="course==='Day Scholar'"
                  placeholder="/images/placeholder.webp"
                  width="1280"
                  src="/images/scholar-bg.jpg"
                  alt="2 Year Integrated Day Scholar Program for PU/CBSE Boards, CET, NEET and JEE"
                  title="2 Year Integrated Day Scholar Program for PU/CBSE Boards, CET, NEET and JEE"
                />
                <NuxtImg
                  v-else
                  width="1280"
                  placeholder="/images/placeholder.webp"
                  src="/images/residential-bg.jpg"
                  alt="2 Year Integrated Residential Program for PU/CBSE Boards, CET, JEE and NEET"
                  title="2 Year Integrated Residential Program for PU/CBSE Boards, CET, JEE and NEET"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="register-form form-sticky">
              <div class="top-header">
                <h4 class="size text-center text-light">
                  Fill in your details
                </h4>
              </div>
              <div class="contact-form px-3">
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
                    <div class="col-lg-12 col-sm-12">
                      <div class="form-group">
                        <CustomElSelect
                          name="course"
                          placeholder="Select Your Course*"
                          :options="courseOptions"
                        />
                      </div>
                    </div>
                    <div class="col-lg-12 col-sm-12">
                      <div v-if="course==='Day Scholar'" class="form-group">
                        <CustomElSelect
                          name="branch"
                          placeholder="Select Your Branch*"
                          :options="dayScholarBranchOptions"
                        />
                      </div>
                      <div v-if="course==='Residential'" class="form-group">
                        <CustomElSelect
                          name="branch"
                          placeholder="Select Your Branch*"
                          :options="residentialBranchOptions"
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
            </div>
          </div>
          <div :class="'col-lg-9'">
            <div class="blog-details-content pr-20 main-content">
              <div class="side-bar-area">
                <div class="side-bar-widget py-2">
                  <ul class="side-bar-widget-tag">
                    <li :class="course==='Day Scholar' && 'active'" @click="course='Day Scholar'">
                      <a href="javascript:void(0)" aria-label="2 year day scholar cet, jee, neet integrated pu/cbse program">2 year day scholar cet, jee, neet integrated pu/cbse program</a>
                    </li>
                    <li :class="course==='Residential' && 'active'" @click="course='Residential'">
                      <a href="javascript:void(0)" aria-label="2 year day residential cet, jee, neet integrated pu/cbse program">2 year day residential cet, jee, neet integrated pu/cbse program</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div v-if="course==='Day Scholar'" class="scholar-info pt-2">
                <ul>
                  <li>
                    This integrated programme is designed to help students to excel in their board
                    exams. (PU and CBSE 12)
                  </li>
                  <li>
                    It is also designed to help students crack competitive exams like KCET, JEE
                    Mains, JEE Advanced, NEET and KVPY
                  </li>
                  <li>The environment is ideal for thorough preparation of the exams.</li>
                  <li>
                    1600+ classroom Teaching Hours with Weekly Lab Sessions and Monthly Parents
                    Teachers Team.
                  </li>
                  <li>
                    400+ Teacher Assisted JEE, NEET &amp; KVPY Problem solving sessions in a Year to
                    ensure excellent results.
                  </li>
                  <li>The Faculty are all experts and ex-IITians, NITians, and NEET Toppers.</li>
                  <li>
                    Students receive career guidance for choosing the best institutes for their
                    undergraduate courses.
                  </li>
                  <li>
                    There is a single comprehensive study material, with daily practice problems as
                    home assignments.
                  </li>
                </ul>
              </div>

              <div v-else class="residential-info pt-2">
                <ul>
                  <li>
                    This integrated programme is designed to help students to excel in their board
                    exams. (PU and CBSE 12)
                  </li>
                  <li>
                    It is also designed to help students crack competitive exams like KCET, JEE
                    Mains, JEE Advanced, NEET and KVPY
                  </li>
                  <li>The environment is ideal for thorough preparation of the exams.</li>
                  <li>
                    1600+ classroom Teaching Hours with Weekly Lab Sessions and Monthly Parents
                    Teachers Team.
                  </li>
                  <li>
                    600+ Teacher Assisted JEE, NEET &amp; KVPY Problem solving sessions in a Year to
                    ensure excellent results.
                  </li>
                  <li>The Faculty are all experts and ex-IITians, NITians, and NEET Toppers.</li>
                  <li>
                    Students receive career guidance for choosing the best institutes for their
                    undergraduate courses.
                  </li>
                  <li>
                    There is a single comprehensive study material, with daily practice problems as
                    home assignments.
                  </li>
                  <li>
                    Hostel Environment ensures zero distractions. Teachers residing in the same
                    campus with the Students ensures guaranteed success
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.side-bar-widget .side-bar-widget-tag li.active {
    position: relative;
    z-index: 10;
}
.side-bar-widget .side-bar-widget-tag li.active a {
    color: var(--whiteColor);
    background-color: var(--mainColor);
}
.side-bar-widget .side-bar-widget-tag li.active a:after {
    content: "";
    left: 45%;
    bottom: -18px;
    margin-top: -25px;
    width: 40px;
    height: 40px;
    background: #eacf6c;
    position: absolute;
    display: block;
    transform: rotate(50grad);
    z-index: -1;
}

@media only screen and (max-width:767px) {
    .side-bar-widget .side-bar-widget-tag li.active a:after {
        left: 40%;
        bottom: -12px;
    }
}
</style>
