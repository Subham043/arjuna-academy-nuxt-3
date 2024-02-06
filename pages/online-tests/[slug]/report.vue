<script setup lang="ts">
import { API_ROUTES } from '@/utils/api_routes'
import type { OnlineTestType } from '@/utils/types'

definePageMeta({
  middleware: 'auth'
})

const config = useRuntimeConfig()
const route = useRoute()
const pdfSection = ref<HTMLElement | null>(null)

const { data, pending, error } = useSSRFetch<{
  test: OnlineTestType;
  total_answer_count: number;
  total_question_count: number;
  total_score: number;
  alloted_score: number;
  subject_wise_score: {
    attempt_count: number;
    not_attempt_count: number;
    number_of_question: number;
    total_mark_alloted_sum: number;
    total_mark_sum: number;
    name: string;
  }[]
}>(() => API_ROUTES.tests + `/${route.params.slug}/report`, {
  key: 'online_test_report_' + route.params.slug,
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
    {
      type: 'application/ld+json',
      innerHTML: () => data.value ? data.value.test.meta_scripts : undefined
    }
  ]
})

const subjectReportSorted = computed(() => {
  if (data.value) {
    const subjectReport = [...data.value.subject_wise_score]
    const sortedSubjectReport = subjectReport.sort((a, b) => { return b.total_mark_alloted_sum - a.total_mark_alloted_sum })
    const graph = []
    for (let index = 0; index < sortedSubjectReport.length; index++) {
      graph.push([sortedSubjectReport[index].name, ((sortedSubjectReport[index].total_mark_alloted_sum / sortedSubjectReport[index].total_mark_sum) * 100).toFixed(2)])
    }
    return graph
  }
  return []
})

const totalReport = computed(() => {
  if (data.value) {
    const graph = []
    graph.push(['Total', ((data.value.total_score / data.value.total_score) * 100).toFixed(2)])
    graph.push(['Alloted', ((data.value.alloted_score / data.value.total_score) * 100).toFixed(2)])
    return graph
  }
  return []
})

const grade = computed(() => {
  if (data.value) {
    const percentage = ((data.value.alloted_score / data.value.total_score) * 100)
    if (percentage >= 90 && percentage <= 100) {
      return 'A'
    } else if (percentage >= 75 && percentage <= 89) {
      return 'B'
    } else if (percentage >= 60 && percentage <= 74) {
      return 'C'
    } else if (percentage >= 45 && percentage <= 59) {
      return 'D'
    } else if (percentage >= 35 && percentage <= 44) {
      return 'E'
    } else if (percentage >= 0 && percentage <= 34) {
      return 'F'
    }
  }
  return 'F'
})

// const DOCUMENT_OPTIONS:jsPDFOptions = {
//   orientation: 'l',
//   format: 'a4',
//   putOnlyUsedFonts: false,
//   unit: 'px',
//   compress: true,
//   userUnit: 0.1
// } // See all options: http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html
// See all options: http://raw.githack.com/MrRio/jsPDF/master/docs/module-html.html#~html

</script>

