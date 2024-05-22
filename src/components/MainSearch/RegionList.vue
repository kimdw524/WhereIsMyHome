<script setup>
import { useAlertStore } from '@/stores/alert';
import { useRouter } from 'vue-router';
const props = defineProps({ query: String, item: Object });
const { alert } = useAlertStore();
const router = useRouter();

const highlight = (text) => {
  return text.replaceAll(props.query, `<span>${props.query}</span>`);
};

const handleClick = () => {
  const location = `${props.item.sidoName} ${props.item.gugunName} ${props.item.dongName}`;
  const geocoder = new kakao.maps.services.Geocoder();
  console.log(location);
  geocoder.addressSearch(location, (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const { La, Ma } = new kakao.maps.LatLng(result[0].y, result[0].x);
      const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
      searchHistory.push({
        type: 'region',
        location,
        La,
        Ma,
      });
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      router.push(`/map?La=${La}&Ma=${Ma}`);
    } else {
      alert('카카오 API를 통해 좌표를 불러오는 도중 오류가 발생하였습니다.');
    }
  });
};
</script>

<template>
  <div :class="$style.container">
    <div
      :class="$style.region"
      v-html="highlight(`${item.sidoName} ${item.gugunName} ${item.dongName}`)"
      @mousedown="handleClick"
    ></div>
  </div>
</template>

<style module>
.container {
  padding: 0.625rem 0.75rem;
  border-radius: 0.25rem;

  cursor: pointer;

  user-select: none;
}

.container:hover {
  background-color: var(--search-result-bg-hover);
}

.container span {
  color: var(--color-primary);
}

.region {
  font-weight: 400;
}
</style>
