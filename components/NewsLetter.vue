<script setup lang="ts">
import { object, string } from 'yup'
import { useToast } from 'vue-toastification'
import { API_ROUTES } from '../utils/api_routes'

const toast = useToast()
const route = useRoute()
const config = useRuntimeConfig()
const loading = ref(false)

const schema = object({
  email: string().email().required()
})

const onSubmit = async (values: any, actions: any) => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('email', values.email)
    formData.append('page_url', config.public.mainURL + route.fullPath)
    const response = await useCustomFetch(API_ROUTES.subscription, {
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
  <div class="newsletter-area section-bg ptb-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <div class="section-title mt-rs-20">
            <span>ARE YOU IMPRESSED FOR AMAZING SERVICES?</span>
            <h2>Subscribe our newsletter</h2>
          </div>
        </div>
        <div class="col-lg-7">
          <VeeForm
            v-slot="{ handleSubmit }"
            :validation-schema="schema"
            as="div"
          >
            <form class="newsletter-form" data-toggle="validator" method="POST" @submit.prevent="handleSubmit($event, onSubmit)">
              <div>
                <VeeField
                  id="subscription_email"
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder="Enter Your Email Address*"
                />
                <VeeErrorMessage
                  name="email"
                  as="div"
                  class="is-invalid"
                />
              </div>
              <button class="subscribe-btn" type="submit" :disabled="loading">
                <template v-if="!loading">
                  Subscribe Now
                </template>
                <div v-else class="spinner-border" role="status" />
              </button>
            </form>
          </VeeForm>
        </div>
      </div>
    </div>
  </div>
</template>
