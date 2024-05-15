<script setup>
import { useRoute } from 'vue-router';
import NavLink from './NavLink.vue';
import NavMenu from './NavMenu.vue';

const route = useRoute();

const navLinks = [
  { name: 'Home', slug: '/home' },
  { name: '지도', slug: '/map' },
  { name: '공지사항', slug: '/notice' },
  { name: 'QnA', slug: '/qna' },
];
</script>

<template>
  <div :class="$style.container">
    <div>
      <RouterLink to="/">
        <div :class="$style.logoContainer">
          <img src="@/assets/images/logo.png" :class="$style.logo" alt="logo" />
          <img src="@/assets/images/textlogo.png" :class="$style.textLogo" alt="text logo" />
        </div>
      </RouterLink>
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
      <div :class="$style.menuContainer">
        <NavMenu slug="/signin">로그인</NavMenu>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex: 0 0 6rem;
  align-items: center;
  justify-content: space-between;

  padding: 0.5rem 2.5rem;
  /* border-bottom: 1px solid var(--navbar-border); */

  @media (max-width: 768px) {
    flex: 0 0 5rem;
    padding: 0.5rem 1.5rem;
  }
}

.logoContainer {
  display: inline-flex;
  align-items: center;

  width: 6rem;
}

.logo {
  height: 2.25rem;
}

.textLogo {
  height: 1rem;
  margin: 0 0.75rem;
}

.menuContainer {
  display: inline-block;
  margin-left: 0.5rem;
}
</style>
