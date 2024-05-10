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
    path: '/qna',
    component: () => import('@/views/QnA.vue'),
  },
  {
    path: '/signin',
    component: () => import('@/views/SignIn.vue'),
  },
  {
    path: '/signup',
    component: () => import('@/views/SignUp.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
