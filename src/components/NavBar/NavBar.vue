<script setup>
import { useRoute } from 'vue-router';
import NavLink from './NavLink.vue';

const route = useRoute();

const navLinks = [
  { name: 'Home', slug: '/home' },
  { name: '공지사항', slug: '/notice' },
];
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.logo">
      <RouterLink to="/">WhereIsMyHome</RouterLink>
    </div>
    <div>
      <NavLink
        v-for="link in navLinks"
        :key="link.slug"
        :slug="link.slug"
        :active="link.slug == route.path"
      >
        {{ link.name }}
      </NavLink>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 3.5rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ededed;
}

.logo {
  font-size: 0.625rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>
