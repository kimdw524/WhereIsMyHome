<script setup>
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
  <div :class="$style.container">
    <div :class="$style.header">header</div>
    <div :class="$style.body">
      <div :class="$style.side">side menu</div>
      <div id="map" :class="$style.map"></div>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;

  height: 100%;
}

.header {
  flex: 0 0 4rem;
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
