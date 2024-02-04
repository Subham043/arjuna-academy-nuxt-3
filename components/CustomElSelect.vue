<script setup lang="ts">
import { useField } from 'vee-validate'

type OptionType = {
  label: string;
  value: string | number;
};

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
  options: {
    type: Array<OptionType>,
    required: true,
    default: []
  }
})
const { value, errorMessage } = useField<string>(() => props.name)
</script>

<template>
  <div>
    <el-select v-model="value" class="w-100" :placeholder="placeholder">
      <el-option
        v-for="(item, i) in options"
        :key="i"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div class="is-invalid">
      {{ errorMessage }}
    </div>
  </div>
</template>
