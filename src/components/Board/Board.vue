<script setup>
import Pagination from '@/components/Common/Pagination.vue';
import { dateFormat } from '@/utils/utils';
import { useRouter } from 'vue-router';

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
        <th>번호</th>
        <th>제목</th>
        <th>작성자</th>
        <th>작성일</th>
        <th>조회수</th>
      </tr>
      <tr
        :key="`${slug}/${currentPage}/${index}`"
        v-for="(post, index) in posts"
        @click="$router.push(`/board/${slug}/${post.id}`)"
        :class="$style.item"
      >
        <td>{{ post.id }}</td>
        <td :class="$style.title">
          {{ post.title }}<span v-if="post.commentCount">[{{ post.commentCount }}]</span>
        </td>
        <td>{{ post.name }}</td>
        <td>{{ dateFormat(post.updatedAt) }}</td>
        <td>{{ post.viewCount }}</td>
      </tr>
    </table>
    <div :class="$style.footer">
      <Pagination :current="currentPage" :max="maxPage" @change="handlePage" />
    </div>
  </div>
</template>

<style module>
.container {
  font-weight: 400;
}

.postList {
  width: 100%;
  border-collapse: collapse;
}

.postList tr.header {
  border-left: 0.1875rem solid transparent;
}

.postList tr.item {
  border-left: 0.1875rem solid transparent;

  transition: all 100ms ease !important;

  cursor: pointer;
}

.postList tr.item:hover {
  border-left: 0.1875rem solid var(--color-primary);
}

.postList th {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.postList td {
  padding: 1.125rem 0.75rem;

  font-weight: 400;
  text-align: center;
}

.postList td.title {
  width: 60%;

  font-weight: 300;
  text-align: left;
}

.postList td.title span {
  margin-left: 0.5rem;
  font-weight: 400;
}

.postList th {
  padding: 0.875rem 0.5rem;
}

.footer {
  display: flex;
  justify-content: center;

  padding: 0.5rem 1rem;
}
</style>
