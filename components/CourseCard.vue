<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    default: ''
  },
  image_alt: {
    type: String,
    default: ''
  },
  image_title: {
    type: String,
    default: ''
  },
  class_name: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  slug: {
    type: String,
    default: ''
  },
  branches: {
    type: Array<{
      created: string;
      created_at: string;
      name: string;
      id: number;
      is_active: boolean;
      slug: string;
      updated: string;
      updated_at: string;
    }>,
    default: []
  }
})
</script>

<template>
  <div class="courses-item">
    <NuxtImg placeholder="/images/placeholder.webp" :src="props.image" :alt="props.image_alt" :title="props.image_title" />
    <div class="content">
      <div class="bottom-content align-items-center">
        <p class="tag-btn" v-html="props.class_name" />
      </div>
      <h3 v-html="props.title" />
      <p v-html="props.description" />
      <hr>
      <div class="bottom-content align-items-center">
        <el-dropdown>
          <NuxtLink noPrefetch to="/" class="default-btn two border-radius-50 m-0" aria-hidden="true" aria-label="Enroll Now">
            Enroll Now
          </NuxtLink>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item, i) in props.branches"
                :key="i"
              >
                <NuxtLink noPrefetch :to="`/${item.slug}/courses/${slug}`" class="text-dark" aria-hidden="true" :aria-label="item.name" v-html="item.name" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown>
          <NuxtLink noPrefetch to="/" class="default-btn border-radius-50 mr-2" aria-hidden="true" aria-label="Request Callback">
            Request Callback
          </NuxtLink>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item, i) in props.branches"
                :key="i"
              >
                <NuxtLink noPrefetch :to="`/${item.slug}/courses/${slug}`" class="text-dark" aria-hidden="true" :aria-label="item.name" v-html="item.name" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
