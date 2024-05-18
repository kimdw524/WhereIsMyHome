<script setup>
import { getMatchHome } from '@/apis/Home';
import Filter from '@/components/Common/Filter.vue';
import HouseList from '@/components/Map/HouseList.vue';
import ListHeader from '@/components/Map/ListHeader.vue';
import BuildYearFilter from '@/components/Map/BuildYearFilter.vue';
import PriceFilter from '@/components/Map/PriceFilter.vue';
import TradeFilter from '@/components/Map/TradeFilter.vue';
import TypeFilter from '@/components/Map/TypeFilter.vue';
import { onMounted, ref, watch } from 'vue';
import Formatter from '@/utils/formatter';
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
const data = ref([]);
const sort = ref({ type: 1, asc: false });

const sortList = (value) => {
  switch (value.type) {
    case 1: {
      data.value.sort((a, b) => {
        if (value.asc) return a.dealNum - b.dealNum;
        else return b.dealNum - a.dealNum;
      });
      break;
    }
    case 2: {
      data.value.sort((a, b) => {
        const aa =
            parseFloat(a.averageDealAmount) ||
            parseFloat(a.averageDepositByFullRent) ||
            parseFloat(a.averageDepositByMonthlyRent),
          bb =
            parseFloat(b.averageDealAmount) ||
            parseFloat(b.averageDepositByFullRent) ||
            parseFloat(b.averageDepositByMonthlyRent);
        if (value.asc) return aa - bb;
        else return bb - aa;
      });
      break;
    }
    case 3: {
      data.value.sort((a, b) => {
        if (value.asc) return a.buildYear - b.buildYear;
        else return b.buildYear - a.buildYear;
      });
      break;
    }
    default:
  }
};

watch(sort, (value) => {
  sortList(value);
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
    condition.startBuildYear = buildYear.value.startBuildYear;
    condition.endBuildYear = buildYear.value.endBuildYear;

    update();
  },
  { deep: true },
);

let markers = [];
let isLoading = false,
  call = false;

let map, clusterer;

const update = () => {
  call = true;
  if (map.getLevel() > 7 || isLoading) return;
  isLoading = true;
  call = false;
  getMatchHome(condition)
    .then((result) => {
      data.value = result.data;
      markers.forEach((marker) => marker.setMap(null));
      markers = result.data.map(
        (item) =>
          new kakao.maps.Marker({
            position: new kakao.maps.LatLng(item.lat, item.lng),
          }),
      );

      clusterer.clear();
      clusterer.addMarkers(markers);

      sortList(sort.value);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      isLoading = false;
      if (call) {
        update();
      }
    });
};

onMounted(() => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(lat, lng),
    level: 3,
  };

  map = new kakao.maps.Map(container, options);

  clusterer = new kakao.maps.MarkerClusterer({
    map: map,
    averageCenter: true,
    minLevel: 5,
    calculator: [10, 30, 50],
    styles: [
      {
        width: '30px',
        height: '30px',
        background: 'rgba(51, 88, 255, .8)',
        borderRadius: '15px',
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: '31px',
      },
      {
        width: '40px',
        height: '40px',
        background: 'rgba(51, 88, 255, .8)',
        borderRadius: '20px',
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: '41px',
      },
      {
        width: '50px',
        height: '50px',
        background: 'rgba(235, 80, 2, .8)',
        borderRadius: '25px',
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: '51px',
      },
      {
        width: '60px',
        height: '60px',
        background: 'rgba(235, 80, 2, .8)',
        borderRadius: '30px',
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: '61px',
      },
    ],
  });

  kakao.maps.event.addListener(map, 'dragend', () => {
    const { ha, oa, pa, qa } = map.getBounds();
    condition.startLng = ha;
    condition.endLng = oa;
    condition.startLat = qa;
    condition.endLat = pa;
    console.log(map.getBounds());
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
        <Filter
          :text="
            Formatter.joinText({ 아파트: type.apart, 연립다세대: type.house }) || '부동산 종류'
          "
        >
          <TypeFilter v-model="type" />
        </Filter>
        <Filter
          :text="
            Formatter.joinText({ 매매: trade.deal, 전세: trade.fullRent, 월세: trade.rent }) ||
            '거래 유형'
          "
        >
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
        <div :class="$style.side">
          <ListHeader :count="data.length" v-model="sort" />
          <HouseList :items="data" />
        </div>
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

  height: calc(100vh - 11rem);
}

.side {
  flex: 0 0 400px;
  overflow-y: auto;

  border-right: 1px solid var(--map-list-header-border);
}

.map {
  flex: 1 1 100%;

  height: 100%;
}
</style>
