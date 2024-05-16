<script setup>
import Checkbox from '../Common/Checkbox.vue';
</script>

<template>
  <div :class="$style.container" :style="{ width: '250px' }">
    <div>
      <div :class="$style.header">거래 유형</div>
      <div :class="$style.description">중복 선택 가능합니다.</div>
      <div :class="$style.listContainer">
        <Checkbox>매매</Checkbox>
        <Checkbox>전세</Checkbox>
        <Checkbox>월세</Checkbox>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;

  padding: 0.75rem;
  box-sizing: border-box;
}

.header {
  font-size: 1.125rem;
  font-weight: 400;
}

.description {
  margin: 0.375rem 0;

  color: var(--color-light);
  font-size: 0.875rem;
  font-weight: 400;
}

.listContainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  height: 8rem;
}
</style>
