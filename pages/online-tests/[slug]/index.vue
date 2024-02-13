<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { API_ROUTES } from '@/utils/api_routes'
import type { OnlineTestType } from '@/utils/types'

const config = useRuntimeConfig()

const toast = useToast()
const { status: authStatus, session } = useAuth()
const route = useRoute()
const router = useRouter()

const dialogVisible = ref(false)
const dialogEliminatedVisible = ref(false)
const enrollmentLoading = ref(false)

const { data, pending, error, refresh } = useSSRFetch<{
  test: OnlineTestType
}>(() => API_ROUTES.tests + `/${route.params.slug}${authStatus.value === 'authenticated' ? '/main-detail' : ''}`, {
  key: 'online_test_detail_' + route.params.slug,
  lazy: true
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.message
  })
}

useSeoMeta({
  title: () => data.value ? data.value.test.meta_title : 'Arjunaa Academy For Achievers',
  ogTitle: () => data.value ? data.value.test.meta_title : 'Arjunaa Academy For Achievers',
  twitterTitle: () => data.value ? data.value.test.meta_title : 'Arjunaa Academy For Achievers',
  description: () => data.value ? data.value.test.meta_description : 'Arjunaa Academy For Achievers',
  ogDescription: () => data.value ? data.value.test.meta_description : 'Arjunaa Academy For Achievers',
  twitterDescription: () => data.value ? data.value.test.meta_description : 'Arjunaa Academy For Achievers',
  keywords: () => data.value ? data.value.test.meta_keywords : 'Arjunaa Academy For Achievers',
  ogUrl: config.public.mainURL + (route.fullPath === '/' ? '' : route.fullPath),
  ogType: 'website',
  ogImage: () => data.value ? data.value.test.image : '/images/logos/new-logo.webp',
  twitterImage: () => data.value ? data.value.test.image : '/images/logos/new-logo.webp',
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
    { src: 'https://checkout.razorpay.com/v1/checkout.js', async: true },
    {
      type: 'application/ld+json',
      innerHTML: () => data.value ? data.value.test.meta_scripts : undefined
    }
  ]
})

const testApplyHandler = async () => {
  if (authStatus.value === 'unauthenticated') {
    toast.error('Please login to take the test.')
    router.push('/auth/sign-in')
    return
  }
  enrollmentLoading.value = true
  try {
    const response = await useCustomFetch(API_ROUTES.tests + `/${route.params.slug}/apply`)
    const content = await response.json()
    if (response.ok) {
      if (data.value && data.value.test.is_paid) {
        loadRazorpay(content.test_enrollment)
      } else {
        toast.success('Test Enrollment done successfully.')
        await refresh()
        dialogVisible.value = true
      }
    } else {
      throw content
    }
  } catch (err:any) {
    if (err?.message) { toast.error(err.message) }
    if (err?.error) { toast.error(err.error) }
  } finally {
    enrollmentLoading.value = false
  }
}

