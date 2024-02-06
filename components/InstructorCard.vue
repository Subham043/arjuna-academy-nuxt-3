<script setup lang="ts">

const props = defineProps({
  image: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  designation: {
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
  description: {
    type: String,
    default: ''
  }
})

</script>

<template>
  <div class="instructors-card">
    <NuxtImg
      format="webp"
      loading="lazy"
      placeholder="/images/placeholder.webp"
      :src="props.image"
      :alt="props.image_alt"
      :title="props.image_title"
    />
    <div class="content">
      <h3 v-html="props.name" />
      <span v-html="props.designation" />
    </div>
    <div class="instructor-detail">
      <p v-html="props.description" />
    </div>
  </div>
</template>
