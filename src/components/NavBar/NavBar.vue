<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import NavLink from './NavLink.vue';
import NavMenu from './NavMenu.vue';
import Profile from './Profile.vue';
import { useUserStore } from '@/stores/user';
import ThemeToggle from './ThemeToggle.vue';

const route = useRoute();
const user = useUserStore();
const toggle = ref(false);

const navLinks = [
  { name: 'Home', slug: '/home' },
  { name: '지도', slug: '/map' },
  { name: '공지사항', slug: '/board/notice' },
  { name: '자유게시판', slug: '/board/free' },
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
      <div :class="$style.hamburger" @click="toggle = !toggle">
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>
      <div :class="[toggle && $style.shadow]" @click="toggle = false">
        <div :class="[$style.navItem, toggle && $style.active]">
          <NavLink
            v-for="link in navLinks"
            :key="link.slug"
            :slug="link.slug"
            :active="link.slug == route.path"
          >
            {{ link.name }}
          </NavLink>
          <div :class="$style.menuContainer">
            <template v-if="user.isLoggedIn">
              <Profile />
            </template>
            <template v-else>
              <NavMenu slug="/signin">로그인</NavMenu>
            </template>
            <ThemeToggle />
          </div>
        </div>
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
  box-sizing: border-box;
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
  display: flex;
  align-items: center;
  gap: 1rem;

  margin-left: 1rem;
}

.menuContainer * {
  @media (max-width: 576px) {
    text-align: center !important;
  }
}

.navItem * {
  @media (max-width: 576px) {
    width: 100%;
    box-sizing: border-box;
    text-align: right;
  }
}

.navItem {
  display: flex;
  align-items: center;

  @media (max-width: 576px) {
    display: none;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;

    width: 20rem;
    max-width: calc(100% - 4rem);
    height: 100%;
    padding: 1rem;
    box-shadow: -1px 0 6px #888888;
    box-sizing: border-box;

    background-color: var(--bg);

    transition: all 300ms ease;
    transition-property: transform, opacity;
  }
}

.navItem.active {
  @media (max-width: 576px) {
    display: flex;
  }
}

.hamburger {
  display: none;
  @media (max-width: 576px) {
    display: block;

    cursor: pointer;
  }
}

.shadow {
  @media (max-width: 576px) {
    position: fixed;
    inset: 0 0 0 0;
    z-index: 90;

    background-color: rgba(0, 0, 0, 0.3);

    transition: background-color 200ms ease;
  }
}
</style>
