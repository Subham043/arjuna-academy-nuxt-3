<script setup lang="ts">
import { object, string, number, mixed } from 'yup'
import { useToast } from 'vue-toastification'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { API_ROUTES } from '@/utils/api_routes'
import { type ShortCourseType } from '@/utils/types'

const { data: courseData } = await useSSRFetch<{
  course: ShortCourseType[];
}>(() => API_ROUTES.course, {
  key: 'course_contact',
  lazy: true
})

const toast = useToast()
const route = useRoute()
const config = useRuntimeConfig()

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
      location: string().required(),
      request_type: string().required(),
      date: string().required(),
      time: string().required(),
      branch: mixed().when(['request_type'], {
        is: 'Visit Our Center',
        then: schema => schema.required(),
        otherwise: schema => schema
      }),
      message: string().required()
    })
  )
})

const [requestType] = defineField('request_type')

const loading = ref(false)
const branchOptions = useState('branchOptions', () => [
  {
    value: 'Vijaynagar',
    label: 'Vijaynagar'
  },
  {
    value: 'Hebbal',
    label: 'Hebbal'
  },
  {
    value: 'Kanakapura Road',
    label: 'Kanakapura Road'
  }
])
const requestOptions = useState('requestOptions', () => [
  {
    value: 'Call Back',
    label: 'Call Back'
  },
  {
    value: 'Home Visit',
    label: 'Home Visit'
  },
  {
    value: 'Visit Our Center',
    label: 'Visit Our Center'
  },
  {
    value: 'Connect Online',
    label: 'Connect Online'
  }
])
const maps = ref([
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15552.00140800217!2d77.538494!3d12.971829!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x515d5069e0a4fce1!2sArjunaa%20Academy%20for%20Achievers(AAA)%20JEE%2C%20NEET%20-%20Vijayanagar!5e0!3m2!1sen!2sin!4v1586440325192!5m2!1sen!2sin',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.454024789481!2d77.49268751403518!3d12.942773490874773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3e950bc53455%3A0x35253b19d0cb96fa!2sVSS%20INTERNATIONAL%20PUBLIC%20SCHOOL!5e0!3m2!1sen!2sin!4v1635595187330!5m2!1sen!2sin',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.2062541862324!2d77.55329661403454!3d12.894455090906535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3fe6d9b96d51%3A0x650acbdfbeb1f043!2sVedantha%20College!5e0!3m2!1sen!2sin!4v1635595849883!5m2!1sen!2sin',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.4942777478095!2d76.67923811402815!3d12.41675259122155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf771b52ccebd7%3A0x4ce0c7b1507fd22f!2sParivarthana%20School%20%26%20College!5e0!3m2!1sen!2sin!4v1635595569553!5m2!1sen!2sin'
])

