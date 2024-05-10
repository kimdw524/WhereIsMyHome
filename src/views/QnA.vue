<script setup>
import PostContainer from '@/components/Post/PostContainer.vue';
import PostList from '@/components/Post/PostList.vue';

const posts = [
  {
    id: 1,
    title: '양규현?',
    content: '안했습니다.',
    name: '양규현1',
    viewCount: 100,
    updatedAt: 1715304681,
  },
  {
    id: 2,
    title: '양규현?1111',
    content: '안했습니다.',
    name: '양규현2',
    viewCount: 120,
    updatedAt: 1715305081,
  },
  {
    id: 3,
    title: '양규현?2222',
    content: '안했습니다.',
    name: '양규현3',
    viewCount: 147,
    updatedAt: 1715308781,
  },
  {
    id: 4,
    title: '양규현?3333',
    content: '안했습니다.',
    name: '양규현4',
    viewCount: 147,
    updatedAt: 1715808781,
  },
  {
    id: 5,
    title: '양규현?4444',
    content: '안했습니다.',
    name: '양규현5',
    viewCount: 210,
    updatedAt: 1715908781,
  },
];
</script>

<template>
  <Transition name="fade2" appear>
    <div :class="$style.container">
      <PostContainer title="질문과 답변">
        <Transition
          :key="post.id"
          v-for="(post, index) in posts"
          name="fade2"
          :style="{ 'transition-duration': `${(index + 1) * 100}ms` }"
          appear
        >
          <PostList :data="post" />
        </Transition>
      </PostContainer>
    </div>
  </Transition>
</template>

<style module>
.container {
  padding: 2rem;
}
</style>
