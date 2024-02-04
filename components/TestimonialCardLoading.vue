<script setup lang="ts">
const props = defineProps({
  count: {
    type: Number,
    default: 5
  }
})
</script>

<template>
  <div class="row justify-content-center testimonials-slider-two">
    <div v-for="i in count" :key="i" class="col-lg-4 col-md-6 col-sm-12">
      <el-skeleton style="width: 100%" animated>
        <template #template>
          <div class="testimonials-card-two">
            <div class="rating">
              <span v-for="it in props.count" :key="it" class="svg-icon">
                <Icon name="fa6-solid:star" />
              </span>
            </div>
            <el-skeleton-item variant="text" style="width: 100%;" />
            <br>
            <el-skeleton-item variant="text" style="width: 100%;" />
            <br>
            <div class="content px-0">
              <el-skeleton-item variant="circle" style="width: 100px; height: 100px;" />
              <el-skeleton-item variant="p" style="width: 50%" />
              <br>
            </div>
            <div class="quote">
              <i class="flaticon-quote" />
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>