const onSubmit = handleSubmit(async (values: any, actions: any) => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('phone', values.phone)
    formData.append('email', values.email)
    formData.append('course', values.course)
    formData.append('location', values.location)
    formData.append('request_type', values.request_type)
    formData.append('date', values.date)
    formData.append('time', values.time)
    if (values.request_type === 'Visit Our Center') {
      formData.append('branch', values.branch)
    }
    formData.append('detail', values.message)
    formData.append('page_url', config.public.mainURL + route.fullPath)
    const response = await useCustomFetch(API_ROUTES.contact, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      toast.success(content.message)
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
      location: err?.errors?.location?.length > 0 && err?.errors?.location[0],
      request_type:
        err?.errors?.request_type?.length > 0 && err?.errors?.request_type[0],
      date: err?.errors?.date?.length > 0 && err?.errors?.date[0],
      time: err?.errors?.time?.length > 0 && err?.errors?.time[0],
      branch: err?.errors?.branch?.length > 0 && err?.errors?.branch[0],
      message: err?.errors?.detail?.length > 0 && err?.errors?.detail[0]
    })
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <SeoHeader slug="contact-page" />

    <BreadCrumb
      title="Contact Us"
      :pages="[
        {
          link: '',
          name: 'Contact Us',
        },
      ]"
    />

    <div class="faq-area pt-70 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 order-2-sm">
            <div class="contact-info-area pb-70">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-12 col-12 col-sm-8">
                    <div class="contact-info-card">
                      <span class="svg-icon">
                        <Icon name="fa6-solid:map-pin" />
                      </span>
                      <h3>Our location</h3>
                      <p>
                        3rd Floor, No.02, CHBCS 1st Layout, 1st Floor, 5th Main,
                        Vijaya Nagar
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-6 col-6">
                    <div class="contact-info-card">
                      <span class="svg-icon">
                        <Icon name="fa6-solid:envelope" />
                      </span>
                      <h3>Email us</h3>
                      <p>
                        <a
                          aria-label="info@aaaedu.in"
                          href="mailto:info@aaaedu.in"
                        ><span>info@aaaedu.in</span></a>
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-6 col-6">
                    <div class="contact-info-card">
                      <span class="svg-icon">
                        <Icon name="fa6-solid:phone" />
                      </span>
                      <h3>Phone</h3>
                      <p>
                        <a
                          href="tel:+917676642258"
                          aria-label="+91 7676642258"
                        >+91 7676642258</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="contact-map-area pb-100">
              <div class="container">
                <div
                  v-for="(item, i) in maps"
                  :key="i"
                  class="contact-map mb-20"
                >
                  <div class="contact-info-card p-4 rounded">
                    <iframe
                      :src="item"
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 order-1-sm">
            <div class="contact-widget-area faq-contact">
              <div class="container">
                <div class="register-form">
                  <div class="top-header">
                    <h3>Get in Touch with us</h3>
                  </div>
                  <div class="contact-form">
                    <form
                      id="contactForm"
                      method="post"
                      @submit.prevent="onSubmit"
                    >
                      <div class="row">
                        <div class="col-12">
                          <h3 class="user-title">
                            Personal Information
                          </h3>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <CustomElInput name="name" placeholder="Name*" />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <CustomElInput name="email" placeholder="Email*" />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <CustomElInput name="phone" placeholder="Phone*" />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <CustomElSelect
                              name="course"
                              placeholder="Course*"
                              :options="
                                courseData
                                  ? courseData.course.map((item) => {
                                    return {
                                      value: item.name,
                                      label: item.name,
                                    };
                                  })
                                  : []
                              "
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <CustomElInput
                              name="location"
                              placeholder="Location*"
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <CustomElSelect
                              name="request_type"
                              placeholder="Select Your Request*"
                              :options="requestOptions"
                            />
                          </div>
                        </div>
                        <div class="col-12 mb-3">
                          <h3 class="user-title">
                            Please give us your comfortable date & time to
                            contact you
                          </h3>
                        </div>
                        <div
                          :class="`${requestType === 'Visit Our Center' ? 'col-lg-4' : 'col-lg-6'} col-md-6`"
                        >
                          <div class="form-group">
                            <CustomElDate
                              name="date"
                              placeholder="Pick A Date*"
                            />
                          </div>
                        </div>
                        <div
                          :class="`${requestType === 'Visit Our Center' ? 'col-lg-4' : 'col-lg-6'} col-md-6`"
                        >
                          <div class="form-group">
                            <CustomElTime
                              name="time"
                              placeholder="Pick A Time*"
                            />
                          </div>
                        </div>
                        <div
                          v-if="requestType === 'Visit Our Center'"
                          class="col-lg-4 col-md-6"
                        >
                          <div class="form-group">
                            <CustomElSelect
                              name="branch"
                              placeholder="Select Branch*"
                              :options="branchOptions"
                            />
                          </div>
                        </div>
                        <div class="col-12 mb-3">
                          <h3
                            v-if="requestType === 'Home Visit'"
                            class="user-title"
                          >
                            Please provide the address where you would like our
                            executive to meet you
                          </h3>
                          <h3
                            v-else-if="requestType === 'Connect Online'"
                            class="user-title"
                          >
                            Please provide us the details to connect online
                          </h3>
                          <h3 v-else class="user-title">
                            Please provide us the reason for contacting us
                          </h3>
                        </div>
                        <div class="col-lg-12 col-md-12">
                          <div class="form-group">
                            <CustomElInput
                              name="message"
                              type="textarea"
                              :placeholder="
                                requestType === 'Home Visit*'
                                  ? 'Address*'
                                  : 'Detail*'
                              "
                            />
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12">
                          <button
                            type="submit"
                            :disabled="loading"
                            class="default-btn"
                          >
                            <template v-if="!loading">
                              Submit
                            </template>
                            <div
                              v-else
                              class="spinner-border"
                              role="status"
                            />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
