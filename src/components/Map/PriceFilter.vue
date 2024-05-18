<script setup>
import { ref, watch } from 'vue';
import Range from '../Common/Range.vue';
import Formatter from '@/utils/formatter';

const model = defineModel();

const highPrice = [];
const lowPrice = [];

for (let i = 0; i <= 4; i++)
  highPrice.push({ value: i * 100, name: `${Formatter.moneyFormat(i * 1_000_000)}` });
for (let i = 5; i <= 45; i += 5)
  highPrice.push({ value: i * 100, name: `${Formatter.moneyFormat(i * 1_000_000)}` });
for (let i = 50; i <= 95; i += 10)
  highPrice.push({ value: i * 100, name: `${Formatter.moneyFormat(i * 1_000_000)}` });
for (let i = 100; i <= 950; i += 50)
  highPrice.push({ value: i * 100, name: `${Formatter.moneyFormat(i * 1_000_000)}` });
for (let i = 1000; i <= 2400; i += 100)
  highPrice.push({ value: i * 100, name: `${Formatter.moneyFormat(i * 1_000_000)}` });
for (let i = 2500; i <= 5000; i += 500)
  highPrice.push({ value: i * 100, name: `${Formatter.moneyFormat(i * 1_000_000)}` });

highPrice.push({ value: 999_999_999, name: '' });
highPrice[0].name = '0원';
highPrice[highPrice.length - 1].name = '전체';

for (let i = 0; i <= 9; i++)
  lowPrice.push({ value: i * 5, name: `${Formatter.moneyFormat(i * 50_000)}` });
for (let i = 10; i <= 18; i += 2)
  lowPrice.push({ value: i * 5, name: `${Formatter.moneyFormat(i * 50_000)}` });
for (let i = 20; i <= 90; i += 10)
  lowPrice.push({ value: i * 5, name: `${Formatter.moneyFormat(i * 50_000)}` });
for (let i = 100; i <= 200; i += 20)
  lowPrice.push({ value: i * 5, name: `${Formatter.moneyFormat(i * 50_000)}` });

lowPrice.push({ value: 999_999_999, name: '' });
lowPrice[0].name = '0원';
lowPrice[lowPrice.length - 1].name = '전체';

const dealRange = ref([
  Math.max(
    0,
    highPrice.findIndex((item) => item.value === model.value.startDealAmount),
  ),
  Math.max(
    0,
    Math.min(
      highPrice.length - 1,
      highPrice.findIndex((item) => item.value === model.value.endDealAmount),
    ),
  ),
]);

const depositRange = ref([
  Math.max(
    0,
    highPrice.findIndex((item) => item.value === model.value.startDeposit),
  ),
  Math.max(
    0,
    Math.min(
      highPrice.length - 1,
      highPrice.findIndex((item) => item.value === model.value.endDeposit),
    ),
  ),
]);

const rentRange = ref([
  Math.max(
    0,
    lowPrice.findIndex((item) => item.value === model.value.startRentCost),
  ),
  Math.max(
    0,
    Math.min(
      lowPrice.length - 1,
      lowPrice.findIndex((item) => item.value === model.value.endRentCost),
    ),
  ),
]);

watch(dealRange, (value) => {
  model.value.startDealAmount = highPrice[Math.min(...value)].value;
  model.value.endDealAmount = highPrice[Math.max(...value)].value;
});

watch(depositRange, (value) => {
  model.value.startDeposit = highPrice[Math.min(...value)].value;
  model.value.endDeposit = highPrice[Math.max(...value)].value;
});

watch(rentRange, (value) => {
  model.value.startRentCost = lowPrice[Math.min(...value)].value;
  model.value.endRentCost = lowPrice[Math.min(...value)].value;
});
</script>

<template>
  <div :class="$style.wrapper" :style="{ width: '300px' }">
    <div :class="$style.container">
      <Range title="매매가" v-model="dealRange" :items="highPrice" />
      <Range title="전세가 / 보증금" v-model="depositRange" :items="highPrice" />
      <Range title="월세" v-model="rentRange" :items="lowPrice" />
    </div>
  </div>
</template>

<style module>
.wrapper {
  display: flex;
  align-items: center;

  padding: 0.75rem;
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}
</style>
