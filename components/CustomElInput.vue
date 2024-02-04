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
  },
  type: {
    type: String,
    required: false,
    default: 'text'
  }
})
const { value, errorMessage } = useField<string>(() => props.name)
</script>

<template>
  <div>
    <el-input
      v-model="value"
      :placeholder="placeholder"
      class="w-100"
      :type="type"
      :rows="type === 'textarea' ? 5 : 1"
    />
    <div class="is-invalid">
      {{ errorMessage }}
    </div>
  </div>
</template>
