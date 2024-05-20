<script setup>
import { dealNumberFormat } from '@/utils/utils';
import TypeLabel from '../MainSearch/TypeLabel.vue';
const props = defineProps({ items: Array, map: Object });
const emit = defineEmits(['detail']);
let overlay;

const handleMouseOver = (item) => {
  overlay?.setMap(null);
  overlay = new kakao.maps.CustomOverlay({
    position: new kakao.maps.LatLng(item.lat, item.lng),
    content: `<div class="houseOverlay${item.houseType === 1 ? ' apart' : ''}"></div>`,
    yAnchor: 1,
  });
  overlay.setMap(props.map);
};

const handleMouseOut = () => {
  overlay?.setMap(null);
};
</script>

<template>
  <div
    v-for="item in items"
    :key="item.houseCode"
    :class="$style.container"
    @click="() => emit('detail', item.houseCode)"
    @mouseover="() => handleMouseOver(item)"
    @mouseout="handleMouseOut"
  >
    <div :class="$style.header">
      <TypeLabel :type="item.houseType" />
      <div :class="$style.houseName">{{ item.houseName }}</div>
    </div>
    <div :class="$style.tradeContainer">
      <div v-if="item.averageDealAmount" :class="$style.tradeAverage">
        매매 평균가 <span>{{ dealNumberFormat(item.averageDealAmount) }}</span>
      </div>
      <div v-if="item.averageDepositByFullRent" :class="$style.tradeAverage">
        전세 평균가 <span>{{ dealNumberFormat(item.averageDepositByFullRent) }}</span>
      </div>
      <div v-if="item.averageDepositByMonthlyRent" :class="$style.tradeAverage">
        월세 평균가
        <span>
          {{
            `${dealNumberFormat(item.averageDepositByMonthlyRent)} / ${dealNumberFormat(
              item.averageRentCost,
            )}`
          }}
        </span>
      </div>
    </div>
    <div :class="$style.detail">
      <span>{{ item.roadName }}</span>
    </div>
    <div :class="$style.footer">
      <div :class="$style.detail">
        건축년도 <span>{{ item.buildYear }}년</span>
      </div>
      <div :class="$style.detail">
        거래량 <span>{{ item.dealNum }}건</span>
      </div>
    </div>
  </div>
</template>

<style>
.houseOverlay {
  position: relative;

  width: 4rem;
  height: 4rem;
  border: 1px solid rgb(8, 173, 2);
  border-radius: 50%;

  background-color: rgba(8, 173, 2, 0.33);
}

.houseOverlay.apart {
  border: 1px solid rgb(2, 56, 173);
  background-color: rgba(2, 56, 173, 0.33);
}
</style>

<style module>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1rem;
  border-bottom: 1px solid var(--map-houselist-border);

  transition: all 100ms ease;

  cursor: pointer;
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

.footer {
  display: flex;
  gap: 0.5rem;
}
</style>
