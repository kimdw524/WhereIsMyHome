<script setup>
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div :class="$style.progress" :style="{ width: `${(value / max) * 100}%` }"></div>
</template>

<style module>
.progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 0.25rem;

  background-color: var(--progressbar-bg);

  transition: all 300ms ease;
}
</style>
