<script setup>
const props = defineProps({
  title: String,
});
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.title">{{ title }}</div>
    <div>
      <slot />
    </div>
  </div>
</template>

<style module>
.container {
  position: relative;

  max-width: 1024px;
  margin: 0 auto;
}

.title {
  position: sticky;
  top: 0;

  padding: 1.5rem 0 2rem 0;

  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 0) 100%);

  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 1px;
}
</style>
