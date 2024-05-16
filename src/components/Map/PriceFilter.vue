<script setup>
import { ref } from 'vue';
import Range from '../Common/Range.vue';

const items = new Array(501).fill(0).map((value, index) => {
  return { value: index * 500, name: `${(index * 1000).toLocaleString()}만 원` };
});
items[0].name = '0원';
items[items.length - 1].name = '전체';
const range = ref([0, items.length - 1]);
</script>

<template>
  <div :class="$style.wrapper" :style="{ width: '300px' }">
    <div :class="$style.container">
      <Range title="가격" v-model="range" :items="items" />
    </div>
  </div>
</template>

<style module>
.wrapper {
  display: flex;
  align-items: center;

  padding: 0.75rem;
  box-sizing: border-box;
}

.container {
  width: 100%;
}
</style>
