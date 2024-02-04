<script setup lang="ts">
const props = defineProps({
  image: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <el-skeleton style="width: 100%" animated>
    <template #template>
      <el-skeleton-item v-if="props.image" variant="image" style="width: 100%; height: 440px;" />
      <div style="padding: 14px;">
        <el-skeleton-item variant="p" style="width: 50%" />
        <br>
        <el-skeleton-item variant="text" style="width: 100%;" />
        <br>
        <el-skeleton-item variant="text" style="width: 100%;" />
        <br>
        <el-skeleton-item variant="text" style="width: 100%;" />
        <br>
        <el-skeleton-item variant="text" style="width: 100%;" />
        <br>
        <el-skeleton-item variant="text" style="width: 100%;" />
        <br>
        <el-skeleton-item variant="text" style="width: 50%;" />
      </div>
    </template>
  </el-skeleton>
</template>
