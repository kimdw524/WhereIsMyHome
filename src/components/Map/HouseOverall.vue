<script setup>
import { toNumber } from '@/utils/utils';
import TradeHistoryOverall from './TradeHistoryOverall.vue';
import ApexCharts from 'vue3-apexcharts';

const props = defineProps({ deals: Array, fullRents: Array, rents: Array, data: Object });

const chartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    selection: {
      enabled: false,
    },
    zoom: {
      enabled: false,
    },
    animations: {
      enabled: false,
    },
    fontFamily: 'Pretendard',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
    width: 1,
  },
  xaxis: {
    type: 'datetime',
  },
  tooltip: {
    fixed: {
      enabled: false,
      position: 'topRight',
    },
  },
  legend: {
    fontSize: '14px',
  },
};
const series = [
  {
    name: '매매',
    data: props.deals.map((item) => [
      new Date(`${item.dealMonth} ${item.dealDay} ${item.dealYear} GMT`).getTime(),
      toNumber(item.dealAmount),
    ]),
    color: '#00f',
  },
  {
    name: '전세',
    data: props.fullRents.map((item) => [
      new Date(`${item.dealMonth} ${item.dealDay} ${item.dealYear} GMT`).getTime(),
      toNumber(item.deposit),
    ]),
    color: '#f00',
  },
];
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
    <ApexCharts
      width="100%"
      height="350"
      type="scatter"
      :options="chartOptions"
      :series="series"
    ></ApexCharts>
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
