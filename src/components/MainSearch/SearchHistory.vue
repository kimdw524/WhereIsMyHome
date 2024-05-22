<script setup>
import { ref } from 'vue';
const clear = () => {
  localStorage.removeItem('searchHistory');
  searchHistory.value = [];
};

const searchHistory = ref(
  (JSON.parse(localStorage.getItem('searchHistory')) || []).splice(-5).reverse(),
);
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">최근 검색어</div>
    <div v-if="searchHistory.length">
      <div
        v-for="(item, index) in searchHistory"
        :key="index"
        :class="$style.item"
        @mousedown="$router.push(`/map?La=${item.La}&Ma=${item.Ma}&code=${item.code || 0}`)"
      >
        {{ item.houseName || item.location }}
      </div>
      <div :class="$style.clear" @mousedown="clear">기록 삭제</div>
    </div>
    <div v-else :class="$style.empty">최근 검색어가 없습니다.</div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
}

.header {
  padding: 1.25rem 1.25rem 0.5rem 1.25rem;

  font-size: 1.125rem;
  font-weight: 500;
}

.empty {
  padding: 1rem 1.5rem 1.5rem 1.5rem;

  font-size: 1rem;
  font-weight: 300;
}

.item {
  padding: 0.75rem 1.5rem;

  font-weight: 400;
  text-decoration: none;

  cursor: pointer;

  transition: all 100ms ease;
}

.item:hover {
  background-color: var(--search-result-bg-hover);
}

.clear {
  padding: 0.5rem 1.25rem 1.25rem 1.25rem;

  font-size: 0.875rem;
  font-weight: 300;

  cursor: pointer;
}

.clear:hover {
  text-decoration: underline;
}
</style>
