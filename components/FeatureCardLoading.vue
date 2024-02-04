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
    <div v-for="i in props.count" :key="i" class="col-lg-4 col-md-6 col-sm-12">
      <el-skeleton style="width: 100%" animated>
        <template #template>
          <div class="counter-card box-shadow px-1">
            <el-skeleton-item variant="circle" style="width: 50px; height: 50px;" />
            <el-skeleton-item variant="p" style="width: 50%" />
            <br>
            <el-skeleton-item variant="p" style="width: 100%" />
            <br>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>
