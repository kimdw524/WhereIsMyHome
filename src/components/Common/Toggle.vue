<script setup>
const model = defineModel();
</script>

<template>
  <div :class="[$style.container, model && $style.active]" @click="model = !model">
    <div :class="$style.text">
      <slot />
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  position: relative;

  border: 1px solid var(--filter-border);
  border-radius: 0.125rem;

  background-color: var(--filter-bg);

  transition: all 100ms ease;

  cursor: pointer;
  user-select: none;
}

.container:hover {
  background-color: var(--filter-bg-hover);
}

.container.active {
  border: 1px solid var(--color-primary);

  color: var(--color-primary);
}

.text {
  display: inline-flex;
  align-items: center;

  padding: 0.375rem 0.625rem;
  border-radius: 0.25rem;

  font-size: 0.875rem;
}
</style>
