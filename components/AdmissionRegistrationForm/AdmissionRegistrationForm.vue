<script setup lang="ts">
import { object, string, number, mixed, ref as yupRef } from 'yup'
import { useToast } from 'vue-toastification'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { API_ROUTES } from '@/utils/api_routes'

const config = useRuntimeConfig()
const toast = useToast()

const emit = defineEmits(['update:applyTabValue'])

function changeApplyTab (newVal: string) {
  emit('update:applyTabValue', newVal)
}

const { handleSubmit, defineField, setFieldValue } = useForm({
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
      mode: string().required().default('OFFLINE'),
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
const [examCenter] = defineField('exam_center')

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
  // {
  //   value: 'ONLINE',
  //   label: 'ONLINE'
  // },
  {
    value: 'OFFLINE',
    label: 'OFFLINE'
  }
])
const examDateOptions = useState('examDateOptions', () => [
  {
    value: 'October 26, 2025',
    label: 'October 26, 2025 (10.30a.m - 1p.m)'
  },
  {
    value: 'November 1, 2025',
    label: 'November 1, 2025 (10.30a.m - 1p.m)'
  },
  {
    value: 'November 2, 2025',
    label: 'November 2, 2025 (10.30a.m - 1p.m)'
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
    value: 'NPS JP Nagar',
    label: 'NPS JP Nagar'
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

const examDateOptionsFiltered = computed(() => {
  if (examCenter.value === 'NPS JP Nagar') {
    return [{
      value: 'November 2, 2025',
      label: 'November 2, 2025 (10.30a.m - 1p.m)'
    }]
  }
  return examDateOptions.value
})

watch(() => examCenter.value, () => {
  if (examCenter.value === 'NPS JP Nagar') {
    setFieldValue('exam_date', 'November 2, 2025')
  }
})

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
      changeApplyTab('applied-tab')
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
    // formData.append('mode', values.mode)
    formData.append('mode', 'OFFLINE')
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
        changeApplyTab('applied-tab')
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
          <CustomElSelect name="program" placeholder="Select Your Program*" :options="programOptions" />
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="form-group">
          <CustomElSelect name="mode" placeholder="Select Your Exam Mode*" :options="modeOptions" />
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
          <CustomElSelect name="exam_center" placeholder="Select Exam Center*" :options="examCenterOptions" />
        </div>
      </div>
      <div v-if="examMode === 'OFFLINE'" class="col-lg-6 col-md-6">
        <div class="form-group">
          <CustomElSelect name="exam_date" placeholder="Select Exam Date*" :options="examDateOptionsFiltered" />
        </div>
      </div>
      <div class="col-12">
        <h3 class="user-title">
          Security's Information
        </h3>
        <code>Please make sure you remember the password so you can download the hallticket or appear for the exam online.</code>
        <br>
      </div>
      <div class="col-lg-6 col-md-6">
        <div class="form-group">
          <CustomElInput type="password" name="password" placeholder="Password*" />
        </div>
      </div>
      <div class="col-lg-6 col-md-6">
        <div class="form-group">
          <CustomElInput type="password" name="confirm_password" placeholder="Confirm Password*" />
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
</template>
