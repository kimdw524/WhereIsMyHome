<script setup>
defineEmits(['click']);
</script>

<template>
  <div :class="$style.container" @click="$emit('click')"><slot /></div>
</template>

<style module>
.container {
  display: inline-block;
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;

  aspect-ratio: 7 / 3;
  padding: 1rem;
  border: 1px solid var(--card-border-color);
  border-radius: 0.25rem;

  cursor: pointer;
  user-select: none;
  transition: all 100ms ease;
}
</style>
