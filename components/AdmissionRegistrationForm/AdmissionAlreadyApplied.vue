<script setup lang="ts">

const props = defineProps({
  apply_tab_value: {
    type: String,
    default: ''
  }
})

const { status } = useAuth()

</script>

<template>
  <div>
    <div v-if="status === 'loading'" class="text-center">
      <div class="spinner-border" role="status" />
    </div>
    <div v-else-if="status==='authenticated'">
      <AdmissionRegistrationFormAdmissionInfo :apply_tab_value="props.apply_tab_value" />
    </div>
    <div v-else>
      <AdmissionRegistrationFormAdmissionLoginForm />
    </div>
  </div>
</template>
