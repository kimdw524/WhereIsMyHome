<script setup>
import { ref } from 'vue';

const button = ref(null);
</script>

<template>
  <RouterLink to="/home">
    <div class="button" ref="button">
      <slot />
    </div>
  </RouterLink>
</template>

<style scoped>
.button {
  display: inline-block;

  padding: 1rem 1.25rem;
  border-radius: 0.25rem;
  box-sizing: border-box;

  background-color: var(--intro-enter-bg);

  color: #fff;
  letter-spacing: 1px;

  transition: all 800ms ease, color 100ms ease;

  cursor: pointer;
  user-select: none;

  z-index: 100;
}

.button.click {
  position: fixed;

  background-color: #fff;

  border-radius: 0;

  color: transparent;
}
</style>
