<script setup>
import Pagination from '@/components/Common/Pagination.vue';
import PostList from './PostList.vue';

const props = defineProps({
  slug: String,
  posts: Array,
  currentPage: Number,
  maxPage: Number,
});
</script>

<template>
  <div>
    <Transition
      :key="post.id"
      v-for="(post, index) in posts"
      name="fade2"
      :style="{ 'transition-duration': `${(index + 1) * 100}ms` }"
      appear
    >
      <PostList :data="post" />
    </Transition>
  </div>

  <Pagination :current="currentPage" :max="maxPage" />
</template>
