<script setup lang="ts">
const props = defineProps({
  image: {
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
  date: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: ''
  },
  slug: {
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
  }
})
</script>

<template>
  <div class="blog-card">
    <NuxtLink noPrefetch :to="`/knowledge-desk/${props.slug}`" aria-hidden="true" :aria-label="title">
      <NuxtImg
        format="webp"
        loading="lazy"
        width="405px"
        height="202px"
        placeholder="/images/img-placeholder.webp"
        :src="image"
        :alt="props.image_alt"
        :title="props.image_title"
      />
    </NuxtLink>
    <div class="content">
      <ul>
        <li class="one-line-text">
          <span class="svg-icon">
            <Icon name="fa6-solid:calendar-days" />&nbsp; {{ props.date }}
          </span>
        </li>
        <!-- <li class="one-line-text">
          <span class="svg-icon">
            <Icon name="fa6-solid:user" />&nbsp; {{ props.author }}
          </span>
        </li> -->
      </ul>
      <h3>
        <NuxtLink noPrefetch :to="`/knowledge-desk/${props.slug}`" aria-hidden="true" :aria-label="title">
          <span v-html="props.title" />
        </NuxtLink>
      </h3>
      <p v-html="props.description" />
    </div>
  </div>
</template>
