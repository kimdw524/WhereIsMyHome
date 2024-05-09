<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button :class="$style.button">
    <span :class="$style.icon">
      <slot />
    </span>
    <span>{{ text }} </span>
  </button>
</template>

<style module>
.button {
  display: flex;
  align-items: center;
  position: relative;

  padding: 0.75rem 0.5rem;

  background-color: transparent;

  border: 0;

  color: var(--color);
  font-weight: 400;
  font-size: 1rem;
  font-family: inherit;
  text-decoration: none;

  cursor: pointer;
  outline: none;
  user-select: none;
}

.icon {
  margin-right: 0.5rem;

  transition: all 200ms ease;
}

.button:hover .icon {
  transform: translateX(-0.25rem);
}
</style>
