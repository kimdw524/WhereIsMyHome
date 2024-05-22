<script setup>
import { computed, onUpdated, watch } from 'vue';
import HouseList from './HouseList.vue';
import RegionList from './RegionList.vue';

const props = defineProps({ query: String, result: Object | null });

const isEmpty = computed(() => {
  if (!props.result) return true;
  return props.result.apts.length + props.result.houses.length + props.result.regions.length === 0;
});
</script>

<template>
  <div :class="$style.container">
    <div v-if="isEmpty" :class="$style.empty">
      <span>'{{ props.query }}'</span>에 대한 검색 결과가 존재하지 않습니다.
    </div>
    <div v-else :class="$style.result">
      <div v-if="result.regions.length" :class="$style.list">
        <div :class="$style.header">지역명</div>
        <div :class="$style.listContainer">
          <RegionList
            v-for="item in result.regions"
            :key="item.dongCode"
            :item="item"
            :query="query"
          />
        </div>
      </div>

      <div v-if="result.apts.length + result.houses.length" :class="$style.list">
        <div :class="$style.header">단지</div>
        <div :class="$style.listContainer">
          <HouseList
            v-for="item in result.apts"
            :key="item.houseCode"
            :item="item"
            :query="query"
          />
          <HouseList
            v-for="item in result.houses"
            :key="item.houseCode"
            :item="item"
            :query="query"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;

  padding: 1rem;
  box-sizing: border-box;
}

.empty {
  margin: 0 auto;
  padding: 2rem 0;

  font-size: 1rem;
  font-weight: 400;
}

.empty span {
  margin-right: 0.125rem;

  letter-spacing: 1px;
}

.result {
  display: flex;

  padding: 0.75rem 0;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;

  padding: 1rem 1.75rem;

  background-color: var(--bg);

  font-weight: 700;
  letter-spacing: 1px;
}

.listContainer {
  padding: 0 1rem 1rem 1rem;
}

.list {
  flex: 0 0 50%;
  overflow-y: scroll;

  min-height: 12rem;
  max-height: 50vh;
  border-right: 1px solid var(--card-border-color);
  box-sizing: border-box;
}

.list:last-child {
  border-right: 0;
}

.list:first-child {
  border-right: 1px solid var(--card-border-color);
}
</style>
