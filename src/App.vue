<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Layout from './components/Layout.vue';

const router = useRouter();
const navBar = ref(false);
const footer = ref(false);

router.beforeEach((to, from, next) => {
  navBar.value = !(to.meta.navBar === false);
  footer.value = !(to.meta.footer === false);

  next();
});
</script>

<template>
  <template v-if="navBar">
    <Layout :footer="footer">
      <RouterView />
    </Layout>
  </template>
  <template v-else>
    <RouterView />
  </template>
</template>
