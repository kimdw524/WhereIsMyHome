<script setup>
import Pagination from '@/components/Common/Pagination.vue';
import PostContainer from './PostContainer.vue';
import PostList from './PostList.vue';

const props = defineProps({
  title: String,
  posts: Array,
  currentPage: Number,
  maxPage: Number,
});

const handleSearch = (value) => {
  console.log(value);
};
</script>

<template>
  <PostContainer :title="props.title" @search="handleSearch">
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
