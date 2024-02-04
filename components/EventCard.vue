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
  slug: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: ''
  },
  date: {
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
  is_event: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="event-item">
    <div v-if="props.image!==''" class="event-img">
      <NuxtLink :to="props.is_event ? `/events/${props.slug}` : `/expert-tips/${props.slug}`" :aria-label="props.title">
        <NuxtImg placeholder="/images/placeholder.webp" :src="props.image" :alt="props.image_alt" :title="props.image_title" />
      </NuxtLink>
    </div>
    <div class="event-content">
      <ul class="event-list">
        <li>
          <span class="svg-icon">
            <Icon name="fa6-solid:calendar-days" />&nbsp; {{ props.date }}
          </span>
        </li>
        <li v-if="!props.is_event">
          <span class="svg-icon">
            <Icon name="fa6-solid:user" />&nbsp; {{ props.author }}
          </span>
        </li>
      </ul>
      <h3>
        <NuxtLink :to="props.is_event ? `/events/${props.slug}` : `/expert-tips/${props.slug}`" :aria-label="props.title">
          <span v-html="props.title" />
        </NuxtLink>
      </h3>
      <p v-html="props.description" />
    </div>
  </div>
</template>
