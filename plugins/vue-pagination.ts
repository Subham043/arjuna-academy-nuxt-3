// import the package
// eslint-disable-next-line import/no-named-as-default
import VueAwesomePaginate from 'vue-awesome-paginate'

// import the necessary css file
import 'vue-awesome-paginate/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueAwesomePaginate)
})
