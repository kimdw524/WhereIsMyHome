<script setup>
import { dealNumberFormat, toNumber } from '@/utils/utils';
import { useRouter } from 'vue-router';

defineProps({ data: Object });
const router = useRouter();
</script>

<template>
  <div :class="$style.container" @click="router.push(`/map?code=${data.houseCode}`)">
    <div :class="$style.name">
      {{ data.houseName }}
    </div>
    <div :class="$style.roadName">
      {{ data.roadName }}
    </div>
    <div v-if="data.averageDealAmount" :class="$style.price">
      <span>매매</span> {{ dealNumberFormat(toNumber(data.averageDealAmount)) }}
    </div>
    <div v-else-if="data.averageDepositByFullRent" :class="$style.price">
      <span>전세</span> {{ dealNumberFormat(toNumber(data.averageDepositByFullRent)) }}
    </div>
    <div v-else-if="data.averageDepositByMonthlyRent" :class="$style.price">
      <span>월세</span> {{ dealNumberFormat(toNumber(data.averageDepositByMonthlyRent)) }} /
      {{ dealNumberFormat(toNumber(data.averageRentCost)) }}
    </div>
  </div>
</template>

<style module>
.container {
  width: 16rem;
  padding: 1rem;
  box-sizing: border-box;

  border: 1px solid var(--card-border-color);

  cursor: pointer;
  user-select: none;
}

.container:hover {
  background-color: var(--map-houselist-bg-hover);
}

.name {
  font-weight: 600;
}

.price {
  margin-top: 0.5rem;

  font-size: 1.125rem;
  font-weight: 400;
}

.price span {
  color: var(--color-primary);
  font-weight: 600;
}

.roadName {
  margin: 0.5rem 0;

  font-size: 0.875rem;
  font-weight: 300;
}
</style>
