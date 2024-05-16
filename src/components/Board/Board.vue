<script setup>
import Pagination from '@/components/Common/Pagination.vue';
import PostContainer from './PostContainer.vue';
import PostList from './PostList.vue';
import Category from './Category.vue';

const props = defineProps({
  slug: String,
  posts: Array,
  currentPage: Number,
  maxPage: Number,
});

const menu = [
  { name: '공지사항', slug: 'notice' },
  { name: 'Q&A', slug: 'qna' },
];

const current = menu.find((item) => item.slug === props.slug);

const handleSearch = (value) => {
  console.log(value);
};
</script>

<template>
  <div :class="$style.container">
    <Category :menu="menu" :current="current.slug" />
    <PostContainer :title="current.name" @search="handleSearch">
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
  </div>
</template>

<style module>
.container {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
