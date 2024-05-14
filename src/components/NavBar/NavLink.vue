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
  box-sizing: content-box;

  background-color: transparent;

  color: var(--color);
  font-weight: 400;
  letter-spacing: 1px;
  text-decoration: none;

  transition: all 100ms ease;

  user-select: none;
}

.container.active {
  color: var(--navbar-navlink-color-hover);
}

.container:hover {
  color: var(--navbar-navlink-color-hover);
}
</style>
