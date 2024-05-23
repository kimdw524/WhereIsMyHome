<script setup>
import { getBoardList } from '@/apis/Board';
import Board from '@/components/Board/Board.vue';
import Write from '@/components/Svg/Write.vue';
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

const currentPage = ref(1);
const maxPage = ref(1);
const writable = ref(true);
const board = ref('');

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
      writable.value = user.isLoggedIn;
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
  <div :class="$style.top">
    <div :class="$style.header">
      <div :class="$style.title">{{ current.name }}</div>
      <div>
        <div
          v-if="writable"
          :class="$style.write"
          @click="$router.push(`/board/write/${current.slug}`)"
        >
          <Write />
        </div>
      </div>
    </div>
  </div>
  <div :class="$style.wrapper">
    <Transition :key="current.slug" name="fade2" appear>
      <div :class="$style.container">
        <div :class="$style.boardContainer">
          <Board
            :slug="current.slug"
            :currentPage="currentPage"
            :key="board"
            :maxPage="maxPage"
            :posts="posts"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style module>
.top {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid var(--map-header-border-top);
}

.header {
  display: flex;
  justify-content: space-between;

  max-width: 1024px;
  margin: 0 auto;
}

.wrapper {
  padding: 1.5rem 0;
  box-sizing: border-box;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 2px;
}

.container {
  max-width: 1024px;
  margin: 0 auto;
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

.write {
  width: 2rem;
  height: 2rem;

  transition: all 150ms ease;

  cursor: pointer;
}

.write:hover {
  color: var(--color-primary);
}

.write:active {
  transform: scale(0.95);
}
</style>
