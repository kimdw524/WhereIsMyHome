<script setup>
import PopularHouseItem from './PopularHouseItem.vue';
import { getMatchHome } from '@/apis/Home';
import { onMounted, ref } from 'vue';

const model = defineModel();
const isSupported = 'geolocation' in navigator;
const wrapper = ref(null);
const currentPosition = ref(null);
const items = ref([]);
const cardWidth = 16 * 17;
let current = 0;

const getDong = (lat, lng) => {
  const geocoder = new kakao.maps.services.Geocoder();
  geocoder.coord2Address(lng, lat, (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const temp = result[0].address.address_name.split(' ');
      model.value = `${temp[1]} ${temp[2]}`;
    }
  });
};

const getPosition = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude,
      lng = position.coords.longitude;

    currentPosition.value = { lat, lng };
    getDong(lat, lng);
    getPopularHouse(lat, lng);
  });
};

const getPopularHouse = (lat, lng) => {
  const condition = {
    isApart: true,
    isHouse: true,
    isDeal: true,
    isFullRent: true,
    isMonthlyRent: true,
    startDealAmount: 0,
    endDealAmount: 999_999_999,
    startDeposit: 0,
    endDeposit: 999_999_999,
    startRentCost: 0,
    endRentCost: 999_999_999,
    startBuildYear: 1950,
    endBuildYear: 2024,
    startLng: lng - 0.01,
    endLng: lng + 0.005,
    startLat: lat - 0.01,
    endLat: lat + 0.005,
  };
  getMatchHome(condition)
    .then((result) => {
      const data = result.data;
      data.sort((a, b) => b.dealNum - a.dealNum);
      items.value = data;
    })
    .catch((err) => {
      console.error(err);
    });
};

const handleWheel = (event) => {
  const direction = event.deltaX || event.deltaY > 0;
  event.preventDefault();

  current += direction ? 1 : -1;
  current = Math.min(
    items.value.length - Math.ceil(wrapper.value.offsetWidth / cardWidth) + 1,
    Math.max(current, 0),
  );

  wrapper.value.scrollLeft = current * cardWidth;
};

onMounted(() => {
  wrapper.value.addEventListener('wheel', handleWheel, { passive: false });

  getPosition();
});
</script>

<template>
  <div :class="$style.wrapper" ref="wrapper">
    <div :class="[$style.container, isSupported && currentPosition && $style.fit]">
      <div v-if="!isSupported" :class="$style.alert">
        아쉽게도 <span>집콕</span>이 현재 위치를 알아낼 수 없는 환경이에요. 😥
      </div>
      <div v-else-if="!currentPosition" :class="$style.alert" @click="getPosition">
        <span>집콕</span>이 🌎현재 위치를 확인할 수 있도록 <span>내 위치 확인</span> 권한 요청을
        허용해 주세요.
      </div>
      <template v-else>
        <div :class="$style.itemContainer">
          <PopularHouseItem v-for="item in items" :key="item.houseCode" :data="item" />
        </div>
      </template>
    </div>
  </div>
</template>

<style module>
.wrapper {
  overflow-x: scroll;

  margin: 1rem 0 2rem 0;
  padding-top: 0.5rem;
  max-width: 100%;
  padding-bottom: 0.5rem;

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

.wrapper::-webkit-scrollbar {
  width: 0.375rem;
  height: 0.375rem;

  background-color: transparent;
}

.wrapper::-webkit-scrollbar-thumb {
  border-radius: 0.125rem;

  background-color: var(--scrollbar-thumb-bg);
}

.container {
  display: flex;
  justify-content: center;
}

.container.fit {
  width: fit-content;
}

.alert {
  display: inline-block;

  padding: 1rem;
  border-radius: 0.25rem;

  background-color: var(--popular-house-alert-bg);

  font-weight: 400;
}

.alert span {
  color: var(--color-primary);
  font-weight: 600;
}

.itemContainer {
  display: flex;
  gap: 1rem;
}
</style>
