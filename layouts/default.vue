<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'

const isFooterVisible = ref(false)
const isFooterEl = ref<HTMLElement | null>(null)
const isFootertargetVisible = useElementVisibility(isFooterEl)

watch(
  () => isFootertargetVisible.value,
  (value) => {
    if (!isFooterVisible.value && value) {
      isFooterVisible.value = true
    }
  }
)
</script>

<template>
  <div>
    <MainHeader />
    <slot />
    <LazyNewsLetter />

    <div ref="isFooterEl">
      <LazyMainFooter v-if="isFooterVisible" />
    </div>

    <LazySocialMedia />
  </div>
</template>
