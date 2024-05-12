<script setup>
import PostContainer from '@/components/Post/PostContainer.vue';
import PostList from '@/components/Post/PostList.vue';
import Pagination from '@/components/Common/Pagination.vue';

const props = defineProps({
  title: String,
  posts: Array,
  currentPage: Number,
  maxPage: Number,
});
</script>

<template>
  <PostContainer :title="props.title">
    <Transition
      :key="post.id"
      v-for="(post, index) in props.posts"
      name="fade2"
      :style="{ 'transition-duration': `${(index + 1) * 100}ms` }"
      appear
    >
      <PostList :data="post" />
    </Transition>
  </PostContainer>
  <Pagination :current="props.currentPage" :max="props.maxPage" />
</template>
