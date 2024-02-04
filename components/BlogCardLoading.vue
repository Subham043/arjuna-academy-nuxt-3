<script setup lang="ts">
const props = defineProps({
  count: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="row justify-content-center">
    <div v-for="i in props.count" :key="i" class="col-lg-4 col-md-6">
      <el-skeleton style="width: 100%" animated>
        <template #template>
          <el-skeleton-item variant="image" style="width: 100%; height: 240px;" />
          <div style="padding: 14px;">
            <el-skeleton-item variant="p" style="width: 50%" />
            <br>
            <el-skeleton-item variant="text" style="width: 100%;" />
            <br>
            <el-skeleton-item variant="text" style="width: 50%;" />
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>
