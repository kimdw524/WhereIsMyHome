<script setup>
import Formatter from '@/utils/formatter';
import TypeLabel from '../MainSearch/TypeLabel.vue';
const props = defineProps({ items: Array });
</script>

<template>
  <div v-for="item in items" :key="item.houseCode" :class="$style.container">
    <div :class="$style.header">
      <TypeLabel :type="item.houseType" />
      <div :class="$style.houseName">{{ item.houseName }}</div>
    </div>
    <div :class="$style.tradeContainer">
      <div v-if="item.averageDealAmount" :class="$style.tradeAverage">
        매매 평균가 <span>{{ Formatter.dealNumberFormat(item.averageDealAmount) }}</span>
      </div>
      <div v-if="item.averageDepositByFullRent" :class="$style.tradeAverage">
        전세 평균가 <span>{{ Formatter.dealNumberFormat(item.averageDepositByFullRent) }}</span>
      </div>
      <div v-if="item.averageDepositByMonthlyRent" :class="$style.tradeAverage">
        월세 평균가
        <span>
          {{
            `${Formatter.dealNumberFormat(
              item.averageDepositByMonthlyRent,
            )} / ${Formatter.dealNumberFormat(item.averageRentCost)}`
          }}
        </span>
      </div>
    </div>
    <div :class="$style.detail">
      <span>{{ item.roadName }}</span>
    </div>
    <div :class="$style.detail">
      건축년도 <span>{{ item.buildYear }}년</span>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1rem;
  border-bottom: 1px solid var(--map-houselist-border);

  transition: all 100ms ease;

  cursor: pointer;
  user-select: none;
}

.container:hover {
  background-color: var(--map-houselist-bg-hover);
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

.tradeAverage {
  color: var(--color-primary);
  font-weight: 500;
}

.tradeAverage span {
  color: var(--color);
  font-weight: 500;
}

.tradeContainer {
  line-height: 162.5%;
}
</style>
