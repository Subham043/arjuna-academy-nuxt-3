import Chartkick from 'vue-chartkick'
import VueChart from 'chart.js/auto'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Chartkick.use(VueChart))
})
