<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useFullscreen } from '@vueuse/core'
import { API_ROUTES } from '@/utils/api_routes'
import type { OnlineTestType, OnlineTestQuestionSetType } from '@/utils/types'

definePageMeta({
  middleware: 'auth'
})

const config = useRuntimeConfig()
const toast = useToast()
const router = useRouter()

const route = useRoute()
const el = ref<HTMLElement | null>(null)
const { isFullscreen, enter, exit } = useFullscreen(el)

const fullScreenWarnCounter = ref(0)
const tabChangedWarnCounter = ref(0)
const duration = ref(10)
const scheduledOn = ref(60000)
const attemptedAnswer = ref(undefined)
const timerTrigger = ref(false)
const errorMessage = ref<string|null>(null)
const answerSubmitLoading = ref(false)
const dialogVisible = ref(false)
const dialogMessage = ref('')

onMounted(() => {
  if (process.client) {
    window.addEventListener('blur', tabChangedHandler)
    makeFullScreen()
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('blur', tabChangedHandler)
  }
})

const { data, pending, error, refresh } = await useSSRFetch<{
  test: OnlineTestType;
  question_set: OnlineTestQuestionSetType;
  current_question_count: number;
  total_question_count: number;
}>(() => API_ROUTES.tests + `/${route.params.slug}/question-set`, {
  key: 'online_test_question_set_' + route.params.slug,
  lazy: true
})

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
    {
      type: 'application/ld+json',
      innerHTML: () => data.value ? data.value.test.meta_scripts : undefined
    }
  ]
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.message
  })
}

watch(() => data.value, async (value) => {
  if (value) {
    if (value.question_set.test_status === 'Pending' || value.question_set.test_status === 'Ongoing') {
      scheduledOn.value = value ? value.question_set.current_quiz.duration * 60000 : 0
      duration.value = value ? value.question_set.current_quiz.duration : 0
      timerTrigger.value = true
    }
    if (value.question_set.test_status === 'Completed') {
      await exit()
      router.push(`/online-tests/${route.params.slug}/report`)
      toast.success('Test completed succesfully.')
    }
    if (value.question_set.test_status === 'Eliminated') {
      await exit()
      toast.error(value.question_set.reason ? value.question_set.reason : '')
      router.push(`/online-tests/${route.params.slug}`)
    }
  }
})

watch(() => isFullscreen.value, (value) => {
  if (value === false) {
    makeFullScreen()
  }
})

const closeWarningModal = async () => {
  dialogVisible.value = false
  await enter()
  dialogMessage.value = ''
}

const makeFullScreen = async () => {
  if (fullScreenWarnCounter.value <= 1) {
    dialogVisible.value = true
    dialogMessage.value = 'This exam needs to be conducted on fullscreen mode. Please dnt try to exit the fullscreen mode until your exam is over. It wil exit the fullscreen mode once your exam is over. If you exit the fullscreen mode by yourself then you will be barred from giving this exam.'
  } else if (fullScreenWarnCounter.value === 2) {
    await eliminatedHandler('Tried to escape full screen mode while attending the exam!')
  }
  fullScreenWarnCounter.value++
}

const tabChangedHandler = () => tabChangedWarning()

const tabChangedWarning = async () => {
  if (!dialogVisible.value) {
    if (tabChangedWarnCounter.value <= 1) {
      dialogVisible.value = true
      dialogMessage.value = 'This is a warning because you tried escape the exam screen. If you do it again, then you will be barred from giving this exam!'
    } else if (tabChangedWarnCounter.value === 2) {
      await eliminatedHandler('Tried to escape focus on the exam screen by viewing another screen else than exam screen tab while attending the exam!')
    }
    tabChangedWarnCounter.value++
  }
}

