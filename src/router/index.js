import Home from '@/views/Home.vue';
import Intro from '@/views/Intro.vue';
import Map from '@/views/Map.vue';
import Notice from '@/views/Notice.vue';
import QnA from '@/views/QnA.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import WritePost from '@/views/WritePost.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: Intro,
    meta: {
      navBar: false,
    },
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/notice',
    component: Notice,
  },
  {
    path: '/qna',
    component: () => QnA,
  },
  {
    path: '/signin',
    component: SignIn,
  },
  {
    path: '/signup',
    component: SignUp,
  },
  {
    path: '/write',
    component: WritePost,
  },
  {
    path: '/map',
    component: Map,
    meta: {
      footer: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
