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
          <el-skeleton-item variant="rect" style="width: 100%; height: 340px;" />
        </template>
      </el-skeleton>
    </div>
  </div>
</template>
