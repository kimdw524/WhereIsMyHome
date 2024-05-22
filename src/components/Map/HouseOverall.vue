<script setup>
import { simplePrice, toNumber } from '@/utils/utils';
import TradeHistoryOverall from './TradeHistoryOverall.vue';
import ApexCharts from 'vue3-apexcharts';
import Bank from '@/components/Svg/Bank.vue';
import Store from '@/components/Svg/Store.vue';
import Cafe from '@/components/Svg/Cafe.vue';
import Oil from '@/components/Svg/Oil.vue';
import Medicine from '@/components/Svg/Medicine.vue';
import Mart from '@/components/Svg/Mart.vue';
import Place from './Place.vue';

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
    foreColor: 'var(--color)',
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
  yaxis: {
    labels: {
      formatter: (value) => simplePrice(value),
    },
  },
};

const series = [
  {
    name: '매매',
    data: props.deals.map((item) => [
      new Date(`${item.dealMonth} ${item.dealDay} ${item.dealYear} GMT`).getTime(),
      toNumber(item.dealAmount),
    ]),
    color: '#165cff',
  },
  {
    name: '전세',
    data: props.fullRents.map((item) => [
      new Date(`${item.dealMonth} ${item.dealDay} ${item.dealYear} GMT`).getTime(),
      toNumber(item.deposit),
    ]),
    color: '#f44',
  },
  {
    name: '월세',
    data: props.rents.map((item) => [
      new Date(`${item.dealMonth} ${item.dealDay} ${item.dealYear} GMT`).getTime(),
      toNumber(item.rentCost),
    ]),
    color: '#28e73f',
  },
];
</script>

<template>
  <div>
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
    <div :class="$style.separator">거래가 그래프</div>
    <div :class="$style.container">
      <ApexCharts
        width="100%"
        height="350"
        type="scatter"
        :options="chartOptions"
        :series="series"
      ></ApexCharts>
    </div>
    <div :class="$style.separator">편의시설</div>
    <div :class="$style.container">
      <div :class="$style.placeContainer">
        <Place name="은행" category="BK9" :house="data.house">
          <Bank />
        </Place>
        <Place name="마트" category="MT1" :house="data.house">
          <Mart />
        </Place>
        <Place name="약국" category="PM9" :house="data.house">
          <Medicine />
        </Place>
      </div>
      <div :class="$style.placeContainer" style="margin-top: 1.5rem">
        <Place name="주유소" category="OL7" :house="data.house">
          <Oil />
        </Place>
        <Place name="카페" category="CE7" :house="data.house">
          <Cafe />
        </Place>
        <Place name="편의점" category="CS2" :house="data.house">
          <Store />
        </Place>
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
  gap: 0.875rem;

  margin-top: 1.25rem;
}

.address {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  font-size: 1rem;
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

.separator {
  position: sticky;
  top: -0.5rem;
  z-index: 30;

  padding: 0.75rem;
  border-top: 0.5rem solid var(--house-overall-separator);
  border-bottom: 0.0625rem solid var(--tab-border);

  background-color: var(--bg);

  font-weight: 500;
}

.placeContainer {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