<template>
  <div>
    <div class="inner-banner inner-banner-bg">
      <div class="container">
        <div class="inner-title text-center test-inner-title">
          <h3>{{ data ? data.test.name: '' }}</h3>
        </div>
      </div>
    </div>
    <ClientOnly>
      <div class="container">
        <div v-if="pending" class="text-center py-4">
          <div class="spinner-border m-0 p-0" role="status" />
        </div>
        <template v-else-if="!pending && data">
          <div class="py-2" style="text-align:right;">
            <!-- <el-button type="success" plain @click="exportToPDF('report.pdf', pdfSection as HTMLElement, DOCUMENT_OPTIONS, { windowWidth: 1260, margin: 0, autoPaging: true, image:{ type: 'png', quality: 80 }, html2canvas: {scale: 0.5, backgroundColor: '#ffffff', windowWidth: 1260, removeContainer: true, windowHeight: 1400}})">
              Download Report
            </el-button> -->
          </div>
          <!-- <div ref="pdfSection" class="main-report-wrapper" style="max-width: 1260px; margin: auto;"> -->
          <div ref="pdfSection" class="main-report-wrapper">
            <div class="inner-report-wrapper">
              <div class="report-logo-container">
                <NuxtImg loading="lazy" src="/images/logos/new-logo.webp" alt="logo" width="400px" />
              </div>
              <div class="report-heading-container">
                <h2>{{ data.test.name }} Report Card</h2>
                <div :class="`featured-badge feature-badge-color-1`">
                  <span>{{ grade }}</span>
                </div>
              </div>
              <div class="report-sheet">
                <div class="row align-items-center">
                  <div class="col-lg-12 col-md-12 col-sm-12 mobile-overflow-scroll">
                    <table class="table table-bordered table-responsive">
                      <thead>
                        <tr class="table-primary tb-heading">
                          <th scope="col" colspan="5">
                            SUBJECT WISE EVALUATION
                          </th>
                        </tr>
                        <tr class="table-primary text-center">
                          <th scope="col">
                            SUBJECT
                          </th>
                          <th scope="col">
                            TOTAL QUESTIONS
                          </th>
                          <th scope="col">
                            QUESTIONS ATTEMPTED
                          </th>
                          <th scope="col">
                            TOTAL MARKS
                          </th>
                          <th scope="col">
                            MARKS ALLOTED
                          </th>
                        </tr>
                      </thead>
                      <tbody class="text-center">
                        <tr v-for="(item, i) in data.subject_wise_score" :key="i">
                          <th scope="row">
                            {{ item.name }}
                          </th>
                          <td>{{ item.number_of_question }}</td>
                          <td>{{ item.attempt_count }}</td>
                          <td>{{ item.total_mark_sum }}</td>
                          <td>{{ item.total_mark_alloted_sum }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="column-chart my-4">
                      <div class="text-center">
                        <h5>SUBJECT WISE EVALUATION ANALYSIS</h5>
                      </div>
                      <column-chart :data="subjectReportSorted" suffix="%" :library="{backgroundColor: '#fff'}" :download="{background: '#fff'}" />
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 mobile-overflow-scroll">
                    <table class="table table-bordered table-responsive">
                      <thead>
                        <tr class="table-primary tb-heading">
                          <th scope="col" colspan="5">
                            TOTAL EVALUATION
                          </th>
                        </tr>
                        <tr class="table-primary text-center">
                          <th scope="col">
                            TOTAL QUESTIONS
                          </th>
                          <th scope="col">
                            QUESTIONS ATTEMPTED
                          </th>
                          <th scope="col">
                            TOTAL MARKS
                          </th>
                          <th scope="col">
                            MARKS ALLOTED
                          </th>
                        </tr>
                      </thead>
                      <tbody class="text-center">
                        <tr>
                          <td>{{ data.total_question_count }}</td>
                          <td>{{ data.total_answer_count }}</td>
                          <td>{{ data.total_score }}</td>
                          <td>{{ data.alloted_score }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-lg-8 col-md-7 col-sm-12">
                    <div class="column-chart my-4">
                      <div class="text-center">
                        <h5>TOTAL EVALUATION ANALYSIS</h5>
                      </div>
                      <pie-chart
                        loading="Loading Chart..."
                        :data="totalReport"
                        suffix="%"
                        :donut="false"
                        :library="{backgroundColor: '#fff'}"
                        :download="{background: '#fff'}"
                      />
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-5 col-sm-12">
                    <table class="table table-bordered">
                      <thead>
                        <tr class="table-primary tb-heading">
                          <th scope="col" colspan="2">
                            GRADING SCALE
                          </th>
                        </tr>
                      </thead>
                      <tbody class="text-center">
                        <tr :class="grade==='A' ? 'table-success' : ''">
                          <th scope="row">
                            A
                          </th>
                          <td>100% - 90%</td>
                        </tr>
                        <tr :class="grade==='B' ? 'table-success' : ''">
                          <th scope="row">
                            B
                          </th>
                          <td>89% - 75%</td>
                        </tr>
                        <tr :class="grade==='C' ? 'table-success' : ''">
                          <th scope="row">
                            C
                          </th>
                          <td>74% - 60%</td>
                        </tr>
                        <tr :class="grade==='D' ? 'table-success' : ''">
                          <th scope="row">
                            D
                          </th>
                          <td>59% - 45%</td>
                        </tr>
                        <tr :class="grade==='E' ? 'table-success' : ''">
                          <th scope="row">
                            E
                          </th>
                          <td>44% - 35%</td>
                        </tr>
                        <tr :class="grade==='F' ? 'table-success' : ''">
                          <th scope="row">
                            F
                          </th>
                          <td>34% - 0%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.mobile-overflow-scroll{
    overflow:hidden;
    overflow-x:scroll;
}
.test-inner-title{
    padding-top: 50px;
    padding-bottom: 10px;
}
.main-report-wrapper{
    width:100%;
    padding: 10px;
    background-color: #e9e9e9;
    margin: 10px 0;
    border-radius: 5px;
}
.inner-report-wrapper{
    border:3px dashed #ccc;
    background-color: white;
    border-radius: 5px;
}
.report-logo-container{
    text-align:center;
    padding: 10px;
}
.report-logo-container img{
    height: 150px;
    object-fit:contain;
}
.report-heading-container{
    padding: 5px 10px;
    text-align:center;
    background-color:#354621;
    position: relative;
}
.report-heading-container h2{
    text-transform: capitalize;
    font-size: 1.6rem;
    margin:0;
    color: white;
}
.report-sheet{
    padding: 10px 10px;
}
.tb-heading th{
    background-color:#eacf6c;
    color: white;
    text-align:center;
}

.featured-badge {
  --badge-size: 4rem;
  height: var(--badge-size);
  width: var(--badge-size);
  position: absolute;
  right: 0;
  bottom: -10px;
}
/* add ribbons */
.featured-badge::before,
.featured-badge::after {
  content: '';
  position: absolute;
  top: 50%;
  width: calc(var(--badge-size) / 4);
  height: calc(var(--badge-size) * 0.75);
  background: #ff0000;
  border-width: 0 calc(var(--badge-size) / 16);
  border-color: #140037;
  border-style: solid;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 90%, 0% 100%);
}
.featured-badge::before {
  left: 0; transform: translateX(100%) rotate(25deg);
  z-index:1;
}
.featured-badge::after {
  right: 0; transform: translateX(-100%) rotate(-25deg);
  z-index: 1;
}
/* text */
.featured-badge span {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: var(--badge-size);
  height: var(--badge-size);
  font-size: calc(var(--badge-size) / 3);
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0c808;
  box-shadow: 0.025em 0.025em 0.1em #303030;
  border-radius: 50%;
}
.feature-badge-color-1 span {
  background: #f0c808;
  background-color: #f0c808;
  z-index:2;
}
/* text area */
.featured-badge span::before {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 85%; height: 85%;
  background: #c4a408;
  box-shadow: 0.025em 0.025em 0.1em #303030 inset;
  border-radius: 50%;
  z-index: -1;
}
.feature-badge-color-1 span::before {
  background: #c4a408;
  background-color: #c4a408;
}
</style>
