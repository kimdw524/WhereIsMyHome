<script setup></script>

<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<style module>
.container {
  margin: 0.5rem 0;

  font-size: 0.875rem;
  font-weight: 400;
}

.container span {
  color: var(--color-primary);
  font-weight: 600;
}
</style>
