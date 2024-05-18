<script setup>
import { getMatchHome } from '@/apis/Home';
import Filter from '@/components/Common/Filter.vue';
import BuildYearFilter from '@/components/Map/BuildYearFilter.vue';
import PriceFilter from '@/components/Map/PriceFilter.vue';
import TradeFilter from '@/components/Map/TradeFilter.vue';
import TypeFilter from '@/components/Map/TypeFilter.vue';
import { onMounted, ref, watch } from 'vue';

const type = ref({ apart: true, house: true });
const trade = ref({ deal: true, fullRent: true, rent: true });
const price = ref({
  startDealAmount: 0,
  endDealAmount: 999_999_999,
  startDeposit: 0,
  endDeposit: 999_999_999,
  startRentCost: 0,
  endRentCost: 999_999_999,
});
const buildYear = ref({
  startBuildYear: 1950,
  endBuildYear: 2024,
});

let lat = 36.9836404099608,
  lng = 126.922317622367;

const condition = {
  isApart: true,
  isHouse: true,
  isDeal: true,
  isFullRent: true,
  isMonthlyRent: true,
  startDealAmount: 1000,
  endDealAmount: 300000,
  startDeposit: 200,
  endDeposit: 30000,
  startRentCost: 20,
  endRentCost: 60,
  startBuildYear: 1998,
  endBuildYear: 2018,
  startLng: lng - 0.01,
  endLng: lng + 0.01,
  startLat: lat - 0.01,
  endLat: lat + 0.01,
};

watch(
  [type, trade, price, buildYear],
  () => {
    condition.isApart = type.value.apart;
    condition.isHouse = type.value.house;
    condition.isDeal = trade.value.deal;
    condition.isFullRent = trade.value.fullRent;
    condition.isMonthlyRent = trade.value.rent;
    condition.startDealAmount = price.value.startDealAmount;
    condition.endDealAmount = price.value.endDealAmount;
    condition.startDeposit = price.value.startDeposit;
    condition.endDeposit = price.value.endDeposit;
    condition.startRentCost = price.value.startRentCost;
    condition.endRentCost = price.value.endRentCost;

    update();
  },
  { deep: true },
);

let markers = [];

let map;

const update = () => {
  if (map.getLevel() > 6) return;
  getMatchHome(condition)
    .then((result) => {
      console.log(result.data);
      markers.forEach((marker) => marker.setMap(null));
      markers = result.data.map(
        (item) =>
          new kakao.maps.Marker({
            position: new kakao.maps.LatLng(item.lat, item.lng),
          }),
      );
      markers.forEach((marker) => marker.setMap(map));
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(lat, lng),
    level: 3,
  };

  map = new kakao.maps.Map(container, options);

  kakao.maps.event.addListener(map, 'dragend', () => {
    const { ha, oa, pa, qa } = map.getBounds();
    condition.startLng = ha;
    condition.endLng = oa;
    condition.startLat = qa;
    condition.endLat = pa;
    update();
  });

  kakao.maps.event.addListener(map, 'zoom_changed', () => {
    update();
  });

  update();
});
</script>

<template>
  <Transition name="fade2" appear>
    <div :class="$style.container">
      <div :class="$style.header">
        <Filter text="아파트">
          <TypeFilter v-model="type" />
        </Filter>
        <Filter text="월세,전세,매매">
          <TradeFilter v-model="trade" />
        </Filter>
        <Filter text="가격">
          <PriceFilter v-model="price" />
        </Filter>
        <Filter text="건축년도">
          <BuildYearFilter v-model="buildYear" />
        </Filter>
      </div>
      <div :class="$style.body">
        <div :class="$style.side">side menu</div>
        <div id="map" :class="$style.map"></div>
      </div>
    </div>
  </Transition>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;

  height: 100%;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 0 0 4rem;

  padding: 0.5rem 1rem;
  border-top: 1px solid var(--map-header-border-top);
  border-bottom: 1px solid var(--map-header-border-bottom);
  box-sizing: border-box;
}

.body {
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
}

.side {
  flex: 0 0 400px;

  height: 100%;
}

.map {
  flex: 1 1 100%;

  height: 100%;
}
</style>
