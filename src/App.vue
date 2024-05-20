<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Alert from './components/Alert/Alert.vue';
import Layout from './components/Layout.vue';
import { useAlertStore } from './stores/alert';

const router = useRouter();
const navBar = ref(false);
const footer = ref(false);
const { alerts } = useAlertStore();

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
  <TransitionGroup name="fade2" tag="div">
    <Alert v-if="alerts.length" :key="alerts.at(-1).id" :data="alerts.at(-1)" />
  </TransitionGroup>
</template>
