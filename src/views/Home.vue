<script setup>
import Card from '@/components/Common/Card.vue';
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
        <div>아파트</div>
        <LottieAnimation
          :animation-data="lottieBuilding"
          :auto-play="true"
          :loop="false"
          :speed="1"
        />
      </Card>
      <Card>
        <div>연립다세대</div>
        <LottieAnimation
          :animation-data="lottieHouse2"
          :auto-play="true"
          :loop="false"
          :speed="1"
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
</style>
