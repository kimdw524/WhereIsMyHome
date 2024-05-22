<script setup>
import { getInterest, getMatchHome } from '@/apis/Home';
import Checkbox from '@/components/Common/Checkbox.vue';
import Filter from '@/components/Common/Filter.vue';
import Toggle from '@/components/Common/Toggle.vue';
import BuildYearFilter from '@/components/Map/BuildYearFilter.vue';
import HouseDetail from '@/components/Map/HouseDetail.vue';
import HouseList from '@/components/Map/HouseList.vue';
import ListHeader from '@/components/Map/ListHeader.vue';
import PriceFilter from '@/components/Map/PriceFilter.vue';
import Share from '@/components/Map/Share.vue';
import TradeFilter from '@/components/Map/TradeFilter.vue';
import TypeFilter from '@/components/Map/TypeFilter.vue';
import { useMapStore } from '@/stores/map';
import { joinText, simplePrice } from '@/utils/utils';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const mapStore = useMapStore();

let { La, Ma, level, ap, ho, td, tf, tr, sd, ed, sde, ede, sr, er, sb, eb, code } = route.query;

La = La || 126.922317622367;
Ma = Ma || 36.9836404099608;
level = level || 3;
ap = ap === 'false' ? false : true;
ho = ho === 'false' ? false : true;
td = td === 'false' ? false : true;
tf = tf === 'false' ? false : true;
tr = tr === 'false' ? false : true;
sd = isNaN(Number(sd)) ? 0 : Number(sd);
ed = isNaN(Number(ed)) ? 999_999_999 : Number(ed);
sde = isNaN(Number(sde)) ? 0 : Number(sde);
ede = isNaN(Number(ede)) ? 999_999_999 : Number(ede);
sr = isNaN(Number(sr)) ? 0 : Number(sr);
er = isNaN(Number(er)) ? 999_999_999 : Number(er);
sb = isNaN(Number(sb)) ? 0 : Number(sb);
eb = isNaN(Number(eb)) ? new Date().getFullYear() : Number(eb);
code = isNaN(Number(code)) ? 0 : Number(code);

const showPrice = ref(false);
const showTraffic = ref(false);
const type = ref({ apart: ap, house: ho });
const trade = ref({ deal: td, fullRent: tf, rent: tr });
const price = ref({
  startDealAmount: sd,
  endDealAmount: ed,
  startDeposit: sde,
  endDeposit: ede,
  startRentCost: sr,
  endRentCost: er,
});
const buildYear = ref({
  startBuildYear: sb,
  endBuildYear: eb,
});
const data = ref([]);
const sort = ref({ type: 1, asc: false });
const detail = ref(code);
const interest = ref(false);

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

watch(showTraffic, (value) => {
  if (value) map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
  else map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
});

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
  startLng: La - 0.01,
  endLng: La + 0.01,
  startLat: Ma - 0.01,
  endLat: Ma + 0.01,
};

let markers = [],
  overlays = [];
let isLoading = false,
  call = false;

let map, clusterer;

const updateData = (result) => {
  data.value = result.data.slice(0, 500);

  overlays.forEach((overlay) => overlay.setMap(null));

  markers.forEach((marker) => marker.setMap(null));
  markers = data.value.map((item) => {
    const position = new kakao.maps.LatLng(item.lat, item.lng);

    const marker = new kakao.maps.Marker({
      position,
      clickable: true,
      image: new kakao.maps.MarkerImage(
        `/src/assets/images/marker${item.houseType}.png`,
        new kakao.maps.Size(29, 42),
        {
          offset: new kakao.maps.Point(15, 42),
        },
      ),
    });

    if (map.getLevel() <= 6 && showPrice.value) {
      const overlayContent = document.createElement('div');
      const dealType = item.averageDealAmount ? 1 : item.averageDepositByFullRent ? 2 : 3;
      const dealAmount =
        item.averageDealAmount || item.averageDepositByFullRent || item.averageRentCost;
      overlayContent.className = 'overlay';
      overlayContent.style = `--dealtype-color: var(--dealtype-${dealType})`;
      overlayContent.innerHTML = `<div class="head">${
        ['매매', '전세', '월세'][dealType - 1]
      }</div><div class="body">${simplePrice(dealAmount)}</div>`;

      overlayContent.addEventListener('click', () => {
        detail.value = item.houseCode;
      });

      const overlay = new kakao.maps.CustomOverlay({
        position,
        content: overlayContent,
      });

      overlays.push(overlay);
      overlay.setMap(map);
    }

    kakao.maps.event.addListener(marker, 'click', () => {
      detail.value = item.houseCode;
    });

    return marker;
  });

  clusterer.clear();
  if (!showPrice.value) clusterer.addMarkers(markers);

  sortList(sort.value);
};

