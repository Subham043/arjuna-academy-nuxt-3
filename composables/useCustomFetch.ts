type useCustomFetchType = (
  input: string | URL | Request,
  init?: RequestInit | undefined,
) => Promise<Response>;
export const useCustomFetch: useCustomFetchType = (
  request: string | URL | globalThis.Request,
  opts?: RequestInit
) => {
  const config = useRuntimeConfig()
  const { status, session } = useAuth()
  const options = {
    ...opts
  }
  if (status.value === 'authenticated' && session.value) {
    options.headers = new Headers({ Authorization: `Bearer ${session.value.user.token}` })
  }
  return fetch(config.public.apiURL + request, options)
}
