<script setup lang="ts">
type PageType = {
  link: string;
  name: string;
};
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  pages: {
    type: Array<PageType>,
    default: []
  }
})
</script>

<template>
  <div class="inner-banner inner-banner-bg">
    <div class="container">
      <div class="inner-title text-center">
        <h3>{{ props.title }}</h3>
        <ul>
          <li>
            <NuxtLink noPrefetch to="/">
              Home
            </NuxtLink>
          </li>
          <li v-for="(item, i) in props.pages" :key="i">
            <NuxtLink noPrefetch v-if="i + 1 !== props.pages.length" :to="item.link">
              {{
                item.name
              }}
            </NuxtLink>
            <template v-else>
              &nbsp;{{ item.name }}
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
