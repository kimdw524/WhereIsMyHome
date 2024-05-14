<script setup>
import Card from '@/components/Common/Card/Card.vue';
import CardTitle from '@/components/Common/Card/CardTitle.vue';
import CardBody from '@/components/Common/Card/CardBody.vue';
import MainSearch from '@/components/MainSearch/MainSearch.vue';

import { LottieAnimation } from 'lottie-web-vue';
import lottieBuilding from '@/assets/lotties/building.json';
import lottieHouse2 from '@/assets/lotties/house2.json';
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.searchWrapper">
      <MainSearch />
    </div>

    <div :class="$style.cardContainer">
      <Card>
        <CardTitle>아파트</CardTitle>
        <CardBody>전국에 위치한 모든<br />매물과 단지 정보를<br />확인해 보세요.</CardBody>
        <LottieAnimation
          :animation-data="lottieBuilding"
          :auto-play="true"
          :loop="true"
          :speed="1"
          :class="$style.buildingAnimation"
        />
      </Card>
      <Card>
        <CardTitle>연립다세대</CardTitle>
        <CardBody>주택부터 빌라까지<br />다양한 매물을 찾아보세요.</CardBody>
        <LottieAnimation
          :animation-data="lottieHouse2"
          :auto-play="true"
          :loop="true"
          :speed="1"
          :class="$style.houseAnimation"
        />
      </Card>
    </div>
  </div>
</template>

<style module>
.container {
  max-width: 1024px;
  margin: 0 auto;
}

.searchWrapper {
  padding: 1rem;
}

.cardContainer {
  display: flex;
  gap: 1rem;

  padding: 1rem;
}

.buildingAnimation {
  position: absolute;
  right: -0.5rem;
  bottom: -0.5rem;
  z-index: -10;

  width: 10.5rem;
}

.houseAnimation {
  position: absolute;
  right: -2rem;
  bottom: -4rem;
  z-index: -10;

  width: 15rem;
}
</style>
