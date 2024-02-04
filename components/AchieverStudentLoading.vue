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
    <div v-for="i in props.count" :key="i" class="col-lg-3 col-md-6">
      <el-skeleton style="width: 100%" animated>
        <template #template>
          <div class="achiever-detail">
            <div class="achiever-detail-container pb-0 text-center">
              <el-skeleton-item variant="image" style="width: 50%; height: 150px; margin: auto;" />
              <br>
              <el-skeleton-item variant="p" style="width: 100%" />
              <br>
              <el-skeleton-item variant="p" style="width: 100%" />
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>