const update = () => {
  const { ha, oa, pa, qa } = map.getBounds();
  const { La, Ma } = map.getCenter();
  condition.startLng = ha;
  condition.endLng = oa;
  condition.startLat = qa;
  condition.endLat = pa;

  history.replaceState(
    history.state,
    '',
    `?La=${La}&Ma=${Ma}&level=${map.getLevel()}&ap=${type.value.apart}&ho=${type.value.house}&td=${
      trade.value.deal
    }&tf=${trade.value.fullRent}&tr=${trade.value.rent}&sd=${price.value.startDealAmount}&ed=${
      price.value.endDealAmount
    }&sde=${price.value.startDeposit}&ede=${price.value.endDeposit}&sr=${
      price.value.startRentCost
    }&er=${price.value.endRentCost}&sb=${buildYear.value.startBuildYear}&eb=${
      buildYear.value.endBuildYear
    }`,
  );

  if (interest.value) return;

  call = true;
  if (map.getLevel() > 7 || isLoading) return;
  isLoading = true;
  call = false;
  getMatchHome(condition)
    .then((result) => {
      updateData(result);
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

const handleDetail = (house) => {
  detail.value = house.houseCode;
  map.panTo(new kakao.maps.LatLng(house.lat, house.lng));
};

watch(interest, (value) => {
  if (value) {
    getInterest()
      .then((result) => {
        updateData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    update();
  }
});

onMounted(() => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(Ma, La),
    level: level,
  };

  map = new kakao.maps.Map(container, options);
  mapStore.map.value = map;

  clusterer = new kakao.maps.MarkerClusterer({
    map: map,
    averageCenter: true,
    minLevel: 2,
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
    update();
  });

  kakao.maps.event.addListener(map, 'zoom_changed', () => {
    update();
  });

  watch(
    [type, trade, price, buildYear, showPrice],
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
    { deep: true, immediate: true },
  );
});
</script>

<template>
  <Transition name="fade2" appear>
    <div :class="$style.container">
      <div :class="$style.header">
        <div>
          <Filter :text="joinText({ 아파트: type.apart, 연립다세대: type.house }) || '부동산 종류'">
            <TypeFilter v-model="type" />
          </Filter>
          <Filter
            :text="
              joinText({ 매매: trade.deal, 전세: trade.fullRent, 월세: trade.rent }) || '거래 유형'
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
          <Toggle v-model="interest">관심 매물 보기</Toggle>
        </div>
        <div :class="$style.rightMenuContainer">
          <Checkbox :style="{ fontSize: '0.875rem' }" v-model="showPrice"> 시세 표시 </Checkbox>
          <Checkbox :style="{ fontSize: '0.875rem' }" v-model="showTraffic"> 교통 정보 </Checkbox>
          <Share
            :option="{
              objectType: 'text',
              text: '부동산 지도를 공유할게요.',
              link: {
                mobileWebUrl: `location.href`,
                webUrl: `location.href`,
              },
            }"
          />
        </div>
      </div>
      <div :class="$style.body">
        <div :class="$style.side">
          <ListHeader :count="data.length" v-model="sort" />
          <HouseList :items="data" :map="map" @detail="handleDetail" />
        </div>
        <div v-if="detail" :class="$style.houseDetail">
          <HouseDetail v-model="detail" :key="detail" />
          <div :class="$style.close" @click="detail = 0">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"
              ></path>
            </svg>
          </div>
        </div>
        <div id="map" :class="$style.map"></div>
      </div>
    </div>
  </Transition>
</template>

<style>
.overlay {
  --dealtype-1: #326cf9;
  --dealtype-2: #ed362d;
  --dealtype-3: #24ab1b;

  display: flex;
  gap: 0.125rem;
  overflow: hidden;

  border: 1px solid var(--dealtype-color);
  border-radius: 0.25rem;
  box-shadow: 0 0 0.625rem 0.125rem rgba(30, 30, 30, 0.1);

  background-color: #fff;

  font-size: 0.75rem;
}

.overlay .head {
  padding: 0.25rem;

  background-color: var(--dealtype-color);

  color: #fff;
  font-weight: 600;
}

.overlay .body {
  padding: 0.25rem;

  background-color: #fff;

  color: #000;
  font-weight: 400;
}
</style>

<style module>
.container {
  display: flex;
  flex-direction: column;

  height: 100%;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex: 0 0 4rem;

  padding: 0.5rem 1rem;
  border-top: 1px solid var(--map-header-border-top);
  border-bottom: 1px solid var(--map-header-border-bottom);
  box-sizing: border-box;
}

.header > div {
  display: flex;
  gap: 0.5rem;
}

.body {
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  position: relative;

  height: calc(100vh - 11rem);
}

.side {
  flex: 0 0 400px;
  overflow-y: overlay;

  border-right: 1px solid var(--map-header-border-bottom);
  box-sizing: border-box;
}

.map {
  flex: 1 1 100%;

  height: 100%;
}

.houseDetail {
  position: absolute;
  left: 400px;
  z-index: 10;

  height: 100%;
  border-right: 1px solid var(--map-header-border-bottom);

  background-color: var(--bg);
}

.close {
  position: absolute;
  top: 1rem;
  right: 1rem;

  width: 2rem;
  height: 2rem;

  cursor: pointer;
}

.rightMenuContainer {
  display: flex;
  gap: 1rem !important;
}
</style>
