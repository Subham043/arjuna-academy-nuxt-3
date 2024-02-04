<template>
  <article class="item">
    <div v-for="i in 8" :key="i" class="info">
      <el-skeleton style="width: 100%" animated>
        <template #template>
          <el-skeleton-item variant="p" style="width: 50%" />
          <br>
          <el-skeleton-item variant="text" style="width: 100%;" />
        </template>
      </el-skeleton>
      <hr>
    </div>
  </article>
</template>
