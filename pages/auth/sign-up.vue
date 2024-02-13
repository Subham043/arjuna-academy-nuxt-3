<script setup lang="ts">
import { object, string, number, ref as yupRef } from 'yup'
import { useToast } from 'vue-toastification'
import { API_ROUTES } from '@/utils/api_routes'

definePageMeta({
  middleware: 'guest-only'
})

const toast = useToast()
const { signIn } = useAuth()
const loading = ref(false)

const schema = object({
  name: string().required(),
  email: string().email().required(),
  phone: number()
    .typeError('phone must be a number')
    .lessThan(9999999999, 'phone must be less than 10 digits')
    .moreThan(100000000, 'phone must be equal to 10 digits')
    .required(),
  password: string().required(),
  confirm_password: string()
    .required('confirm password is a required field')
    .oneOf([yupRef('password')], 'Passwords must match')
})

const onSubmit = async (values: any, actions: any) => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('phone', values.phone)
    formData.append('email', values.email)
    formData.append('password', values.password)
    formData.append('confirm_password', values.confirm_password)
    const response = await useCustomFetch(API_ROUTES.register, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      toast.success(content.message)
      actions.resetForm()
      signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password
      })
    } else {
      throw content
    }
  } catch (err: any) {
    toast.error(err?.message)
    actions.setErrors({
      email: err?.errors?.email?.length > 0 && err?.errors?.email[0],
      name: err?.errors?.name?.length > 0 && err?.errors?.name[0],
      phone: err?.errors?.phone?.length > 0 && err?.errors?.phone[0],
      password: err?.errors?.password?.length > 0 && err?.errors?.password[0],
      confirm_password:
        err?.errors?.confirm_password?.length > 0 &&
        err?.errors?.confirm_password[0]
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <BreadCrumb
      title="Sign Up"
      :pages="[
        {
          link: '',
          name: 'Sign Up',
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
                  <h3>Sign up</h3>
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
                              id="name"
                              type="name"
                              name="name"
                              class="form-control"
                              data-error="Name*"
                              placeholder="Name*"
                            />
                            <VeeErrorMessage
                              name="name"
                              as="div"
                              class="is-invalid"
                            />
                          </div>
                        </div>
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
                        <div class="col-lg-12">
                          <div class="form-group">
                            <VeeField
                              id="phone"
                              type="phone"
                              name="phone"
                              class="form-control"
                              data-error="Phone Number*"
                              placeholder="Phone Number*"
                            />
                            <VeeErrorMessage
                              name="phone"
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
                        <div class="col-12">
                          <div class="form-group">
                            <VeeField
                              id="confirm_password"
                              type="password"
                              name="confirm_password"
                              class="form-control"
                              data-error="Confirm Password*"
                              placeholder="Confirm Password*"
                            />
                            <VeeErrorMessage
                              name="confirm_password"
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
                              Register Now
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
                            Already have an account?
                            <NuxtLink
                              noPrefetch
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
