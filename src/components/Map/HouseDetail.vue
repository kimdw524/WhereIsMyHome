<script setup>
import { getHomeDetail, setStar, removeStar } from '@/apis/Home';
import Star from '@/components/Common/Star.vue';
import Tab from '@/components/Common/Tab.vue';
import { useAlertStore } from '@/stores/alert';
import { toNumber } from '@/utils/utils';
import { computed, onMounted, ref } from 'vue';
import HouseLabel from './HouseLabel.vue';
import HouseOverall from './HouseOverall.vue';
import DealList from './DealList.vue';
import Roadview from './Roadview.vue';
import Debate from './Debate.vue';
import Share from './Share.vue';

const emit = defineEmits('position');
const model = defineModel();
const data = ref(null);
const interest = ref(false);
const tab = ref(0);
const share = ref({
  objectType: 'text',
  text: '매물을 공유할게요.',
  link: {
    mobileWebUrl: `${location.origin}/map?code=${model.value}`,
    webUrl: `${location.origin}/map?code=${model.value}`,
  },
});

const { alert } = useAlertStore();

const deals = computed(() => {
  if (data.value) {
    return data.value.dealList.filter((item) => toNumber(item.dealAmount) > 0);
  } else {
    return [];
  }
});

const fullRents = computed(() => {
  if (data.value) {
    return data.value.dealList.filter(
      (item) => toNumber(item.deposit) > 0 && toNumber(item.rentCost) === 0,
    );
  } else {
    return [];
  }
});

const rents = computed(() => {
  if (data.value) {
    return data.value.dealList.filter((item) => toNumber(item.rentCost) > 0);
  } else {
    return [];
  }
});

const handleStar = () => {
  if (interest.value === true) {
    removeStar(model.value)
      .then((result) => {
        console.log(result.data);
        interest.value = false;
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    setStar(model.value)
      .then((result) => {
        interest.value = true;
        console.log(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

onMounted(() => {
  getHomeDetail(model.value)
    .then((result) => {
      data.value = result.data;
      share.value.text = `${data.value.house.houseName}`;
      interest.value = result.data.favorite;
      console.log(result.data);
      emit('position', { lat: result.data.house.lat, lng: result.data.house.lng });
    })
    .catch((error) => {
      console.error(error);
      alert('부동산 정보를 불러오는 중 오류가 발생하였습니다.');
    });
});
</script>
<template>
  <Transition name="fade2" appear>
    <div :class="$style.container">
      <template v-if="data">
        <div :class="$style.header">
          <div :class="$style.labelContainer">
            <HouseLabel v-if="data.house.houseType === 1" :type="0" />
            <HouseLabel v-if="data.house.houseType === 2" :type="1" />
            <HouseLabel v-if="deals.length" :type="2" />
            <HouseLabel v-if="fullRents.length" :type="3" />
            <HouseLabel v-if="rents.length" :type="4" />
          </div>
          <div :class="$style.houseName">
            <div>
              {{ data.house.houseName }}
            </div>
            <div :class="$style.menuContainer">
              <Share :option="share" />
              <Star v-model="interest" @click="handleStar" />
            </div>
          </div>
        </div>
        <Tab
          :items="['정보', '거래 내역', '로드뷰', '매물토론실']"
          v-model="tab"
          :class="$style.tab"
        />
        <div :class="$style.body">
          <div :class="$style.innerContainer">
            <TransitionGroup name="fade2">
              <div :key="tab" :class="$style.animationContainer">
                <HouseOverall
                  v-if="tab === 0"
                  :deals="deals"
                  :fullRents="fullRents"
                  :rents="rents"
                  :data="data"
                />
                <DealList v-if="tab === 1" :items="data.dealList" />
                <Roadview v-if="tab === 2" :lat="data.house.lat" :lng="data.house.lng" />
                <Debate v-if="tab === 3" :houseCode="data.house.houseCode" />
              </div>
            </TransitionGroup>
          </div>
        </div>
      </template>
    </div>
  </Transition>
</template>
<style module>
.container {
  display: flex;
  flex-direction: column;
  position: relative;

  width: 400px;
  height: 100%;
  box-sizing: border-box;
}

.innerContainer {
  position: relative;
  min-height: 100%;
}

.animationContainer {
  position: absolute;
  inset: 0;
}

.header {
  flex: 0 0 auto;

  padding: 1.5rem 1.25rem 0 1.25rem;

  background-color: var(--bg);
}

.body {
  flex: 1 1 auto;

  overflow-y: scroll;
}

.body::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.tab {
  flex: 0 0 auto;
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

  margin-bottom: 1rem;

  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 1px;
}

.menuContainer {
  display: flex;
  gap: 0.625rem;
}
</style>
