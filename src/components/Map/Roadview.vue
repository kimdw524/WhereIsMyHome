<script setup>
import { onMounted } from 'vue';

const props = defineProps({ lat: String, lng: String });

console.log(props.lat, props.lng);

onMounted(() => {
  const roadviewContainer = document.getElementById('roadview');
  const roadview = new kakao.maps.Roadview(roadviewContainer);
  const roadviewClient = new kakao.maps.RoadviewClient();
  const position = new kakao.maps.LatLng(props.lat, props.lng);

  roadviewClient.getNearestPanoId(position, 50, (panoId) => {
    roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
  });
});
</script>

<template>
  <div :class="$style.container">
    <div id="roadview" :class="$style.roadview"></div>
  </div>
</template>

<style module>
.container {
  position: absolute;
  inset: 0 0 0 0;
}
.roadview {
  width: 100%;
  height: 100%;
}
</style>
