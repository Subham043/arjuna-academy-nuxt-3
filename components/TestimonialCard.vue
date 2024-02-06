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
  message: {
    type: String,
    default: ''
  },
  star: {
    type: Number,
    default: 5
  }
})

</script>

<template>
  <div class="testimonials-card-two">
    <div class="rating">
      <span v-for="i in props.star" :key="i" class="svg-icon">
        <Icon name="fa6-solid:star" />
      </span>
    </div>
    <div class="quote">
      <i class="flaticon-quote" />
    </div>
    <p>
      “<span v-html="props.message" />”
    </p>
    <div class="content">
      <NuxtImg
        format="webp"
        loading="lazy"
        width="70px"
        height="70px"
        placeholder="/images/placeholder.webp"
        :src="props.image"
        :alt="props.name"
        :title="props.name"
      />
      <h3 v-html="props.name" />
      <span v-html="props.designation" />
    </div>
  </div>
</template>
