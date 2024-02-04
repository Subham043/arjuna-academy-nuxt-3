<script setup lang="ts">
import { object, string, number, ref as yupRef } from 'yup'
import { useToast } from 'vue-toastification'
import { API_ROUTES } from '@/utils/api_routes'
import type { ProfileType } from '@/utils/types'

definePageMeta({
  middleware: 'auth'
})

const toast = useToast()
const loading = ref(false)

const { data, refresh } = await useSSRFetch<{user:ProfileType}>(() => API_ROUTES.profile, {
  key: 'profile',
  lazy: true
})

const profileSchema = object({
  name: string().required(),
  email: string().email().required(),
  phone: number()
    .typeError('phone must be a number')
    .lessThan(9999999999, 'phone must be less than 10 digits')
    .moreThan(100000000, 'phone must be equal to 10 digits')
    .required()
})

const passwordSchema = object({
  old_password: string().required(),
  password: string().required(),
  confirm_password: string()
    .required('confirm password is a required field')
    .oneOf([yupRef('password')], 'Passwords must match')
})

const profileInitialValue = {
  name: data.value ? data.value.user.name : '',
  email: data.value ? data.value.user.email : '',
  phone: data.value ? data.value.user.phone : 0
}

const onProfileSubmit = async (values: any, actions: any) => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('phone', values.phone)
    formData.append('email', values.email)
    const response = await useCustomFetch(API_ROUTES.profile_update, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      toast.success('Profile Updated successfully')
      refresh()
    } else {
      throw content
    }
  } catch (err: any) {
    toast.error(err?.message)
    actions.setErrors({
      email: err?.errors?.email?.length > 0 && err?.errors?.email[0],
      name: err?.errors?.name?.length > 0 && err?.errors?.name[0],
      phone: err?.errors?.phone?.length > 0 && err?.errors?.phone[0]
    })
  } finally {
    loading.value = false
  }
}

const { handleSubmit: handlePasswordSubmit } = useForm({
  validationSchema: toTypedSchema(passwordSchema)
})

const onPasswordSubmit = handlePasswordSubmit(async (values: any, actions: any) => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('old_password', values.old_password)
    formData.append('password', values.password)
    formData.append('confirm_password', values.confirm_password)
    const response = await useCustomFetch(API_ROUTES.password_update, {
      method: 'POST',
      body: formData
    })
    const content = await response.json()
    if (response.ok) {
      toast.success('Password Updated successfully')
      actions.resetForm()
    } else {
      throw content
    }
  } catch (err: any) {
    toast.error(err?.message)
    actions.setErrors({
      old_password: err?.errors?.old_password?.length > 0 && err?.errors?.old_password[0],
      password: err?.errors?.password?.length > 0 && err?.errors?.password[0],
      confirm_password: err?.errors?.confirm_password?.length > 0 && err?.errors?.confirm_password[0]
    })
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <BreadCrumb
      title="Profile"
      :pages="[
        {
          link:'',
          name:'Profile'
        }
      ]"
    />

    <div class="user-area pt-70 pb-70">
      <div class="container">
        <VerifyNotification v-if="data && data.user.verified === 'VERIFICATION PENDING'" />

        <div class="row align-items-center justify-content-center">
          <div class="col-lg-6">
            <div class="user-all-form">
              <div class="contact-form">
                <h3 class="user-title">
                  Profile
                </h3>

                <VeeForm
                  v-slot="{ handleSubmit }"
                  :validation-schema="profileSchema"
                  :initial-values="profileInitialValue"
                  as="div"
                >
                  <form id="profileForm" @submit.prevent="handleSubmit($event, onProfileSubmit)">
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
                            id="email_address"
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
                      <div class="col-lg-12 col-md-12">
                        <button type="submit" :disabled="loading" class="default-btn">
                          <template v-if="!loading">
                            Update Now
                          </template>
                          <div v-else class="spinner-border" role="status" />
                        </button>
                      </div>
                    </div>
                  </form>
                </VeeForm>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="user-all-form">
              <div class="contact-form">
                <h3 class="user-title">
                  Password
                </h3>
                <form id="passwordForm" @submit.prevent="onPasswordSubmit">
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group">
                        <VeeField
                          id="old_password"
                          type="password"
                          name="old_password"
                          class="form-control"
                          data-error="Current Password*"
                          placeholder="Current Password*"
                        />
                        <VeeErrorMessage
                          name="old_password"
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
                    <div class="col-lg-12 col-md-12">
                      <button type="submit" :disabled="loading" class="default-btn">
                        <template v-if="!loading">
                          Update Now
                        </template>
                        <div v-else class="spinner-border" role="status" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
