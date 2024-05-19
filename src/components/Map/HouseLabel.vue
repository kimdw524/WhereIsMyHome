<script setup>
const props = defineProps({ type: Number });

const items = [
  { name: '아파트', color: 'var(--typelabel-apart)' },
  { name: '연립다세대', color: 'var(--typelabel-house)' },
  { name: '매매', color: 'var(--typelabel-deal)' },
  { name: '전세', color: 'var(--typelabel-fullRent)' },
  { name: '월세', color: 'var(--typelabel-rent)' },
];
</script>

<template>
  <div :style="{ '--label-color': items[type].color }" :class="$style.container">
    {{ items[type].name }}
  </div>
</template>

<style module>
.container {
  display: inline-flex;
  align-items: center;

  height: 1.5rem;
  padding: 0.875rem 0.625rem;
  border: 1px solid var(--label-color);
  border-radius: 0.125rem;
  box-sizing: border-box;

  color: var(--label-color);
  font-size: 0.875rem;
  font-weight: 400;
}
</style>
