<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
  },
});
</script>

<template>
  <button :class="[$style.button, $style[variant], size === 'sm' && $style.sm]"><slot /></button>
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
  font-weight: 400;
  font-size: 1rem;
  text-decoration: none;
  letter-spacing: 1px;
  word-break: keep-all;

  transition: all 150ms ease;

  cursor: pointer;
  outline: none;
  user-select: none;
}

.button.sm {
  padding: 0.625rem 1rem;
  border-radius: 0.1875rem;

  font-size: 0.875rem;
  font-weight: 400;
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

.secondary {
  --bg: var(--button-secondary-bg);
  --bg-hover: var(--button-secondary-bg-hover);
  --color: var(--button-secondary-color);

  border: 1px solid #0055bf;
  box-shadow: 0 0 0.375rem 0.125rem #50505054;
}

.danger {
  --bg: var(--button-danger-bg);
  --bg-hover: var(--button-danger-bg-hover);
  --color: var(--button-danger-color);
}
</style>
