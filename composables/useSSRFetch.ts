type useFetchType = typeof useFetch

export const useSSRFetch: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig()
  const { status, session } = useAuth()
  const { isLoading, start, clear, finish } = useLoadingIndicator({
    duration: undefined,
    throttle: 10000
  })

  // modify options as needed
  options.baseURL = config.public.apiURL
  options.onRequest = ({ options }) => {
    if (process.client && !isLoading.value) {
      clear()
      start()
    }
    if (status.value === 'authenticated' && session.value) {
      options.headers = new Headers({ Authorization: `Bearer ${session.value.user.token}` })
    }
  }
  options.onResponse = () => {
    if (process.client && isLoading.value) {
      finish()
      clear()
    }
  }
  options.onResponseError = () => {
    if (process.client && isLoading.value) {
      finish()
      clear()
    }
  }

  return useFetch(path, options)
}
