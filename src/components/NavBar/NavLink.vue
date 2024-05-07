<script setup>
const props = defineProps({
  slug: String,
  active: Boolean,
});
</script>

<template>
  <RouterLink :to="slug">
    <div :class="[$style.container, active && $style.active]"><slot /></div>
  </RouterLink>
</template>

<style module>
.container {
  display: inline-block;

  padding: 0.75rem 1rem;

  background-color: transparent;

  border-radius: 0.5rem;

  color: var(--color);
  font-weight: 500;
  text-decoration: none;

  transition: all 200ms ease;

  user-select: none;
}

.container.active {
  color: #4260ff;
}

.container:hover {
  background-color: #f5f5f5;
}
</style>
