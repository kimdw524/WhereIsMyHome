<script setup>
import Filter from '@/components/Common/Filter.vue';
import BuildYearFilter from '@/components/Map/BuildYearFilter.vue';
import TradeFilter from '@/components/Map/TradeFilter.vue';
import TypeFilter from '@/components/Map/TypeFilter.vue';
import { onMounted } from 'vue';
let map;
onMounted(() => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3,
  };
  map = new kakao.maps.Map(container, options);
});
</script>

<template>
  <Transition name="fade2" appear>
    <div :class="$style.container">
      <div :class="$style.header">
        <Filter text="아파트">
          <TypeFilter />
        </Filter>
        <Filter text="월세,전세,매매">
          <TradeFilter />
        </Filter>
        <Filter text="가격"> </Filter>
        <Filter text="건축년도">
          <BuildYearFilter />
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
