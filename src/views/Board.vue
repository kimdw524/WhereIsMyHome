<script setup>
import Board from '@/components/Board/Board.vue';
import Category from '@/components/Board/Category.vue';
import Button from '@/components/Common/Button.vue';
import Pagination from '@/components/Common/Pagination.vue';
import Select from '@/components/Common/Select.vue';
import TextField from '@/components/Common/TextField.vue';
import { ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const menu = [
  { name: '공지사항', slug: 'notice' },
  { name: 'Q&A', slug: 'qna' },
];

const current = ref(menu.find((item) => item.slug === route.params.name));

const searchType = ref(1);
const query = ref('');

watch(
  current,
  (value) => {
    if (!value) {
      router.push('/home');
    }
  },
  { immediate: true },
);

const handleSearch = () => {
  console.log(searchType.value, query.value);
};

onBeforeRouteUpdate((updateGuard) => {
  current.value = menu.find((item) => item.slug === updateGuard.params.name);
});

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
  <div v-if="current" :class="$style.container">
    <div :class="$style.header">
      <Category :menu="menu" :current="current.slug" />
      <div :class="$style.subHeader">
        <div :class="$style.title">{{ current.name }}</div>
        <form @submit.prevent="handleSearch">
          <div :class="$style.searchContainer">
            <Select style="width: 12rem" v-model.number="searchType">
              <option value="1">전체</option>
              <option value="2">제목</option>
              <option value="3">내용</option>
            </Select>
            <TextField v-model="query" placeholder="검색어를 입력해 주세요." />
            <Button type="submit" style="flex-shrink: 0">검색</Button>
          </div>
        </form>
      </div>
    </div>
    <div :class="$style.boardContainer">
      <Board :slug="current.slug" :currentPage="1" :maxPage="10" :posts="posts" />
    </div>
  </div>
</template>

<style module>
.container {
  max-width: 1024px;
  margin: 0 auto;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 0;

  background-color: var(--bg);
}

.subHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1.5rem 1rem 2rem 1rem;

  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 80%, rgba(255, 255, 255, 0) 100%);

  @media (max-width: 768px) {
    align-items: center;
    flex-direction: column;
    gap: 1.5rem;
  }
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.searchContainer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;

  width: 500px;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.boardContainer {
  margin-bottom: 1rem;
  padding: 0 1rem;
}
</style>
