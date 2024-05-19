<script setup>
import { getHomeDetail } from '@/apis/Home';
import { onMounted, ref } from 'vue';
import HouseLabel from './HouseLabel.vue';
import Star from '@/components/Common/Star.vue';
import Formatter from '@/utils/formatter';

const model = defineModel();
const data = ref(null);
const history = ref({ deal: false, fullRent: false, rent: false });
const interest = ref(false);

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
      <Transition name="fade" appear>
        <div>
          <div :class="$style.header">
            <div :class="$style.labelContainer">
              <HouseLabel v-if="data.house.houseType === 1" :type="0" />
              <HouseLabel v-if="data.house.houseType === 2" :type="1" />
              <HouseLabel v-if="history.deal" :type="2" />
              <HouseLabel v-if="history.fullRent" :type="3" />
              <HouseLabel v-if="history.rent" :type="4" />
            </div>
            <div :class="$style.houseName">
              <div>
                {{ data.house.houseName }}
              </div>
              <Star v-model="interest" />
            </div>
          </div>
          <div :class="$style.addressContainer">
            <div :class="$style.address">
              <div><span>지번 주소</span></div>
              <div>
                {{ `${data.house.sidoName} ${data.house.gugunName} ${data.house.dongJibun}` }}
              </div>
            </div>
            <div :class="$style.address">
              <div><span>도로명 주소</span></div>
              <div>{{ data.house.roadName }}</div>
            </div>
          </div>
          <div :class="$style.detailContainer">
            <div :class="$style.detail">
              건축년도 <span>{{ data.house.buildYear }}년</span>
            </div>
            <div :class="$style.detail">
              총 거래량 <span>{{ data.dealList.length }}건</span>
            </div>
          </div>
        </div>
      </Transition>
    </template>
  </div>
</template>
<style module>
.container {
  position: relative;
  overflow-y: scroll;

  width: 400px;
  height: 100%;
  padding: 0 1.25rem 1.25rem 1.25rem;
  box-sizing: border-box;
}

.header {
  position: sticky;
  top: 0;

  padding: 1.5rem 0;

  background-color: var(--bg);
}

.labelContainer {
  display: flex;
  gap: 0.5rem;

  padding-bottom: 1rem;
}

.houseName {
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 1px;
}

.addressContainer {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.address {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;

  font-size: 0.875rem;
  font-weight: 300;
}

.address span {
  font-weight: 500;
}

.detailContainer {
  display: flex;
  gap: 0.5rem;

  margin: 1rem 0;
}

.detail {
  font-size: 0.875rem;
  font-weight: 500;
}

.detail span {
  font-weight: 300;
}
</style>
