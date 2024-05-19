<script setup>
import { getHomeDetail } from '@/apis/Home';
import { onMounted, ref } from 'vue';
import HouseLabel from './HouseLabel.vue';
import Formatter from '@/utils/formatter';

const model = defineModel();
const data = ref(null);
const history = ref({ deal: false, fullRent: false, rent: false });

onMounted(() => {
  getHomeDetail(model.value)
    .then((result) => {
      console.log(result.data);
      data.value = result.data;
      history.value.deal =
        result.data.dealList.findIndex((item) => Formatter.toNumber(item.dealAmount) > 0) > -1;
      history.value.fullRent =
        result.data.dealList.findIndex(
          (item) => Formatter.toNumber(item.deposit) > 0 && Formatter.toNumber(item.rentCost) === 0,
        ) > -1;
      history.value.rent =
        result.data.dealList.findIndex((item) => Formatter.toNumber(item.rentCost) > 0) > -1;
    })
    .catch((error) => {
      console.error(error);
      alert('부동산 정보를 불러오는 중 오류가 발생하였습니다.');
    });
});
</script>
<template>
  <div :class="$style.container">
    <template v-if="data">
      <div :class="$style.header">
        <div :class="$style.labelContainer">
          <HouseLabel v-if="data.house.houseType === 1" :type="0" />
          <HouseLabel v-if="data.house.houseType === 2" :type="1" />
          <HouseLabel v-if="history.deal" :type="2" />
          <HouseLabel v-if="history.fullRent" :type="3" />
          <HouseLabel v-if="history.rent" :type="4" />
        </div>
        <div :class="$style.houseName">
          {{ data.house.houseName }}
        </div>
      </div>
      <button @click="model = 0">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="200px"
          width="200px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
          ></path>
        </svg>
      </button>
    </template>
    <template v-else>
      <div>로딩 중...</div>
    </template>
  </div>
</template>
<style module>
.container {
  width: 20vw;
  height: 100%;
  padding: 0.75rem;
  box-sizing: border-box;

  background-color: rgba(255, 255, 255, 0.9);
}

.header {
  position: sticky;
  top: 0;

  padding: 0.5rem 0.25rem;
}

.labelContainer {
  display: flex;
  gap: 0.5rem;

  margin-bottom: 1rem;
}

.houseName {
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 1px;
}
</style>
