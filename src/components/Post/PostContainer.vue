<script setup>
const props = defineProps({
  title: String,
});
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.title">{{ title }}</div>
    <div :class="$style.postList">
      <slot />
    </div>
  </div>
</template>

<style module>
.container {
  box-shadow: 0 0.5rem 2rem -1rem rgba(0, 0, 0, 0.4);
}

.title {
  padding: 1.5rem 1rem;

  background-color: var(--post-title-bg);

  color: var(--post-title-color);
  font-size: 1.125rem;
  font-weight: 500;
}

.postList {
  background-color: var(--bg);
}
</style>
