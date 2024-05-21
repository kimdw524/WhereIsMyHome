<script setup>
import { getBoardList } from '@/apis/Board';
import Board from '@/components/Board/Board.vue';
import Button from '@/components/Common/Button.vue';
import Select from '@/components/Common/Select.vue';
import TextField from '@/components/Common/TextField.vue';
import { useUserStore } from '@/stores/user';
import { onMounted, onUpdated, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const user = useUserStore();

const menu = [
  { name: '공지사항', slug: 'notice' },
  { name: '자유게시판', slug: 'free' },
];

const current = ref(menu.find((item) => item.slug === route.params.name));

const searchType = ref(1);
const query = ref('');
const currentPage = ref(1);
const maxPage = ref(1);
const writable = ref(true);
const board = ref('');

const handleSearch = () => {
  console.log(searchType.value, query.value);
};

const updateList = (slug) => {
  switch (slug) {
    case 'notice':
      if (!user.userData.admin) {
        writable.value = false;
      }
      getBoardList('boardNotice', currentPage.value - 1)
        .then((result) => {
          posts.value = result.data.pages.content;
          currentPage.value = result.data.pages.number + 1;
          maxPage.value = result.data.pages.totalPages;
          board.value = current.value.slug;
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case 'free':
      getBoardList('board', currentPage.value - 1)
        .then((result) => {
          posts.value = result.data.pages.content;
          currentPage.value = result.data.pages.number + 1;
          maxPage.value = result.data.pages.totalPages;
          board.value = current.value.slug;
        })
        .catch((error) => {
          console.log(error);
        });
      break;
  }
};

watch(
  current,
  (value) => {
    if (!value) {
      router.push('/home');
    }
  },
  { immediate: true },
);

onMounted(() => {
  currentPage.value = parseInt(route.query.page || 1);
  updateList(current.value.slug);
});

onUpdated(() => {
  currentPage.value = parseInt(route.query.page || 1);
  updateList(current.value.slug);
});

onBeforeRouteUpdate((updateGuard) => {
  current.value = menu.find((item) => item.slug === updateGuard.params.name);
});

const posts = ref([]);
</script>

<template>
  <Transition :key="current.slug" name="fade2" appear>
    <div :class="$style.container">
      <div :class="$style.header">
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
        <Board
          :slug="current.slug"
          :currentPage="currentPage"
          :key="board"
          :maxPage="maxPage"
          :posts="posts"
          :writable="writable"
        />
      </div>
    </div>
  </Transition>
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
}

.subHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1.5rem 1rem 2rem 1rem;

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
