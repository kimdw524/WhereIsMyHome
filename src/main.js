import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './assets/main.css';

const routes = [
  {
    path: '/',
    component: () => import('./pages/Intro/Index.vue'),
    meta: {
      hideNavBar: true,
    },
  },
  {
    path: '/home',
    component: () => import('./pages/Home.vue'),
  },
  {
    path: '/notice',
    component: () => import('./pages/Notice.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

library.add(fas, far, fab);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');
