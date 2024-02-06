<script setup lang="ts">
import { object, string, number, mixed } from 'yup'
import { useToast } from 'vue-toastification'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { API_ROUTES } from '@/utils/api_routes'

const toast = useToast()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string().required(),
      school_name: string().required(),
      phone: number()
        .typeError('phone must be a number')
        .lessThan(9999999999, 'phone must be less than 10 digits')
        .moreThan(100000000, 'phone must be equal to 10 digits')
        .required(),
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
      standard: string().required(),
      syllabus: string().required(),
      card: mixed()
        .required('Please select an image')
        .test('fileFormat', 'Please select a valid image', (value:any) => {
          if (value !== undefined) {
            return ['image/webp', 'image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(value.type)
          }
          return true
        })
    })
  )
})

const loading = ref(false)
const standardOptions = useState('standardOptions', () => [
  {
    value: '8th',
    label: '8th'
  },
  {
    value: '9th',
    label: '9th'
  },
  {
    value: '10th',
    label: '10th'
  }
])
const syllabusOptions = useState('syllabusOptions', () => [
  {
    value: 'ICSE',
    label: 'ICSE'
  },
  {
    value: 'CBSE',
    label: 'CBSE'
  },
  {
    value: 'State',
    label: 'State'
  }
])

const onSubmit = handleSubmit(async (values: any, actions: any) => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('school_name', values.school_name)
    formData.append('phone', values.phone)
    formData.append('father_name', values.father_name)
    formData.append('father_email', values.father_email)
    formData.append('father_phone', values.father_phone)
    formData.append('mother_name', values.mother_name)
    formData.append('mother_email', values.mother_email)
    formData.append('mother_phone', values.mother_phone)
    formData.append('class', values.standard)
    formData.append('syllabus', values.syllabus)
    formData.append('address', values.address)
    formData.append('card', values.card)
    const response = await useCustomFetch(API_ROUTES.vrddhi, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      toast.success('Vrddhi Syllabus Recieved Successfully.')
      actions.resetForm()
      window.open(content.file_link, '_blank')
    } else {
      throw content
    }
  } catch (err: any) {
    toast.error(err?.message)
    actions.setErrors({
      school_name: err?.errors?.school_name?.length > 0 && err?.errors?.school_name[0],
      name: err?.errors?.name?.length > 0 && err?.errors?.name[0],
      phone: err?.errors?.phone?.length > 0 && err?.errors?.phone[0],
      father_name: err?.errors?.father_name?.length > 0 && err?.errors?.father_name[0],
      father_phone: err?.errors?.father_phone?.length > 0 && err?.errors?.father_name[0],
      father_email: err?.errors?.father_email?.length > 0 && err?.errors?.father_email[0],
      mother_name: err?.errors?.mother_name?.length > 0 && err?.errors?.mother_name[0],
      mother_phone: err?.errors?.mother_phone?.length > 0 && err?.errors?.mother_name[0],
      mother_email: err?.errors?.mother_email?.length > 0 && err?.errors?.mother_email[0],
      standard: err?.errors?.class?.length > 0 && err?.errors?.class[0],
      syllabus: err?.errors?.syllabus?.length > 0 && err?.errors?.syllabus[0],
      card: err?.errors?.card?.length > 0 && err?.errors?.card[0]
    })
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <SeoHeader slug="vrddhi-syllabus-page" />

    <BreadCrumb
      title="Syllabus"
      :pages="[
        {
          link:'/vrddhi',
          name:'Vrddhi'
        },
        {
          link:'',
          name:'Syllabus'
        }
      ]"
    />

    <div class="faq-area pt-70 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-lg-5">
            <div class="faq-img">
              <NuxtImg loading="lazy" placeholder="/images/placeholder.webp" src="/images/lesson.webp" alt="faq" class="lesson-img" />
              <div class="shape">
                <NuxtImg loading="lazy" src="/images/faq-shape.png" height="90px" alt="Faq" />
              </div>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="contact-widget-area pb-70">
              <div class="container">
                <div class="register-form">
                  <div class="top-header">
                    <h3>
                      Vrddhi Syllabus
                    </h3>
                  </div>
                  <div class="contact-form">
                    <form id="contactForm" @submit.prevent="onSubmit">
                      <div class="row">
                        <div class="col-lg-4 col-md-6">
                          <div class="form-group">
                            <CustomElInput name="name" placeholder="Name*" />
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div class="form-group">
                            <CustomElInput name="school_name" placeholder="School's Name*" />
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div class="form-group">
                            <CustomElInput name="phone" placeholder="Whatsapp Number*" />
                          </div>
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
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <CustomElSelect
                              name="standard"
                              placeholder="Select Your Class*"
                              :options="standardOptions"
                            />
                          </div>
                        </div>
                        <div :class="`col-lg-6 col-md-6`">
                          <div class="form-group">
                            <CustomElSelect
                              name="syllabus"
                              placeholder="Select Your Syllabus*"
                              :options="syllabusOptions"
                            />
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12">
                          <div class="form-group">
                            <label class="form-label">Student's ID Cards* <br> <code>(Only PDF | JPG | PNG files are allowed. Max-size 512kb)</code></label>
                            <VeeField
                              id="card"
                              type="file"
                              name="card"
                              class="form-control"
                            />
                            <VeeErrorMessage
                              name="card"
                              as="div"
                              class="is-invalid"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
