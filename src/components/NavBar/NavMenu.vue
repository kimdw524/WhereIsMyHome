<script setup>
const props = defineProps({
  slug: String,
});
</script>

<template>
  <RouterLink :to="slug">
    <div :class="[$style.button]">
      <slot />
    </div>
  </RouterLink>
</template>

<style module>
.button {
  display: inline-block;

  padding: 0.75rem 1.125rem;

  background-color: var(--navbar-navlink-bg);

  border-radius: 0.25rem;

  color: var(--navbar-navlink-color);
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
  letter-spacing: 1px;

  transition: all 200ms ease;

  cursor: pointer;
  user-select: none;
}
</style>
