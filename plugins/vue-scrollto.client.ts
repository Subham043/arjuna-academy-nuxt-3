import VueScrollTo from 'vue-scrollto'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueScrollTo, {
    duration: 500,
    easing: 'ease',
    offset: 0,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
  })

  return {
    provide: {
      scroll: (section: string | undefined = '#container', callback?: () => any) => VueScrollTo.scrollTo(section, {
        onStart: () => {
          if (callback) {
            setTimeout(() => callback(), 1000)
          }
        }
      })
    }
  }
})
