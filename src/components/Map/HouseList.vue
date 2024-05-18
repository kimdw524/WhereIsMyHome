<script setup>
import { onUpdated } from 'vue';
import TypeLabel from '../MainSearch/TypeLabel.vue';

const props = defineProps({ items: Array });

onUpdated(() => {});
</script>

<template>
  <div v-for="item in items" :key="item.houseCode" :class="$style.container">
    <div :class="$style.header">
      <TypeLabel :type="item.houseType" />
      <div :class="$style.houseName">{{ item.houseName }}</div>
    </div>
    <div :class="$style.detail">
      <span>{{ item.roadName }}</span>
    </div>
    <div :class="$style.detail">
      건축년도 <span>{{ item.buildYear }}년</span>
    </div>
    <div :class="$style.tradeType">전세 거래 평균가 10억</div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1rem;
  border-bottom: 1px solid #ececec;

  transition: all 100ms ease;

  cursor: pointer;
  user-select: none;
}

.container:hover {
  background-color: #f0f4fa;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.houseName {
  font-size: 1rem;
  font-weight: 400;
}

.detail {
  font-size: 0.875rem;
  font-weight: 500;
}

.detail span {
  font-weight: 300;
}
</style>
