<script setup>
import Pagination from '@/components/Common/Pagination.vue';
import { dateFormat } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Button from '../Common/Button.vue';

const router = useRouter();

const props = defineProps({
  slug: String,
  posts: Array,
  currentPage: Number,
  maxPage: Number,
});

const handlePage = (page) => {
  router.replace(`?page=${page}`);
};
</script>

<template>
  <div :class="$style.container">
    <table :class="$style.postList">
      <tr :class="$style.header">
        <th>제목</th>
        <th>작성자</th>
        <th>작성일</th>
        <th>조회수</th>
      </tr>
      <tr :key="`${slug}/${currentPage}/${index}`" v-for="(post, index) in posts">
        <td :class="$style.title">{{ post.title }}</td>
        <td>{{ post.name }}</td>
        <td>{{ dateFormat(post.updatedAt) }}</td>
        <td>{{ post.viewCount }}</td>
      </tr>
    </table>
    <div :class="$style.footer">
      <div>
        <Button size="sm">글쓰기</Button>
      </div>
      <div>
        <Pagination :current="currentPage" :max="maxPage" @change="handlePage" />
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  overflow: hidden;

  border-radius: 0.25rem;
  box-shadow: 0 0 0.125rem 0rem rgba(60, 60, 60, 0.5);

  font-weight: 400;
}

.postList {
  width: 100%;
  border-collapse: collapse;
}

.postList tr {
  border-bottom: 1px solid #e7e7e7;

  transition: all 100ms ease !important;
}

.postList tr:hover {
  background-color: rgb(247, 251, 255);
}

.postList tr.header {
  background-color: var(--postlist-header-bg);

  color: #000000;
}

.postList th {
  font-weight: 400;
}

.postList td {
  padding: 1rem 0.75rem;

  font-weight: 400;
  text-align: center;
}

.postList td.title {
  width: 60%;

  font-weight: 500;
  text-align: left;
}

.postList th {
  padding: 0.875rem 0.5rem;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.5rem 1rem;

  background-color: var(--postlist-header-bg);
}
</style>
