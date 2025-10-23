<script setup lang="ts">
import { object, string } from 'yup'
import { useToast } from 'vue-toastification'

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
  <VeeForm v-slot="{ handleSubmit }" :validation-schema="schema" as="div">
    <form id="admissionLoginForm" method="post" @submit.prevent="handleSubmit($event, onSubmit)">
      <div class="row">
        <div class="col-12">
          <h3 class="user-title">
            Login To View Information
          </h3>
        </div>
        <div class="col-lg-12 col-md-12">
          <div class="form-group">
            <VeeField
              id="email"
              type="email"
              name="email"
              class="form-control"
              data-error="Email Address*"
              placeholder="Email Address*"
            />
            <VeeErrorMessage name="email" as="div" class="is-invalid" />
          </div>
        </div>
        <div class="col-lg-12 col-md-12">
          <div class="form-group">
            <VeeField
              id="password"
              type="password"
              name="password"
              class="form-control"
              data-error="Password*"
              placeholder="Password*"
            />
            <VeeErrorMessage name="password" as="div" class="is-invalid" />
          </div>
        </div>
        <div class="col-lg-12 col-md-12">
          <button type="submit" :disabled="loading" class="default-btn">
            <template v-if="!loading">
              Login
            </template>
            <div v-else class="spinner-border" role="status" />
          </button>
        </div>
      </div>
    </form>
  </VeeForm>
</template>