const loadRazorpay = (resp:any) => {
  const options = {
    key: config.public.RAZORPAY_KEY_ID,
    amount: resp.amount * 100,
    currency: 'INR',
    name: 'Arjunaa Academy For Achievers',
    description: data.value ? `Enrollment for ${data.value.test.name}` : 'Enrollment',
    image: '/images/logos/new-logo.webp',
    order_id: resp.razorpay_order_id,
    prefill: {
      name: session.value ? session.value.user.name : '',
      email: session.value ? session.value.user.email : '',
      contact: session.value ? session.value.user.phone : ''
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
    const response = await useCustomFetch(API_ROUTES.tests + `/${route.params.slug}/apply/payment-verification`, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      toast.success(content.message)
      await refresh()
      dialogVisible.value = true
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
</script>

<template>
  <div>
    <div class="inner-banner inner-banner-bg9">
      <div class="container">
        <div class="inner-title">
          <h1 v-html="data ? data.test.name : ''" />
          <ul>
            <li>
              <NuxtLink noPrefetch to="/">
                Home
              </NuxtLink>
            </li>
            <li>Online Tests</li>
            <li v-html="data ? data.test.name : ''" />
          </ul>
        </div>
      </div>
    </div>
    <div class="courses-details-area pt-70 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-lg-9">
            <template v-if="!pending && data">
              <div class="courses-details-contact">
                <div class="tab courses-details-tab">
                  <div class="tab_content current active">
                    <div class="tabs_item">
                      <div class="courses-details-tab-content">
                        <div v-if="data.test.is_test_enrolled && data.test.is_test_enrolled.is_enrolled && data.test.is_test_enrolled.test_status=='Completed'" class="mb-2">
                          <el-alert
                            title="You have completed your test. Please click on the View Test Report button to view your test report card."
                            type="success"
                            show-icon
                            :closable="false"
                          />
                        </div>
                        <div v-if="data.test.is_test_enrolled && data.test.is_test_enrolled.is_enrolled && data.test.is_test_enrolled.test_status=='Eliminated'" class="mb-2">
                          <el-alert
                            :title="`You have been barred from giving this exam because You ${data.test.is_test_enrolled.reason}`"
                            type="error"
                            show-icon
                            :closable="false"
                          />
                        </div>
                        <div class="courses-details-into" v-html="data.test.description" />
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
          <div class="col-lg-3">
            <template v-if="!pending && data">
              <div class="courses-details-sidebar">
                <div class="price-tag">
                  <h5 class="d-inline m-0">
                    <span v-if="data.test.is_paid ">&#8377;{{ data.test.amount }}</span><span v-else>Free</span>
                  </h5>
                </div>
                <img :src="data.test.image" :alt="data.test.image_alt" :title="data.test.image_title" class="w-100" do-not-lazy>
                <div class="content">
                  <span class="d-flex justify-content-center align-items-center">
                    <h5 class="d-inline m-0"><span>{{ data.test.name }}</span></h5>
                  </span>
                  <hr>
                  <div class="">
                    <div class="col-lg-12 col-md-12">
                      <div class="d-flex align-items-center">
                        <button v-if="!data.test.is_test_enrolled" type="button" :disabled="enrollmentLoading" class="default-btn" @click="testApplyHandler">
                          <template v-if="!enrollmentLoading">
                            Take Now
                          </template>
                          <div v-else class="spinner-border" role="status" />
                        </button>
                        <button v-else-if="data.test.is_test_enrolled && data.test.is_test_enrolled.is_enrolled && data.test.is_test_enrolled.test_status=='Pending'" type="button" :disabled="enrollmentLoading" class="default-btn" @click="dialogVisible = true">
                          Start Now
                        </button>
                        <button v-else-if="data.test.is_test_enrolled && data.test.is_test_enrolled.is_enrolled && data.test.is_test_enrolled.test_status=='Ongoing'" type="button" :disabled="enrollmentLoading" class="default-btn" @click="dialogVisible = true">
                          Resument Test
                        </button>
                        <button v-else-if="data.test.is_test_enrolled && data.test.is_test_enrolled.is_enrolled && data.test.is_test_enrolled.test_status=='Eliminated'" type="button" :disabled="enrollmentLoading" class="default-btn" @click="dialogEliminatedVisible = true">
                          Elimination Report
                        </button>
                        <NuxtLink v-else noPrefetch :to="`/online-tests/${data.test.slug}/report`" class="default-btn">
                          View Test Report
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
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

    <el-dialog v-if="data && data.test.is_test_enrolled && data.test.is_test_enrolled.is_enrolled" v-model="dialogVisible" :title="data.test.name" width="50%" top="20px">
      <div class="p-4 py-1">
        <div class="test-instruction">
          <h5 class="text-center mb-0">
            <code>Instructions:</code>
          </h5>
          <ol>
            <li>There are <b>set of questions</b></li>
            <li>Each questions hold <b>4 options</b>.</li>
            <li>You need to <b>select any one of the option</b> out of the four.</li>
            <li>Once you have selected your favourable option, <b>click on the submit button</b> to submit your answer.</li>
            <li>Once you submit your answer, <b>the next question will appear for you to answer</b>.</li>
            <li>You need to repeat the above steps, till you have reached the last question of your questionarie timeline.</li>
            <li>Each question holds a duration. You need to answer the question within the given time period. <b>If you fail to answer within the given time period, you will automatically move to the next question</b>.</li>
            <li>Once you proceed to the next question, <b>you cannot move backward to change your answer</b>. So select your answer carefully.</li>
            <li><b>The test will be conducted in full screen mode</b>. Trying to escape the full screen mode will lead to disqualification/elimination.</li>
            <li><b>Do not try to change your browser tab, or use your system for other purposes while attending the test</b>. Trying to do that will also lead you to disqualification/elimination.</li>
            <li>Once you are disqualified/eliminated, you can never re-attend the test.</li>
            <li>In case of bad network or system shut down while attending the test, No need to worry. <b>You can refresh the browser and resume the test from where it was last attended</b>.</li>
            <li>Once you complete answering all the question, you will recieve your report card.</li>
          </ol>
          <p>Once you are done reading the above instructions, Please click the button given below to proceed with your test.</p>
        </div>
        <div v-if="data.test.is_test_enrolled && (data.test.is_test_enrolled.test_status=='Pending' || data.test.is_test_enrolled.test_status=='Ongoing')" class="my-2 text-center">
          <NuxtLink noPrefetch class="default-btn" :to="`/online-tests/${data.test.slug}/ongoing`">
            <template v-if="data.test.is_test_enrolled.test_status=='Pending'">
              Start Now
            </template>
            <template v-else-if="data.test.is_test_enrolled.test_status=='Ongoing'">
              Resument Test
            </template>
            <template v-else>
              Take Now
            </template>
          </NuxtLink>
        </div>
      </div>
    </el-dialog>

    <el-dialog v-if="data && data.test.is_test_enrolled && data.test.is_test_enrolled.is_enrolled && data.test.is_test_enrolled.test_status=='Eliminated'" v-model="dialogEliminatedVisible" :title="data.test.name" width="30vw" top="20px">
      <div class="p-4 pt-1">
        <div class="test-instruction">
          <h5 class="text-center mb-0">
            <code>ELIMINATED:</code>
          </h5>
          <p class="text-center">
            {{ data.test.is_test_enrolled.reason }}
          </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.price-tag{
    position: relative;
}
.price-tag h5{
    position: absolute;
    top:0;
    right: 0;
    padding: 5px;
    background-color: var(--mainColor);
    color: var(--whiteColor);
}
.test-instruction{
    width: 100%;
    border: 1px dashed #222;
    padding: 10px;
}
</style>
