<script setup>
const props = defineProps({ query: String });
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <span>'{{ props.query }}'</span>에 대한 검색 결과
    </div>
    <div :class="$style.empty">검색 결과가 존재하지 않습니다.</div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;

  padding: 1rem;
  box-sizing: border-box;
}

.header {
  margin-bottom: 1rem;

  font-size: 1.125rem;
  font-weight: 500;
}

.header span {
  margin-right: 0.125rem;

  letter-spacing: 1px;
}

.empty {
  font-size: 1rem;
  font-weight: 300;
}
</style>
