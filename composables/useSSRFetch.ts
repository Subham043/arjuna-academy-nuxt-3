import type { UseFetchOptions } from 'nuxt/app'
import type { FetchError } from 'ofetch'

export function useSSRFetch<DataT = void, ErrorT = FetchError> (
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: any
) {
  const config = useRuntimeConfig()
  const { status, session } = useAuth()

  type DefaultData = DataT extends void ? unknown : DataT;

  // Specify DefaultData type for useFetch options
  const { ...opts } = options || ({} as UseFetchOptions<DefaultData>)
  const { isLoading, start, clear, finish } = useLoadingIndicator({
    duration: undefined,
    throttle: 10000
  })

  return useFetch<DefaultData, ErrorT>(url, {
    ...opts,
    baseURL: config.public.apiURL,
    onRequest ({ options }) {
      if (process.client && !isLoading.value) {
        clear()
        start()
      }
      if (status.value === 'authenticated' && session.value) {
        options.headers = new Headers({ Authorization: `Bearer ${session.value.user.token}` })
      }
    },
    onResponse ({ response }) {
      if (process.client && isLoading.value) {
        finish()
        clear()
      }
      if (!response.ok) {
        throw createError({
          statusCode: response.status,
          statusMessage: response._data.message
        })
      }
    },
    onResponseError ({ response }) {
      if (process.client && isLoading.value) {
        finish()
        clear()
      }
      if (!response.ok) {
        throw createError({
          statusCode: response.status,
          statusMessage: response._data.message
        })
      }
    }
  })
}
