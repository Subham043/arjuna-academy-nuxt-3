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
    <el-date-picker
      v-model="value"
      type="date"
      class="w-100"
      :placeholder="placeholder"
    />
    <div class="is-invalid">
      {{ errorMessage }}
    </div>
  </div>
</template>
