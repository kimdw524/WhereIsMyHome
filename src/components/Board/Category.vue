<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({ menu: Array, current: String });
const router = useRouter();
</script>

<template>
  <div :class="$style.container">
    <div
      v-for="item in menu"
      :key="item.slug"
      :class="[$style.item, current === item.slug && $style.selected]"
      @click="() => router.push(item.slug)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  justify-content: space-around;
}

.item {
  flex: 1 1 auto;

  padding: 1rem;
  box-sizing: border-box;
  border-bottom: 3px solid transparent;

  text-align: center;

  transition: all 150ms ease;

  cursor: pointer;
}

.item:hover {
  text-decoration: underline;
}

.item.selected {
  border-bottom: 3px solid var(--board-category-selected);

  text-decoration: none !important;
}
</style>
