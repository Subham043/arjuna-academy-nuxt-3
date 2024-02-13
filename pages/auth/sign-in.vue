<script setup lang="ts">
import { object, string } from 'yup'
import { useToast } from 'vue-toastification'

definePageMeta({
  middleware: 'guest-only'
})

const { signIn } = useAuth()
const toast = useToast()

const loading = ref(false)

const schema = object({
  email: string().email().required(),
  password: string().required()
})

const onSubmit = async (values: any) => {
  loading.value = true
  try {
    await signIn('credentials', {
      redirect: false,
      ...values
    })
    toast.success('Logged in successfully')
  } catch (error) {
    toast.error('Invalid credentials')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <BreadCrumb
      title="Sign In"
      :pages="[
        {
          link: '',
          name: 'Sign In',
        },
      ]"
    />

    <div class="user-area pt-70 pb-70">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-lg-5">
            <div class="user-all-form">
              <div class="register-form">
                <div class="top-header">
                  <h3>Sign in</h3>
                </div>
                <div class="contact-form">
                  <VeeForm
                    v-slot="{ handleSubmit }"
                    :validation-schema="schema"
                    as="div"
                  >
                    <form
                      id="contactForm"
                      method="post"
                      @submit.prevent="handleSubmit($event, onSubmit)"
                    >
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="form-group">
                            <VeeField
                              id="email"
                              type="email"
                              name="email"
                              class="form-control"
                              data-error="Email Address*"
                              placeholder="Email Address*"
                            />
                            <VeeErrorMessage
                              name="email"
                              as="div"
                              class="is-invalid"
                            />
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="form-group">
                            <VeeField
                              id="password"
                              type="password"
                              name="password"
                              class="form-control"
                              data-error="Password*"
                              placeholder="Password*"
                            />
                            <VeeErrorMessage
                              name="password"
                              as="div"
                              class="is-invalid"
                            />
                          </div>
                        </div>
                        <div class="col-lg-12 form-condition">
                          <div class="agree-label">
                            <input id="chb1" type="checkbox">
                            <label for="chb1">
                              Remember Me
                              <NuxtLink
                                noPrefetch
                                class="forget"
                                to="/auth/forgot-password"
                              >Forgot Password?</NuxtLink>
                            </label>
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12 text-center">
                          <button
                            type="submit"
                            :disabled="loading"
                            class="default-btn"
                          >
                            <template v-if="!loading">
                              Login Now
                            </template>
                            <div
                              v-else
                              class="spinner-border"
                              role="status"
                            />
                          </button>
                        </div>
                        <div class="col-lg-12 mt-3 text-center">
                          <label for="chb1">
                            Don't have an account?
                            <NuxtLink
                              noPrefetch
                              class="forget"
                              to="/auth/sign-up"
                            >Register</NuxtLink>
                          </label>
                        </div>
                      </div>
                    </form>
                  </VeeForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
