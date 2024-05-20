<script setup>
import Pagination from '@/components/Common/Pagination.vue';
import PostList from './PostList.vue';

const props = defineProps({
  slug: String,
  posts: Array,
  currentPage: Number,
  maxPage: Number,
});

console.log(props.posts);
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
      <Transition
        :key="post.id"
        v-for="(post, index) in posts"
        name="fade2"
        :style="{ 'transition-duration': `${Math.max((index + 1) * 100, 1000)}ms` }"
        appear
      >
        <tr>
          <td :class="$style.title">{{ post.title }}</td>
          <td>{{ post.name }}</td>
          <td>{{ post.updatedAt }}</td>
          <td>{{ post.viewCount }}</td>
        </tr>
      </Transition>
    </table>
    <div :class="$style.right">
      <Pagination :current="currentPage" :max="maxPage" />
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

.right {
  display: flex;
  justify-content: flex-end;

  padding: 0.5rem 1rem;

  background-color: var(--postlist-header-bg);
}
</style>
