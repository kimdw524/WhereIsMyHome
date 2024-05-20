<script setup>
import { ref, watch } from 'vue';
import Checkbox from '../Common/Checkbox.vue';
import DealListItem from './DealListItem.vue';
import { toNumber } from '@/utils/utils';

const props = defineProps({ items: Array });
const filter = ref({ deal: true, fullRent: true, rent: true });

const filteredItem = ref([]);

console.log(props.items);

watch(
  filter,
  (filter) => {
    filteredItem.value = props.items.filter((item) => {
      const dealType = toNumber(item.dealAmount) > 0 ? 0 : toNumber(item.rentCost) === 0 ? 1 : 2;
      if (dealType === 0 && filter.deal) {
        return true;
      } else if (dealType === 1 && filter.fullRent) {
        return true;
      } else if (dealType === 2 && filter.rent) {
        return true;
      }
      return false;
    });

    console.log(props.items, filteredItem.value);
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.filterContainer">
      <Checkbox v-model="filter.deal">매매</Checkbox>
      <Checkbox v-model="filter.fullRent">전세</Checkbox>
      <Checkbox v-model="filter.rent">월세</Checkbox>
    </div>
    <div :class="$style.listContainer">
      <Transition
        :key="deal.id"
        v-for="(deal, index) in filteredItem"
        name="fade2"
        :style="{ 'transition-duration': `${(index + 1) * 100}ms` }"
        appear
      >
        <DealListItem :data="deal" />
      </Transition>
    </div>
  </div>
</template>

<style module>
.container {
  position: relative;
}

.filterContainer {
  display: flex;
  justify-content: space-around;
  position: sticky;
  top: 0;
  z-index: 10;

  padding: 1rem;
  box-shadow: 0 0.125rem 0.5rem 0 #bcbcbc54;
  background-color: var(--bg);
}

.listContainer {
}
</style>
