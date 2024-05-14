<script setup></script>

<template>
  <div :class="$style.container"><slot /></div>
</template>

<style module>
.container {
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 1px;
}
</style>
