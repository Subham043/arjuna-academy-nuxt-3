<script setup lang="ts">
import { object, string } from 'yup'
import { useToast } from 'vue-toastification'
import { API_ROUTES } from '@/utils/api_routes'

definePageMeta({
  middleware: 'guest-only'
})

const toast = useToast()

const loading = ref(false)

const schema = object({
  email: string().email().required()
})

const onSubmit = async (values: any, actions: any) => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('email', values.email)
    const response = await useCustomFetch(API_ROUTES.forgot_password, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      toast.success(content.message)
      actions.resetForm()
    } else {
      throw content
    }
  } catch (err: any) {
    toast.error(err?.message)
    actions.setErrors({
      email: err?.errors?.email?.length > 0 && err?.errors?.email[0]
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <BreadCrumb
      title="Forgot Password"
      :pages="[
        {
          link: '',
          name: 'Forgot Password',
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
                  <h3>Forgot Password</h3>
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
                        <div class="col-lg-12 col-md-12 text-center">
                          <button
                            type="submit"
                            :disabled="loading"
                            class="default-btn"
                          >
                            <template v-if="!loading">
                              Reset Password
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
                            Remember your password?
                            <NuxtLink noPrefetch
                              class="forget"
                              to="/auth/sign-in"
                            >Login</NuxtLink>
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
