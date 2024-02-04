<script setup lang="ts">
import { object, string, number, boolean, mixed } from 'yup'
import { useToast } from 'vue-toastification'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { API_ROUTES } from '@/utils/api_routes'

const toast = useToast()

const { handleSubmit, defineField } = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string().required(),
      school_name: string().required(),
      aadhar: string()
        .required(),
      father_name: string().required(),
      father_occupation: string().required(),
      father_phone: number()
        .typeError('phone must be a number')
        .lessThan(9999999999, 'phone must be less than 10 digits')
        .moreThan(100000000, 'phone must be equal to 10 digits')
        .required(),
      mother_name: string().required(),
      mother_occupation: string().required(),
      mother_phone: number()
        .typeError('phone must be a number')
        .lessThan(9999999999, 'phone must be less than 10 digits')
        .moreThan(100000000, 'phone must be equal to 10 digits')
        .required(),
      center: string().required(),
      batch: string().required(),
      address: string().required(),
      marks: mixed()
        .required('Please select an image')
        .test('fileFormat', 'Please select a valid image', (value:any) => {
          if (value !== undefined) {
            return ['image/webp', 'image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(value.type)
          }
          return true
        }),
      sibling: boolean().required(),
      sibling_occupation: boolean(),
      no_of_sibling: number().typeError('percentage must be a number').when(['sibling_occupation'], {
        is: true,
        then: schema => schema.required(),
        otherwise: schema => schema
      }),
      sibling_school: string().when(['sibling_occupation'], {
        is: true,
        then: schema => schema.required(),
        otherwise: schema => schema
      }),
      sibling_class: string().when(['sibling_occupation'], {
        is: true,
        then: schema => schema.required(),
        otherwise: schema => schema
      })
    })
  ),
  initialValues: {
    name: '',
    school_name: '',
    aadhar: '',
    father_name: '',
    father_occupation: '',
    mother_name: '',
    mother_occupation: '',
    center: '',
    batch: '',
    address: '',
    marks: '',
    sibling: false,
    sibling_occupation: false,
    sibling_school: '',
    sibling_class: ''
  }
})

const [sibling] = defineField('sibling')
const [siblingOccupation] = defineField('sibling_occupation')

const loading = ref(false)
const batchOptions = useState('batchOptions', () => [
  {
    value: '2-Years Full-Time Super 30 Classroom Program(Day Scholar)',
    label: '2-Years Full-Time Super 30 Classroom Program(Day Scholar)'
  },
  {
    value: '2-Year Full-Time Super 30 Classroom Program (Residential)',
    label: '2-Year Full-Time Super 30 Classroom Program (Residential)'
  },
  {
    value: 'JEE Evening Batch',
    label: 'JEE Evening Batch'
  },
  {
    value: 'NEET Evening Batch',
    label: 'NEET Evening Batch'
  },
  {
    value: 'KVPY Weekend Batch',
    label: 'KVPY Weekend Batch'
  },
  {
    value: 'JEE+NEET+KVPY (7 Days a week)',
    label: 'JEE+NEET+KVPY (7 Days a week)'
  }
])
const centerOptions = useState('centerOptions', () => [
  {
    value: 'Hebbal (PU)',
    label: 'Hebbal (PU)'
  },
  {
    value: 'Vijaynagar (PU)',
    label: 'Vijaynagar (PU)'
  },
  {
    value: 'Kengeri (CBSE)',
    label: 'Kengeri (CBSE)'
  },
  {
    value: 'Uttarahalli Road (PU)',
    label: 'Uttarahalli Road (PU)'
  },
  {
    value: 'Kanakpura Road(Residential Campus)',
    label: 'Kanakpura Road(Residential Campus)'
  }
])

