<script setup></script>

<template>
  <div :class="$style.container"><slot /></div>
</template>

<style module>
.container {
  margin-top: 0.75rem;

  color: var(--color-light);
  font-weight: 400;
  line-height: 150%;
}
</style>
