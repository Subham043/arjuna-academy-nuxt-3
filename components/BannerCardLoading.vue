<template>
  <div class="row justify-content-center hero-slider">
    <div v-for="i in 1" :key="i" class="col-lg-12 col-md-12 col-sm-12">
      <el-skeleton style="width: 100%" animated>
        <template #template>
          <div class="container-fluid">
            <div class="row align-items-center">
              <div class="col-lg-6">
                <div class="hero-content">
                  <el-skeleton-item variant="p" style="width: 30%;" />
                  <br>
                  <el-skeleton-item variant="h1" style="width: 50%;" />
                  <br>
                  <el-skeleton-item variant="text" style="width: 100%;" />
                  <br>
                  <el-skeleton-item variant="text" style="width: 100%;" />
                  <br>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="hero-img">
                  <el-skeleton-item variant="image" style="width: 100%; height: 400px;" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>