const fillAnswerHandler = async () => {
  if (!attemptedAnswer.value) {
    errorMessage.value = 'Please select an answer'
    return
  }
  errorMessage.value = null
  answerSubmitLoading.value = true
  try {
    const formData = new FormData()
    formData.append('attempted_answer', attemptedAnswer.value)
    const response = await useCustomFetch(API_ROUTES.tests + `/${route.params.slug}/fill-answer`, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      attemptedAnswer.value = undefined
      await refresh()
    } else {
      throw content
    }
  } catch (err:any) {
    errorMessage.value = err.message
  } finally {
    answerSubmitLoading.value = false
  }
}

const eliminatedHandler = async (reason: string) => {
  answerSubmitLoading.value = true
  errorMessage.value = reason
  try {
    const formData = new FormData()
    formData.append('reason', reason)
    const response = await useCustomFetch(API_ROUTES.tests + `/${route.params.slug}/eliminated`, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      attemptedAnswer.value = undefined
      await exit()
      toast.error(reason)
      router.push(`/online-tests/${route.params.slug}`)
    } else {
      throw content
    }
  } catch (err:any) {
    if (err?.message) { toast.error(err.message) }
    if (err?.error) { toast.error(err.error) }
  } finally {
    answerSubmitLoading.value = false
    errorMessage.value = null
  }
}

const timeElapsedHandler = async () => {
  timerTrigger.value = false
  answerSubmitLoading.value = true
  errorMessage.value = 'Time for answering the question exceeded!'
  try {
    const formData = new FormData()
    formData.append('attempt_status', 'Failed To Answer')
    formData.append('reason', 'Time for answering the question exceeded!')
    const response = await useCustomFetch(API_ROUTES.tests + `/${route.params.slug}/fill-answer`, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      attemptedAnswer.value = undefined
      await refresh()
    } else {
      throw content
    }
  } catch (err) {
    // console.log(err.response);// eslint-disable-line
    // this.errorMessage = err?.response?.data?.message
  } finally {
    answerSubmitLoading.value = false
    errorMessage.value = null
  }
}
</script>

