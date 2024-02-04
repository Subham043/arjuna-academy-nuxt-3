<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  active_text: {
    type: String,
    required: false,
    default: ''
  },
  inactive_text: {
    type: String,
    required: false,
    default: ''
  }
})
const { value, errorMessage } = useField<string>(() => props.name)
</script>

<template>
  <div>
    <el-switch
      v-model="value"
      :active-text="props.active_text"
      :inactive-text="props.inactive_text"
    />
    <div class="is-invalid">
      {{ errorMessage }}
    </div>
  </div>
</template>
