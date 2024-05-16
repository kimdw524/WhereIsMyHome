<script setup>
import { ref } from 'vue';
import Range from '../Common/Range.vue';

const range = ref([0, 2024 - 1950]);
</script>

<template>
  <div :class="$style.wrapper" :style="{ width: '300px' }">
    <div :class="$style.container">
      <Range
        title="건축년도"
        v-model="range"
        :items="
          new Array(new Date().getFullYear() - 1950 + 1).fill(0).map((value, index) => {
            return { value: index + 1950, name: `${1950 + index}년` };
          })
        "
      />
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
