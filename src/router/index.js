import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/Intro.vue'),
    meta: {
      hideNavBar: true,
    },
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/notice',
    component: () => import('@/views/Notice.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/signup',
    component: () => import('@/views/Signup.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
