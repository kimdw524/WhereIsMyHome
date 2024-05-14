<script setup></script>

<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<style module>
.container {
  margin: 0.5rem 0;

  font-size: 1.375rem;
  font-weight: 500;
  letter-spacing: 1px;
}

.container span {
  color: var(--color-primary);
  font-weight: 600;
}
</style>
