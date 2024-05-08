<script setup>
import { ref, watch } from 'vue';

const checked = ref(false);
</script>

<template>
  <div :class="$style.container" @click="checked = !checked">
    <div :class="[$style.box, checked && $style.checked]"></div>
    <div :class="$style.slot">
      <slot />
    </div>
  </div>
</template>

<style module>
.container {
  display: inline-flex;
  align-items: center;

  cursor: pointer;
}

.box {
  width: 1.5rem;
  height: 1.5rem;

  border-radius: 50%;

  background-color: #d3d3d3;

  transition: all 150ms ease;
}

.checked {
  background-color: red;
}

.slot {
  margin-left: 0.5rem;

  user-select: none;
}
</style>