<template>
  <div>
    <div ref="el">
      <template v-if="!pending && data">
        <div :class="`bg-light ${isFullscreen ? 'h-100 test-full-screen' : ''}`">
          <div class="inner-banner inner-banner-bg">
            <div class="container">
              <div class="inner-title text-center test-inner-title">
                <h3>{{ data.test.name }}</h3>
              </div>
            </div>
          </div>

          <div class="blog-details-area py-3">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="text-center">
                    <h5>
                      <code>Timeline</code>
                    </h5>
                  </div>
                  <div class="question_set_div">
                    <div class="question_set_marker d-flex flex-wrap align-items-center" style="justify-content:center">
                      <div v-for="i in data.total_question_count" :key="i" :class="`${(i)===data.current_question_count ? 'question_set_box_current' : ((i) < data.current_question_count ? 'question_set_box_completed' : 'question_set_box_pending')} question_set_box`">
                        {{ i }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr>
            <div class="container">
              <div class="row align-items-center">
                <div class="col-lg-9 order-2-sm">
                  <div v-if="errorMessage" class="mb-1">
                    <el-alert
                      :title="errorMessage"
                      type="error"
                      show-icon
                    />
                  </div>
                  <div class="question-block">
                    <div class="question-block-counter p-2">
                      <div class="d-flex align-items-center justify-content-between ">
                        <div class="col-auto text-center">
                          <p class="head-text text-light">
                            Subject
                          </p>
                          <h6 class="head-counter text-light">
                            {{ data.question_set.current_quiz.subject.name }}
                          </h6>
                        </div>
                        <div class="col-auto text-center">
                          <p class="head-text text-light">
                            Difficulty
                          </p>
                          <h6 class="head-counter text-light">
                            {{ data.question_set.current_quiz.difficulty }}
                          </h6>
                        </div>
                        <div class="col-auto text-center">
                          <p class="head-text text-light">
                            Marks
                          </p>
                          <h6 class="head-counter text-light">
                            {{ data.question_set.current_quiz.mark }}
                          </h6>
                        </div>
                        <div class="col-auto text-center">
                          <p class="head-text text-light">
                            Duration
                          </p>
                          <h6 class="head-counter text-light">
                            {{ data.question_set.current_quiz.duration }} mins
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div class="question-section p-2">
                      <h4>
                        Question <code>({{ data.current_question_count }}/{{ data.total_question_count }})</code>
                      </h4>
                      <div v-html="data.question_set.current_question.question" />
                    </div>
                    <div class="answer-section">
                      <div class="d-flex align-items-center flex-wrap">
                        <div class="col-lg-6 col-md-6 col-sm-12 answer-holder p-2">
                          <el-radio v-model="attemptedAnswer" label="Answer1">
                            <div class="px-3" v-html="data.question_set.current_question.answer_1" />
                          </el-radio>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12 answer-holder p-2">
                          <el-radio v-model="attemptedAnswer" label="Answer2">
                            <div class="px-3" v-html="data.question_set.current_question.answer_2" />
                          </el-radio>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12 answer-holder p-2">
                          <el-radio v-model="attemptedAnswer" label="Answer3">
                            <div class="px-3" v-html="data.question_set.current_question.answer_3" />
                          </el-radio>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12 answer-holder p-2">
                          <el-radio v-model="attemptedAnswer" label="Answer4">
                            <div class="px-3" v-html="data.question_set.current_question.answer_4" />
                          </el-radio>
                        </div>
                      </div>
                    </div>
                    <div class="py-1 px-2 text-center">
                      <el-button type="success" plain :loading="answerSubmitLoading" :disabled="answerSubmitLoading" @click="fillAnswerHandler">
                        Submit
                      </el-button>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 order-1-sm">
                  <div class="timer-div">
                    <ClientOnly>
                      <vue-countdown v-if="timerTrigger" v-slot="{ minutes, seconds }" :auto-start="timerTrigger" :time="scheduledOn" @end="timeElapsedHandler">
                        <div style="position: relative;">
                          <div class="timer" :style="`--duration: ${duration * 60}; --size: 250;`">
                            <div class="mask" />
                          </div>
                          <h5 class="countdown">
                            {{ `${minutes} mins ${seconds} secs` }}
                          </h5>
                        </div>
                      </vue-countdown>
                      <div v-else>
                        <div style="position: relative; width: 250px; margin: auto;">
                          <div class="timer-full" :style="`--duration: 0;--size: 250;`">
                            <div class="mask" />
                          </div>
                          <h4 class="countdown">
                            <span class="badge badge-danger-light">Times Up!!</span>
                          </h4>
                        </div>
                      </div>
                    </ClientOnly>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-dialog
          v-if="data && (data.question_set.test_status==='Pending' || data.question_set.test_status==='Ongoing')"
          v-model="dialogVisible"
          title="WARNING"
          width="30%"
          :center="true"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="false"
        >
          <div class="p-1 px-1">
            <p>{{ dialogMessage }}</p>
            <div class="text-center mt-1">
              <el-button type="primary" @click="closeWarningModal">
                Resume Test
              </el-button>
            </div>
          </div>
        </el-dialog>
      </template>
      <div v-else :class="`bg-light h-100`">
        <div class="inner-banner inner-banner-bg">
          <div class="container">
            <div class="inner-title text-center test-inner-title">
              <h3>Online Test - Loading</h3>
            </div>
          </div>
        </div>
        <div class="container py-3">
          <el-skeleton style="width: 100%" animated>
            <template #template>
              <div class="row">
                <div class="col-12 mb-1">
                  <el-skeleton-item variant="rect" style="width: 100%; height: 40px;" />
                </div>
                <div class="col-lg-9">
                  <el-skeleton-item variant="rect" style="width: 100%; height: 340px;" />
                </div>
                <div class="col-lg-3 text-center">
                  <el-skeleton-item variant="circle" style="width: 70%; height: 70%;" />
                </div>
              </div>
            </template>
          </el-skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test-inner-title{
    padding-top: 50px;
    padding-bottom: 10px;
}
/* timer starts */
.countdown{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
}

.countdown .badge-danger-light{
  color: red;
}

.timer {
    background: -webkit-linear-gradient(left, #eee 50%, #354620 50%);
    border-radius: 100%;
    margin:auto;
    height: calc(var(--size) * 1px);
    width: calc(var(--size) * 1px);
    position: relative;
    -webkit-animation: time calc(var(--duration) * 1s) steps(1000, start) infinite;
    -webkit-mask: radial-gradient(transparent 50%,#000 50%);
    mask: radial-gradient(transparent 50%,#000 50%);
}
.timer-full {
    font-size: 3.2rem;
    display: inline-block;
    vertical-align: top;
    font-weight: 600;
    background: -webkit-linear-gradient(left, #eee 100%, #354620 50%);
    border-radius: 100%;
    height: calc(var(--size) * 1px);
    width: calc(var(--size) * 1px);
    position: relative;
    -webkit-animation: time calc(var(--duration) * 1s) steps(1000, start) infinite;
    -webkit-mask: radial-gradient(transparent 50%,#000 50%);
    mask: radial-gradient(transparent 50%,#000 50%);
}
.mask {
    border-radius: 100% 0 0 100% / 50% 0 0 50%;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 50%;
    -webkit-animation: mask calc(var(--duration) * 1s) steps(500, start) infinite;
    -webkit-transform-origin: 100% 50%;
}
@keyframes time {
    100% {
        -webkit-transform: rotate(360deg);
    }
}
@keyframes mask {
    0% {
        background: #354620;
        -webkit-transform: rotate(0deg);
    }
    50% {
        background: #354620;
        -webkit-transform: rotate(-180deg);
    }
    50.01% {
        background: #eee;
        -webkit-transform: rotate(0deg);
    }
    100% {
        background: #eee;
        -webkit-transform: rotate(-180deg);
    }
}
/* timer ends */

/* question set starts */
.question_set_div{
  /* border:1px solid #888888; */
  width:100%;
  margin-bottom:10px;
}
.question_set_marker{
  /* border:1px solid #888888; */
  width:100%;
}
.question_set_box{
  width:40px;
  height:40px;
  border:1px dashed #b8b8b8;
  display:grid;
  place-content:center;
}
.question_set_box_pending{
  background-color: #ee8f8f;
}
.question_set_box_completed{
  background-color: #a3e1a3;
}
.question_set_box_current{
  background-color: #9292f3;
}
/* question sets ends */
.question-block{
    border: 1px solid #ebebeb;
    border-radius: 3px;
    width: 100%;
}
/* .question-section{
    border-bottom: 1px solid #ebebeb;
} */
.question-block-counter{
    background-color: #EACF6C;
}
.answer-holder{
    border: 1px dashed #ebebeb;
}
.answer-holder:nth-child(odd){
    border-left:none;
}
.answer-holder:nth-child(even){
    border-left:none;
    border-right:none;
}
/* .answer-holder:nth-child(3n){
    border-bottom:none;
}
.answer-holder:nth-child(3n+1){
    border-bottom:none;
} */
.answer-holder:nth-child(4n){
    border-top:none;
}
.head-counter{
    color: #303133;
    font-size: 20px;
    margin:0;
}
.head-text{
    color: #606266;
    font-size: 14px;
    margin-bottom: 4px;
}
.answer-holder .el-radio{
  height: auto !important;
}

.test-full-screen{
  max-height: 100%;
  overflow: hidden;
  overflow-y: auto;
}

@media only screen and (max-width:767px){
    .order-1-sm{
        order:1;
        margin-bottom: 10px;
    }
    .order-2-sm{
        order:2;
    }
    .answer-holder{
        width: 100%;
    }
}
</style>
