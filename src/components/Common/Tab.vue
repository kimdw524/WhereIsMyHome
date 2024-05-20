<script setup>
import { ref } from 'vue';
const model = defineModel();
const props = defineProps({ items: Array });
</script>

<template>
  <div :class="$style.container">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="[$style.item, model === index && $style.active]"
      @click="model = index"
    >
      {{ item }}
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  justify-content: space-around;

  border-bottom: 1px solid var(--tab-border);

  cursor: pointer;
}

.item {
  padding: 0.75rem 0.5rem;
  border-top: 0.1875rem solid transparent;
  border-bottom: 0.1875rem solid transparent;

  text-align: center;

  transition: all 100ms ease;

  user-select: none;
}

.item.active {
  border-bottom: 0.1875rem solid var(--tab-color-active);

  color: var(--tab-color-active);
}
</style>
