<script setup>
import Pagination from '@/components/Common/Pagination.vue';
import PostList from './PostList.vue';
import Category from './Category.vue';
import Button from '@/components/Common/Button.vue';
import Select from '@/components/Common/Select.vue';
import TextField from '@/components/Common/TextField.vue';
import { ref } from 'vue';

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

const searchType = ref(1);
const query = ref('');

const current = menu.find((item) => item.slug === props.slug);

const handleSearch = () => {
  console.log(searchType.value, query.value);
};
</script>

<template>
  <div :class="$style.container">
    <div>
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

      <div>
        <Transition
          :key="post.id"
          v-for="(post, index) in props.posts"
          name="fade2"
          :style="{ 'transition-duration': `${(index + 1) * 100}ms` }"
          appear
        >
          <PostList :data="post" />
        </Transition>
      </div>
    </div>

    <Pagination :current="props.currentPage" :max="props.maxPage" />
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

  padding: 1.5rem 0 2rem 0;

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
</style>
