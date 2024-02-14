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
    <textarea
      v-if="type === 'textarea'"
      v-model="value"
      :placeholder="placeholder"
      class="w-100 form-control el-form-control"
      :type="type"
      rows="3"
    />
    <input
      v-else
      v-model="value"
      :placeholder="placeholder"
      class="w-100 form-control el-form-control"
      :type="type"
    >
    <div class="is-invalid">
      {{ errorMessage }}
    </div>
  </div>
</template>
