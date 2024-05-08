<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
});
</script>

<template>
  <button :class="[$style.button, $style[variant]]"><slot /></button>
</template>

<style module>
.button {
  display: flex;
  align-items: center;
  position: relative;

  padding: 0.75rem 1.25rem;

  background-color: var(--bg);

  border: 0;
  border-radius: 0.25rem;

  color: var(--color);
  font-weight: 500;
  font-size: 0.875rem;
  font-family: inherit;
  text-decoration: none;
  letter-spacing: 1px;

  cursor: pointer;
  outline: none;
  user-select: none;
}

.button:hover {
  background-color: var(--bg-hover);
}

.primary {
  --bg: var(--button-primary-bg);
  --bg-hover: var(--button-primary-bg-hover);
  --color: var(--button-primary-color);
}

.kakao {
  --bg: var(--button-kakao-bg);
  --bg-hover: var(--button-kakao-bg-hover);
  --color: var(--button-kakao-color);
}
</style>
