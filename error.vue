<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div>
    <MainHeader />
    <div class="error-area pt-70 pb-70">
      <div class="d-table">
        <div class="d-table-cell">
          <div class="error-content">
            <h1>{{ props.error?.statusCode }}</h1>
            <template v-if="props.error?.statusCode === 404">
              <h3>Oops! Page Not Found</h3>
              <p>
                The page you are looking for might have been removed had its name
                changed or is temporarily unavailable.
              </p>
            </template>
            <h3 v-else>
              Oops! An error occured
            </h3>
            <button class="default-btn" @click="handleError">
              Return To Home
            </button>
          </div>
        </div>
      </div>
    </div>
    <NewsLetter />
    <MainFooter />
    <SocialMedia />
  </div>
</template>
