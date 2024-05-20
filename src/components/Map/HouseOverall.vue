<script setup>
import TradeHistoryOverall from './TradeHistoryOverall.vue';

defineProps({ deals: Array, fullRents: Array, rents: Array, data: Object });
</script>

<template>
  <div :class="$style.container">
    <TradeHistoryOverall :deals="deals" :fullRents="fullRents" :rents="rents" />
    <div :class="$style.addressContainer">
      <div :class="$style.address">
        <div><span>지번 주소</span></div>
        <div>
          {{ `${data.house.sidoName} ${data.house.gugunName} ${data.house.dongJibun}` }}
        </div>
      </div>
      <div :class="$style.address">
        <div><span>도로명 주소</span></div>
        <div>{{ data.house.roadName }}</div>
      </div>
    </div>
    <div :class="$style.detailContainer">
      <div :class="$style.detail">
        건축년도 <span>{{ data.house.buildYear }}년</span>
      </div>
      <div :class="$style.detail">
        총 거래량 <span>{{ data.dealList.length }}건</span>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  padding: 1.25rem;
  box-sizing: border-box;
}

.addressContainer {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  margin-top: 1rem;
}

.address {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;

  font-size: 0.875rem;
  font-weight: 300;
}

.address span {
  font-weight: 500;
}

.detailContainer {
  display: flex;
  gap: 0.5rem;

  margin: 1rem 0;
}

.detail {
  font-size: 0.875rem;
  font-weight: 500;
}

.detail span {
  font-weight: 300;
}
</style>
