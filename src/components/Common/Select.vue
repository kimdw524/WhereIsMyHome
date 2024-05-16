<script setup>
const model = defineModel();
</script>

<template>
  <select :class="$style.select" v-model="model">
    <slot />
  </select>
</template>

<style module>
.select {
  width: 100%;
  height: 3rem;
  padding: 0 0.625rem;
  box-sizing: border-box;
  border-radius: 0.175rem;
  border: 1px solid var(--textfield-border);

  background-color: var(--textfield-bg);

  color: var(--textfield-color);
  font-size: 1rem;

  transition: all 100ms ease;

  outline: none;
  cursor: pointer;
}

.select:focus {
  border: 1px solid var(--textfield-border-focus);
}
</style>
