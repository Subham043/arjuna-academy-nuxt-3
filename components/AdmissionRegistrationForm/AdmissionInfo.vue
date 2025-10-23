<script setup lang="ts">
import { useToast } from 'vue-toastification'
import type { AdmissionRegistrationInfoType } from '@/utils/types'
import { API_ROUTES } from '@/utils/api_routes'

const props = defineProps({
  apply_tab_value: {
    type: String,
    default: ''
  }
})

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const { status, session, signOut } = useAuth()
const logout = async () => await signOut({
  callbackUrl: config.public.mainURL + (route.fullPath === '/' ? '' : route.fullPath),
  redirect: true
})
const toast = useToast()

const data = ref<{
  admission_completed: boolean,
  online_path?: string,
  enrollmentForm: AdmissionRegistrationInfoType
} | null>(null)
const pending = ref<boolean>(false)
const downloadLoading = ref(false)
const repaymentLoading = ref(false)

const fetchData = async () => {
  if (props.apply_tab_value !== 'applied-tab' || session === null) { return }
  pending.value = true
  try {
    const { data: result } = await useSSRFetch<{
      admission_completed: boolean,
      online_path?: string,
      enrollmentForm: AdmissionRegistrationInfoType
    }>(() => API_ROUTES.admission_registration_info, {
      key: `admission_registration_info_${props.apply_tab_value}_${session.value?.user?.id}`,
      lazy: false
    })
    data.value = result.value
  } catch (error) {
    data.value = null
  } finally {
    pending.value = false
  }
}

onMounted(fetchData)

watch(() => props.apply_tab_value, fetchData)

const downloadHandler = async () => {
  downloadLoading.value = true
  try {
    const response = await useCustomFetch(API_ROUTES.admission_registration_download, {
      method: 'GET'
    })
    const content = await response.json()
    if (response.ok) {
      window.open(config.public.apiURL + '/v1/test-report-download/' + content.file_key, '_blank')
    } else {
      throw content
    }
  } catch (err: any) {
    toast.error('Something went wrong! Please try again later.')
  } finally {
    downloadLoading.value = false
  }
}

const repaymentHandler = async () => {
  repaymentLoading.value = true
  try {
    const response = await useCustomFetch(API_ROUTES.admission_registration_repay, {
      method: 'GET'
    })
    const content = await response.json()
    if (response.ok) {
      loadRazorpay(content.data)
    } else {
      throw content
    }
  } catch (err: any) {
    toast.error('Something went wrong! Please try again later.')
  } finally {
    repaymentLoading.value = false
  }
}

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
      await fetchData()
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

const isTestAllowed = computed(() => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  if (year > 2025) { return false }
  if (month === 10 && day < 26) { return false }
  if (month === 11 && day > 2) { return false }
  if (month < 10) { return false }
  if (month > 11) { return false }
  return true
})

</script>

<template>
  <div>
    <div v-if="pending" class="text-center">
      <div class="spinner-border" role="status" />
    </div>
    <div v-else>
      <div v-if="data!==null">
        <table class="table table-striped table-bordered table-sm">
          <tbody>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                Registration ID
              </th>
              <td>AAAEDU#{{ data.enrollmentForm.id }}</td>
            </tr>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                Name
              </th>
              <td>{{ data.enrollmentForm.name }}</td>
            </tr>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                Email
              </th>
              <td>{{ data.enrollmentForm.email }}</td>
            </tr>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                School Name
              </th>
              <td>{{ data.enrollmentForm.school_name }}</td>
            </tr>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                Father's Name
              </th>
              <td>{{ data.enrollmentForm.father_name }}</td>
            </tr>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                Father's Email
              </th>
              <td>{{ data.enrollmentForm.father_email }}</td>
            </tr>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                Father's Phone
              </th>
              <td>{{ data.enrollmentForm.father_phone }}</td>
            </tr>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                Mother's Name
              </th>
              <td>{{ data.enrollmentForm.mother_name }}</td>
            </tr>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                Mother's Email
              </th>
              <td>{{ data.enrollmentForm.mother_email }}</td>
            </tr>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                Mother's Phone
              </th>
              <td>{{ data.enrollmentForm.mother_phone }}</td>
            </tr>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                Address
              </th>
              <td>{{ data.enrollmentForm.address }}</td>
            </tr>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                Class
              </th>
              <td>{{ data.enrollmentForm.class }}</td>
            </tr>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                Program
              </th>
              <td>{{ data.enrollmentForm.program }}</td>
            </tr>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                Mode
              </th>
              <td>{{ data.enrollmentForm.mode }}</td>
            </tr>
            <tr v-if="data.enrollmentForm.mode==='OFFLINE'">
              <th style="background-color: #f1f1f1; width: 200px">
                Exam Date
              </th>
              <td>{{ data.enrollmentForm.exam_date }}</td>
            </tr>
            <tr v-if="data.enrollmentForm.mode === 'OFFLINE'">
              <th style="background-color: #f1f1f1; width: 200px">
                Exam Center
              </th>
              <td>{{ data.enrollmentForm.exam_center }}</td>
            </tr>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                Amount Paid
              </th>
              <td>Rs. {{ data.enrollmentForm.amount }}</td>
            </tr>
            <tr>
              <th style="background-color: #f1f1f1; width: 200px">
                Payment Status
              </th>
              <td>{{ data.enrollmentForm.payment_status }}</td>
            </tr>
          </tbody>
        </table>
        <template v-if="data !== null">
          <el-button
            v-if="status === 'authenticated' && data.enrollmentForm.mode === 'OFFLINE' && data.enrollmentForm.payment_status === 'PAID'"
            type="success"
            :disabled="downloadLoading"
            :loading="downloadLoading"
            plain
            @click="downloadHandler"
          >
            Download Hall Ticket
          </el-button>
          <el-button
            v-if="status === 'authenticated' && data.enrollmentForm.mode === 'ONLINE' && data.enrollmentForm.payment_status === 'PAID'"
            type="success"
            :disabled="!isTestAllowed"
            plain
            @click="isTestAllowed ? router.push(`/admission/online-tests/${data.online_path}`) : undefined"
          >
            Attend Test
          </el-button>
          <el-button
            v-if="status === 'authenticated' && data.enrollmentForm.payment_status === 'PENDING'"
            type="warning"
            :disabled="repaymentLoading"
            :loading="repaymentLoading"
            plain
            @click="repaymentHandler"
          >
            Make Payment
          </el-button>
        </template>
        <el-button v-if="status==='authenticated'" type="danger" plain @click="logout">
          Logout
        </el-button>
      </div>
    </div>
  </div>
</template>
