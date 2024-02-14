<script setup lang="ts">
import type { BranchType, AchieverCategory } from '../utils/types'
const props = defineProps({
  branch_data: {
    type: Array<BranchType>,
    default: []
  },
  achiver_category: {
    type: Array<AchieverCategory>,
    default: []
  },
  achiever_category_pending: {
    type: Boolean,
    default: true
  },
  branch_pending: {
    type: Boolean,
    default: true
  }
})
const { status, signOut } = useAuth()
const drawer = useState<boolean>('drawer')

const logout = async () => await signOut()
</script>

<template>
  <el-drawer
    v-model="drawer"
    title="Arjunaa Academy for Achievers"
    size="80%"
    direction="rtl"
  >
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-menu-item index="1">
        <NuxtLink noPrefetch to="/" aria-label="home page">
          <i class="el-icon-s-home" />
          <span>Home</span>
        </NuxtLink>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <i class="el-icon-reading" />
          <span>Courses</span>
        </template>
        <el-sub-menu
          v-for="(item, i) in props.branch_data"
          :key="i"
          :index="`1-${i}`"
        >
          <template
            v-if="
              !props.branch_pending && props.branch_data && props.branch_data.length > 0
            "
            #title
          >
            <p>{{ item.name }}</p>
          </template>
          <el-sub-menu :index="`1-${i}-1`">
            <template #title>
              School
            </template>
            <template v-for="(it, index) in item.courses" :key="index">
              <NuxtLink
                v-if="it.class == 'School (STD VIII to X)'"
                noPrefetch
                :aria-label="it.name"
                :to="`/${item.slug}/courses/${it.slug}`"
              >
                <el-menu-item :index="`1-${i}-3-${index}`">
                  <span>{{ it.name }}</span>
                </el-menu-item>
              </NuxtLink>
            </template>
          </el-sub-menu>
          <el-sub-menu :index="`1-${i}-2`">
            <template #title>
              Senior Secondary
            </template>
            <template v-for="(it, index) in item.courses" :key="index">
              <NuxtLink
                v-if="it.class == 'Senior Secondary (XI, XII, PU)'"
                noPrefetch
                :aria-label="it.name"
                :to="`/${item.slug}/courses/${it.slug}`"
              >
                <el-menu-item :index="`1-${i}-3-${index}`">
                  <span>{{ it.name }}</span>
                </el-menu-item>
              </NuxtLink>
            </template>
          </el-sub-menu>
          <el-sub-menu :index="`1-${i}-3`">
            <template #title>
              Online
            </template>
            <template v-for="(it, index) in item.courses" :key="index">
              <NuxtLink
                v-if="it.class == 'Online'"
                noPrefetch
                :aria-label="it.name"
                :to="`/${item.slug}/courses/${it.slug}`"
              >
                <el-menu-item :index="`1-${i}-3-${index}`">
                  <span>{{ it.name }}</span>
                </el-menu-item>
              </NuxtLink>
            </template>
          </el-sub-menu>
        </el-sub-menu>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <i class="el-icon-school" />
          <span>About Us</span>
        </template>
        <NuxtLink noPrefetch to="/mission-vision" aria-label="mission & vision page">
          <el-menu-item index="3-1">
            Mission & Vision
          </el-menu-item>
        </NuxtLink>
        <NuxtLink
          noPrefetch
          to="/leadership-team"
          aria-label="leadership team & faculty page"
        >
          <el-menu-item index="3-2">
            Leadership Team & Faculty
          </el-menu-item>
        </NuxtLink>
        <NuxtLink noPrefetch to="/testimonial" aria-label="testimonial page">
          <el-menu-item index="3-3">
            Testimonial
          </el-menu-item>
        </NuxtLink>
        <NuxtLink noPrefetch to="/careers" aria-label="careers page">
          <el-menu-item index="3-4">
            Careers
          </el-menu-item>
        </NuxtLink>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <i class="el-icon-trophy" />
          <span>Achievers</span>
        </template>
        <NuxtLink
          v-for="(item, i) in props.achiver_category"
          :key="i"
          noPrefetch
          :to="`/achievers/${item.slug}`"
          :aria-label="item.name"
        >
          <template
            v-if="
              !props.achiever_category_pending &&
                props.achiver_category.length > 0
            "
          >
            <el-menu-item :index="`4-${i + 1}`">
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </NuxtLink>
      </el-sub-menu>
      <el-sub-menu index="5">
        <template #title>
          <i class="el-icon-notebook-2" />
          <span>Knowledge Desk</span>
        </template>
        <NuxtLink noPrefetch to="/knowledge-desk" aria-label="blogs page">
          <el-menu-item index="5-1">
            Blogs
          </el-menu-item>
        </NuxtLink>
        <NuxtLink noPrefetch to="/expert-tips" aria-label="expert tips page">
          <el-menu-item index="5-2">
            Expert Tips
          </el-menu-item>
        </NuxtLink>
        <NuxtLink noPrefetch to="/online-tests" aria-label="online test page">
          <el-menu-item index="5-5">
            Online Tests
          </el-menu-item>
        </NuxtLink>
        <NuxtLink noPrefetch to="/faq" aria-label="tips page">
          <el-menu-item index="5-3">
            Faq
          </el-menu-item>
        </NuxtLink>
        <NuxtLink noPrefetch to="/vrddhi" aria-label="vrddhi page">
          <el-menu-item index="5-4">
            Vrddhi
          </el-menu-item>
        </NuxtLink>
      </el-sub-menu>
      <el-menu-item index="6">
        <NuxtLink noPrefetch to="/events" aria-label="upcoming events page">
          <i class="el-icon-data-analysis" />
          <span>Upcoming Events</span>
        </NuxtLink>
      </el-menu-item>
      <el-menu-item index="7">
        <NuxtLink noPrefetch to="/contact-us" aria-label="contact us page">
          <i class="el-icon-service" />
          <span>Contact Us</span>
        </NuxtLink>
      </el-menu-item>
      <el-menu-item v-if="status === 'unauthenticated'" index="8">
        <NuxtLink noPrefetch to="/auth/sign-in" aria-label="sign in page">
          <i class="el-icon-user" />
          <span>Sign In</span>
        </NuxtLink>
      </el-menu-item>
      <el-sub-menu v-else-if="status === 'authenticated'" index="9">
        <template #title>
          <i class="el-icon-user" />
          <span>Account</span>
        </template>
        <NuxtLink noPrefetch to="/profile" aria-label="profile page">
          <el-menu-item index="9-1">
            Profile
          </el-menu-item>
        </NuxtLink>
        <el-menu-item
          index="9-2"
          aria-label="logout page"
          @click="logout"
        >
          Logout
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-drawer>
</template>
