<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Layout from './components/Layout.vue';
const router = useRouter();
const navBar = ref(false);

router.beforeEach((to, from, next) => {
  navBar.value = !to.meta.hideNavBar;
  next();
});
</script>

<template>
  <template v-if="navBar">
    <Layout>
      <RouterView />
    </Layout>
  </template>
  <template v-else>
    <RouterView />
  </template>
</template>
