<script setup>
import ListSortType from './ListSortType.vue';
const props = defineProps({ count: Number });
const model = defineModel();
</script>
<template>
  <div :class="$style.container">
    <div :class="$style.count">총 {{ count }}건</div>
    <div :class="$style.sort">
      <ListSortType :type="1" v-model="model">거래량</ListSortType>
      <ListSortType :type="2" v-model="model">가격</ListSortType>
      <ListSortType :type="3" v-model="model">건축년도</ListSortType>
    </div>
  </div>
</template>
<style module>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;

  height: 3rem;
  padding: 0 1rem;
  border-bottom: 1px solid var(--map-list-header-border);

  background-color: var(--bg);
}

.count {
  font-size: 0.875rem;
  font-weight: 500;
}

.sort {
  display: flex;
  gap: 0.5rem;

  font-size: 0.875rem;
  font-weight: 400;
}
</style>
