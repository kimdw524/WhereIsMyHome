<script setup></script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">최근 검색어</div>
    <div :class="$style.empty">최근 검색어가 없습니다.</div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;

  margin: 1rem;
  box-sizing: border-box;
}

.header {
  margin-bottom: 1rem;

  font-size: 1.125rem;
  font-weight: 500;
}

.empty {
  font-size: 1rem;
  font-weight: 300;
}
</style>
