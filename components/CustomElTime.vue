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
    <el-time-picker
      v-model="value"
      arrow-control
      class="w-100"
      :placeholder="placeholder"
    />
    <div class="is-invalid">
      {{ errorMessage }}
    </div>
  </div>
</template>
