<script setup>
import Board from '@/components/Board/Board.vue';

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
  {
    id: 6,
    title: '양규현?4444',
    content: '안했습니다.',
    name: '양규현5',
    viewCount: 210,
    updatedAt: 1715908781,
  },
  {
    id: 7,
    title: '양규현?4444',
    content: '안했습니다.',
    name: '양규현5',
    viewCount: 210,
    updatedAt: 1715908781,
  },
  {
    id: 8,
    title: '양규현?4444',
    content: '안했습니다.',
    name: '양규현5',
    viewCount: 210,
    updatedAt: 1715908781,
  },
  {
    id: 9,
    title: '양규현?4444',
    content: '안했습니다.',
    name: '양규현5',
    viewCount: 210,
    updatedAt: 1715908781,
  },
  {
    id: 10,
    title: '양규현?4444',
    content: '안했습니다.',
    name: '양규현5',
    viewCount: 210,
    updatedAt: 1715908781,
  },
  {
    id: 11,
    title: '양규현?5555',
    content: '안했습니다.',
    name: '양규현5',
    viewCount: 210,
    updatedAt: 1715908781,
  },
  {
    id: 12,
    title: '양규현?6666',
    content: '안했습니다.',
    name: '양규현5',
    viewCount: 210,
    updatedAt: 1715908781,
  },
  {
    id: 13,
    title: '양규현?777',
    content: '안했습니다.',
    name: '양규현5',
    viewCount: 210,
    updatedAt: 1715908781,
  },
  {
    id: 14,
    title: '양규현?8888',
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
      <Board title="질문과 답변" :currentPage="1" :maxPage="5" :posts="posts" />
    </div>
  </Transition>
</template>

<style module>
.container {
  padding: 1rem;
}
</style>
