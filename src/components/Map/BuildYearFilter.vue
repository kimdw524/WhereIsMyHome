<script setup>
import { ref, watch } from 'vue';
import Range from '../Common/Range.vue';

const model = defineModel();

const items = new Array(new Date().getFullYear() - 1950 + 1).fill(0).map((value, index) => {
  return { value: index + 1950, name: `${1950 + index}년` };
});

const range = ref([
  Math.max(0, model.value.startBuildYear - items[0].value),
  Math.min(items.length - 1, model.value.endBuildYear - items[0].value),
]);

watch(range, (value) => {
  model.value = {
    startBuildYear: items[Math.min(...value)].value,
    endBuildYear: items[Math.max(...value)].value,
  };
});
</script>

<template>
  <div :class="$style.wrapper" :style="{ width: '300px' }">
    <div :class="$style.container">
      <Range title="건축년도" v-model="range" :items="items" />
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
