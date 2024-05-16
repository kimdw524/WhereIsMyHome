<script setup>
import Checkbox from '../Common/Checkbox.vue';
</script>

<template>
  <div :class="$style.container" :style="{ width: '280px' }">
    <div :class="$style.header">부동산 종류</div>
    <div :class="$style.description">중복 선택 가능합니다.</div>
    <div :class="$style.listContainer">
      <Checkbox>아파트</Checkbox>
      <Checkbox>연립다세대</Checkbox>
    </div>
  </div>
</template>

<style module>
.container {
  padding: 0.75rem;

  box-sizing: border-box;
}

.header {
  font-size: 1.125rem;
  font-weight: 400;
}

.description {
  margin: 0.5rem 0;

  color: var(--color-light);
  font-size: 0.875rem;
  font-weight: 400;
}

.listContainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  margin: 2rem 0 1rem 0;
}
</style>
