<script setup>
import Card from '@/components/Common/Card/Card.vue';
import CardTitle from '@/components/Common/Card/CardTitle.vue';
import CardBody from '@/components/Common/Card/CardBody.vue';
import MainSearch from '@/components/MainSearch/MainSearch.vue';
import { LottieAnimation } from 'lottie-web-vue';
import lottieBuilding from '@/assets/lotties/building.json';
import lottieHouse2 from '@/assets/lotties/house2.json';
import Section from '@/components/Common/Section/Section.vue';
import SectionDescription from '@/components/Common/Section/SectionDescription.vue';
import NewsList from '@/components/News/NewsList.vue';

const news = [
  {
    title: '나는 양규현',
    link: 'https://n.news.naver.com/mnews/article/374/0000383525',
    journalist: '양규현 기자',
    press: '데일리안',
    thumbnail: 'https://mimgnews.pstatic.net/image/origin/119/2024/05/14/2829877.jpg',
  },
  {
    title: '3년 새 30% 뛴 공사비…자재수급 안정화 방안 모색',
    link: 'https://n.news.naver.com/mnews/article/119/0002829877',
    journalist: '김다운 기자',
    press: '서울경제',
    thumbnail: 'https://mimgnews.pstatic.net/image/origin/421/2024/05/14/7539595.jpg',
  },
  {
    title: '분양가 오르고, 공급 줄어… 옥석 신축 ‘e편한세상 번영로 리더스포레’ 선점해 볼까',
    link: 'https://n.news.naver.com/mnews/article/011/0004340652',
    journalist: '손동희 기자',
    press: '이데일리',
    thumbnail: 'https://mimgnews.pstatic.net/image/origin/011/2024/05/14/4340652.jpg',
  },
  {
    title: '[머니S포토] 박상우 장관 "자재 수급 불안 없도록 최선의 노력 할 것"',
    link: 'https://n.news.naver.com/mnews/article/374/0000383525',
    journalist: '임한별 기자',
    press: '머니S',
    thumbnail: 'https://mimgnews.pstatic.net/image/origin/417/2024/05/14/1002437.jpg',
  },
  {
    title: '입주 지연에 분양가 상승···3기 신도시 이어 ‘뉴홈’ 공공분양도 우려',
    link: 'https://n.news.naver.com/mnews/article/032/0003296161',
    journalist: '유희곤 기자',
    press: '경향신문',
    thumbnail:
      'https://imgnews.pstatic.net/image/032/2024/05/14/0003296161_001_20240514154601099.jpg',
  },
  {
    title: 'KT그룹 임대주택 운영관리회사 KD리빙, ‘KT리빙’으로 사명 변경',
    link: 'https://n.news.naver.com/mnews/article/366/0000992555',
    journalist: '백윤미 기자',
    press: '조선비즈',
    thumbnail:
      'https://imgnews.pstatic.net/image/366/2024/05/14/0000992555_001_20240514152911668.jpg',
  },
];
</script>

<template>
  <Transition name="fade2" appear>
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

      <div :class="$style.newsContainer">
        <Section>📰 부동산 <span>뉴스</span></Section>
        <SectionDescription>최신 부동산 뉴스를 한눈에 보세요.</SectionDescription>
        <NewsList :news="news" style="margin-top: 1rem" />
      </div>
    </div>
  </Transition>
</template>

<style module>
.container {
  max-width: 1024px;
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

.newsContainer {
}
</style>
