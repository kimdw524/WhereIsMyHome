<script setup>
import { ref } from 'vue';

const button = ref(null);
const click = ref(false);

const handleClick = () => {
  const { x, y, width, height } = button.value.getBoundingClientRect();

  button.value.style.top = `${y}px`;
  button.value.style.left = `${x}px`;
  button.value.style.width = `${width}px`;
  button.value.style.height = `${height}px`;
  button.value.style.transform = `scale(40)`;

  button.value.classList.add('click');
};
</script>

<template>
  <div class="button" @click="handleClick" ref="button">
    <slot />
  </div>
</template>

<style scoped>
.button {
  display: inline-block;

  padding: 1rem 1.25rem;
  border-radius: 0.25rem;
  box-sizing: border-box;

  background-color: #225cff;

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
