<script setup lang="ts">
import { useToast } from 'vue-toastification'

const toast = useToast()
const loading = ref(false)
const display = ref(true)

const resendVerificationMail = async () => {
  loading.value = true
  try {
    const response = await useCustomFetch('/api/v1/email/verify/resend-notification', {
      method: 'POST'
    })
    const content = await response.json()
    if (response.ok) {
      toast.success(content.message)
    } else {
      throw content
    }
  } catch (err: any) {
    toast.error(err?.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="display" class="alert alert-warning mb-3" role="alert">
    <div class="row justify-content-between">
      <h4 class="alert-heading col-auto">
        Verification Pending!
      </h4>
      <button type="button" class="btn-close col-auto" data-bs-dismiss="alert" aria-label="Close" @click="display=false" />
    </div>
    <p>Your email verification is still pending. Kindly verify your email by clicking on the link we had emailed to you? If you didn't receive the email, we will gladly send you another</p>
    <hr>
    <button class="btn btn-sm btn-dark" :disabled="loading" @click="resendVerificationMail">
      <template v-if="!loading">
        Resend Verification Email
      </template>
      <div v-else class="spinner-border" role="status" />
    </button>
  </div>
</template>
