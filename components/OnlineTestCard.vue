<script setup lang="ts">
import type { PropType } from 'vue'
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
  amount: {
    type: null as unknown as PropType<number | null>,
    default: null
  },
  is_paid: {
    type: Boolean,
    default: false
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
  },
  enrollment: {
    type: Object as PropType<{
    amount:string;
    created_at:string;
    current_question_id:number;
    current_quiz_id:number;
    enrollment_type:string;
    id:number;
    is_enrolled:boolean;
    payment_status:string;
    razorpay_order_id:string|null;
    reason:string|null;
    receipt:string|null;
    test_id:number;
    test_status:string;
    updated_at:string;
    user_id:number;
    uuid:string;
  } | null>,
    default: null
  }
})
</script>

<template>
  <div class="courses-item online-test-item">
    <NuxtLink noPrefetch :to="`/online-tests/${props.slug}`" aria-hidden="true" :aria-label="title">
      <NuxtImg placeholder="/images/placeholder.webp" :src="props.image" :alt="props.image_alt" :title="props.image_title" />
    </NuxtLink>
    <div class="content">
      <div class="bottom-content align-items-center justify-content-end online-test-tag">
        <p v-if="props.is_paid" class="tag-btn">
          &#8377;{{ props.amount }}
        </p>
        <p v-else class="tag-btn">
          Free
        </p>
      </div>
      <h3 class="text-center mb-0">
        <NuxtLink noPrefetch :to="`/online-tests/${props.slug}`" aria-hidden="true" :aria-label="props.title" v-html="props.title" />
      </h3>
      <p v-html="description" />
      <NuxtLink noPrefetch :to="`/online-tests/${props.slug}`" class="default-btn two border-radius-50 m-0" aria-hidden="true" aria-label="Enroll Now">
        <template v-if="!props.enrollment">
          Take Now
        </template>
        <template v-else>
          <template v-if="props.enrollment.enrollment_type=='Purchased'">
            <template v-if="props.enrollment.is_enrolled && props.enrollment.test_status=='Pending'">
              Start Now
            </template>
            <template v-else-if="props.enrollment.is_enrolled && props.enrollment.test_status=='Ongoing'">
              Resument Test
            </template>
            <template v-else-if="props.enrollment.is_enrolled && props.enrollment.test_status=='Completed'">
              View Test Report
            </template>
            <template v-else-if="props.enrollment.is_enrolled && props.enrollment.test_status=='Eliminated'">
              Elimination Report
            </template>
            <template v-else>
              Take Now
            </template>
          </template>
          <template v-else>
            <template v-if="props.enrollment.is_enrolled && props.enrollment.test_status=='Pending'">
              Start Now
            </template>
            <template v-else-if="props.enrollment.is_enrolled && props.enrollment.test_status=='Ongoing'">
              Resument Test
            </template>
            <template v-else-if="props.enrollment.is_enrolled && props.enrollment.test_status=='Completed'">
              View Test Report
            </template>
            <template v-else-if="props.enrollment.is_enrolled && props.enrollment.test_status=='Eliminated'">
              View Elimination Report
            </template>
            <template v-else>
              Take Now
            </template>
          </template>
        </template>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.online-test-item{
    position: relative;
}
.online-test-item .content{
    position: static;
}
.online-test-tag{
    position:absolute;
    width:100%;
    top:0;
    left:0;
}
.online-test-tag .tag-btn{
    background-color: var(--mainColor);
    color: var(--whiteColor);
}
</style>
