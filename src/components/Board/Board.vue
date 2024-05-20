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
  <div :class="$style.container">
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

<style module>
.container {
  padding: 0 1rem;
  border: 1px solid rgb(232, 232, 232);
  border-radius: 0.25rem;
  box-shadow: 0 0 0.25rem 0.0625rem rgba(120, 120, 120, 0.13);
}
</style>
