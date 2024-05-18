<script setup>
const props = defineProps({ type: Number });
</script>

<template>
  <div :class="[$style.container, type === 1 ? $style.apart : $style.house]">
    {{ type === 1 ? '아파트' : '연립다세대' }}
  </div>
</template>

<style module>
.container {
  display: inline-flex;
  align-items: center;

  height: 1.5rem;
  padding: 0.5rem;
  border-radius: 0.75rem;
  box-sizing: border-box;

  font-size: 0.75rem;
  font-weight: 400;
}

.apart {
  border: 1px solid var(--typelabel-apart);
  color: var(--typelabel-apart);
}

.house {
  border: 1px solid var(--typelabel-house);
  color: var(--typelabel-house);
}
</style>
