<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  }
})
const { value, errorMessage } = useField<string>(() => props.name)
</script>

<template>
  <div>
    <input
      v-model="value"
      :placeholder="placeholder"
      class="w-100 form-control el-form-control"
      type="date"
    >
    <div class="is-invalid">
      {{ errorMessage }}
    </div>
  </div>
</template>
