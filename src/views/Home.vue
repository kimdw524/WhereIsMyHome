<script setup>
import Card from '@/components/Common/Card/Card.vue';
import CardTitle from '@/components/Common/Card/CardTitle.vue';
import CardBody from '@/components/Common/Card/CardBody.vue';
import MainSearch from '@/components/MainSearch/MainSearch.vue';
import { LottieAnimation } from 'lottie-web-vue';
import lottieBuilding from '@/assets/lotties/building.json';
import lottieHouse2 from '@/assets/lotties/house2.json';
import lottieWrite from '@/assets/lotties/write.json';
import Section from '@/components/Common/Section/Section.vue';
import SectionDescription from '@/components/Common/Section/SectionDescription.vue';
import NewsList from '@/components/News/NewsList.vue';
import PopularHouse from '@/components/PopularHouse/PopularHouse.vue';
import { ref } from 'vue';

const currentLocation = ref('우리 동네');
</script>

<template>
  <Transition name="fade2" appear>
    <div :class="$style.container">
      <div :class="$style.searchWrapper">
        <MainSearch />
      </div>

      <div :class="$style.cardContainer">
        <Card
          @click="
            $router.push(
              '/map?La=&Ma=&level=3&ap=true&ho=false&td=true&tf=true&tr=true&sd=0&ed=999999999&sde=0&ede=999999999&sr=0&er=999999999&sb=0&eb=2024',
            )
          "
        >
          <CardTitle>아파트</CardTitle>
          <CardBody>전국에 위치한 모든<br />매물과 단지 정보를<br />확인해 보세요.</CardBody>
          <LottieAnimation
            :animation-data="lottieBuilding"
            :auto-play="false"
            :loop="false"
            :speed="1"
            :class="$style.buildingAnimation"
          />
        </Card>
        <Card
          @click="
            $router.push(
              '/map?La=&Ma=&level=3&ap=false&ho=true&td=true&tf=true&tr=true&sd=0&ed=999999999&sde=0&ede=999999999&sr=0&er=999999999&sb=0&eb=2024',
            )
          "
        >
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
        <Card @click="$router.push('/board/free')">
          <CardTitle>자유게시판</CardTitle>
          <CardBody>부동산 매물에 대한 다양한<br />정보를 자유롭게 나눠보세요.</CardBody>
          <LottieAnimation
            :animation-data="lottieWrite"
            :auto-play="true"
            :loop="true"
            :speed="1"
            :class="$style.writeAnimation"
          />
        </Card>
      </div>

      <div>
        <Section
          >🏡 <span>{{ currentLocation }} 주변</span> 인기 매물</Section
        >
        <SectionDescription>내 주변 부동산 매물을 거래량 순으로 보여드릴게요.</SectionDescription>
        <PopularHouse v-model="currentLocation" />
      </div>

      <div>
        <Section>📰 부동산 <span>뉴스</span></Section>
        <SectionDescription>최신 부동산 뉴스를 한눈에 보세요.</SectionDescription>
        <NewsList style="margin-top: 1rem" />
      </div>
    </div>
  </Transition>
</template>

<style module>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}

.searchWrapper {
  margin-bottom: 1rem;
}

.cardContainer {
  display: flex;
  gap: 1rem;

  padding: 1rem 0;

  @media (max-width: 576px) {
    flex-direction: column;
  }
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

.writeAnimation {
  position: absolute;
  right: -2rem;
  bottom: -3rem;
  z-index: -10;

  width: 13rem;
}
</style>
