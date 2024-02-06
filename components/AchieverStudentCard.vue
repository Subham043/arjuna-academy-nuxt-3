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
  rank: {
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
  college: {
    type: String,
    default: ''
  }
})

</script>

<template>
  <div class="achiever-detail">
    <div class="achiever-detail-container pb-0">
      <NuxtImg
        format="webp"
        placeholder="/images/placeholder.webp"
        loading="lazy"
        :src="props.image"
        :alt="props.image_alt"
        :title="props.image_title"
        height="150px"
        class="img-responsive"
      />
      <h5 v-html="props.name" />
    </div>
    <h3 v-html="props.rank" />
    <div class="achiever-detail-container pt-0">
      <p v-html="props.college" />
    </div>
  </div>
</template>

<style scoped>
.achiever-detail {
    background-color: #f9f9f9;
    text-align: center;
    margin-bottom: 30px;
    clip-path: polygon(50% 0,100% 0,100% 99%,50% 85%,0 100%,0 0);
    min-height: 375px;
    /* height: 375px; */
}

.achiever-detail-container{
    padding: 15px 30px;
}
.achiever-detail img {
    width: 100%;
    border: 2px solid #D7C167;
}
.achiever-detail h5 {
    font-weight: 700;
    font-size: 17px;
    padding: 10px 0;
    margin: 0;
}
.achiever-detail h3 {
    font-size: 15px;
    color: #fff;
    background: #304557;
    padding: 10px;
    font-weight: 700;
    text-align: center;
}
.tab-filter p {
    font-size: 14px;
    text-align: center;
    padding: 0 10%;
    font-weight: 620;
}
.achiever-detail p {
    font-weight: 700;
}

@media only screen and (max-width:767px) {
    .achiever-detail {
        min-height: 360px;
        /* height: 355px; */
    }

    .achiever-detail img {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }
}
</style>