const onSubmit = handleSubmit(async (values: any, actions: any) => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('school_name', values.school_name)
    formData.append('aadhar', values.aadhar)
    formData.append('father_name', values.father_name)
    formData.append('father_occupation', values.father_occupation)
    formData.append('father_phone', values.father_phone)
    formData.append('mother_name', values.mother_name)
    formData.append('mother_occupation', values.mother_occupation)
    formData.append('mother_phone', values.mother_phone)
    formData.append('center', values.center)
    formData.append('batch', values.batch)
    formData.append('address', values.address)
    formData.append('sibling', values.sibling ? 'Yes' : 'No')
    if (values.sibling) {
      formData.append('sibling_occupation', values.sibling_occupation ? 'studying' : 'working')
      if (values.sibling_occupation) {
        formData.append('no_of_sibling', values.no_of_sibling)
        formData.append('sibling_school', values.sibling_school)
        formData.append('sibling_class', values.sibling_class)
      }
    }
    formData.append('marks', values.marks)
    const response = await useCustomFetch(API_ROUTES.admission_puc, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      toast.success('Admission Recieved Successfully.')
      actions.resetForm()
    } else {
      throw content
    }
  } catch (err: any) {
    toast.error(err?.message)
    actions.setErrors({
      school_name: err?.errors?.school_name?.length > 0 && err?.errors?.school_name[0],
      name: err?.errors?.name?.length > 0 && err?.errors?.name[0],
      aadhar: err?.errors?.aadhar?.length > 0 && err?.errors?.aadhar[0],
      father_name: err?.errors?.father_name?.length > 0 && err?.errors?.father_name[0],
      father_phone: err?.errors?.father_phone?.length > 0 && err?.errors?.father_name[0],
      father_occupation: err?.errors?.father_occupation?.length > 0 && err?.errors?.father_occupation[0],
      mother_name: err?.errors?.mother_name?.length > 0 && err?.errors?.mother_name[0],
      mother_phone: err?.errors?.mother_phone?.length > 0 && err?.errors?.mother_name[0],
      mother_occupation: err?.errors?.mother_occupation?.length > 0 && err?.errors?.mother_occupation[0],
      center: err?.errors?.center?.length > 0 && err?.errors?.center[0],
      batch: err?.errors?.batch?.length > 0 && err?.errors?.batch[0],
      marks: err?.errors?.marks?.length > 0 && err?.errors?.marks[0],
      address: err?.errors?.address?.length > 0 && err?.errors?.address[0],
      sibling: err?.errors?.sibling?.length > 0 && err?.errors?.sibling[0],
      sibling_occupation: err?.errors?.sibling_occupation?.length > 0 && err?.errors?.sibling_occupation[0],
      sibling_school: err?.errors?.sibling_school?.length > 0 && err?.errors?.sibling_school[0],
      sibling_class: err?.errors?.sibling_class?.length > 0 && err?.errors?.sibling_class[0],
      no_of_sibling: err?.errors?.no_of_sibling?.length > 0 && err?.errors?.no_of_sibling[0]
    })
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <SeoHeader slug="puc-page" />

    <BreadCrumb
      title="Admission for Class 11 or 1st PUC"
      :pages="[
        {
          link: '',
          name: 'Admission for Class 11 or 1st PUC',
        },
      ]"
    />

    <div class="faq-area pt-70 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-lg-5">
            <div class="faq-img">
              <NuxtImg placeholder="/images/placeholder.webp" src="/images/lesson.webp" alt="faq" class="lesson-img" />
              <div class="shape">
                <NuxtImg src="/images/faq-shape.png" height="90px" alt="Faq" />
              </div>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="contact-widget-area pb-70">
              <div class="container">
                <div class="register-form">
                  <div class="top-header">
                    <h3>
                      Admission for Class 11 or 1st PUC
                    </h3>
                  </div>
                  <div class="contact-form">
                    <form
                      id="contactForm"
                      method="post"
                      @submit.prevent="onSubmit"
                    >
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
                            <CustomElInput name="aadhar" placeholder="Aadhar Card Detail*" />
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
                            <CustomElInput name="father_occupation" placeholder="Father's Occupation*" />
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
                            <CustomElInput name="mother_occupation" placeholder="Mother's Occupation*" />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <CustomElSelect
                              name="center"
                              placeholder="Select Your Center*"
                              :options="centerOptions"
                            />
                          </div>
                        </div>
                        <div :class="`col-lg-6 col-md-6`">
                          <div class="form-group">
                            <CustomElSelect
                              name="batch"
                              placeholder="Select Your Batch*"
                              :options="batchOptions"
                            />
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12">
                          <div class="form-group">
                            <label class="form-label">Choose Marksheet* <br> <code>(Only PDF | JPG | PNG files are allowed. Max-size 512kb)</code></label>
                            <VeeField
                              id="marks"
                              type="file"
                              name="marks"
                              class="form-control"
                            />
                            <VeeErrorMessage
                              name="marks"
                              as="div"
                              class="is-invalid"
                            />
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12">
                          <div class="form-group">
                            <CustomElInput
                              name="address"
                              type="textarea"
                              placeholder="Permanenet Address*"
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-12">
                          <div class="form-group">
                            <label>Do you have sibling?</label><br>
                            <CustomElSwitch
                              name="sibling"
                              active_text="Yes"
                              inactive_text="No"
                            />
                          </div>
                        </div>
                        <template v-if="sibling">
                          <div class="col-lg-6 col-md-12">
                            <div class="form-group">
                              <label>What are they doing?</label><br>
                              <CustomElSwitch
                                name="sibling_occupation"
                                active_text="Studying"
                                inactive_text="Working"
                              />
                            </div>
                          </div>
                          <template v-if="siblingOccupation">
                            <div class="col-lg-4 col-md-6">
                              <div class="form-group">
                                <CustomElInput name="no_of_sibling" placeholder="Number of Siblings*" />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-group">
                                <CustomElInput name="sibling_class" placeholder="If Studying, which grade are they studying in?*" />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-group">
                                <CustomElInput name="sibling_school" placeholder="Your Siblings School Name*" />
                              </div>
                            </div>
                          </template>
                        </template>
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
