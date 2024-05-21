<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Alert from './components/Alert/Alert.vue';
import Layout from './components/Layout.vue';
import { useAlertStore } from './stores/alert';
import { getCookie } from '@/utils/utils';
import { useUserStore } from '@/stores/user.js';

const router = useRouter();
const navBar = ref(false);
const footer = ref(false);
const { alerts } = useAlertStore();

const user = useUserStore();

router.beforeEach((to, from, next) => {
  navBar.value = !(to.meta.navBar === false);
  footer.value = !(to.meta.footer === false);

  if (getCookie('userData')) {
    const userData = JSON.parse(getCookie('userData'));
    user.signIn(userData.id, userData.email, userData.name, userData.admin);
  }

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
  <TransitionGroup name="fade2" tag="div">
    <Alert v-if="alerts.length" :key="alerts.at(-1).id" :data="alerts.at(-1)" />
  </TransitionGroup>
</template>
