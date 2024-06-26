import Home from '@/views/Home.vue';
import Intro from '@/views/Intro.vue';
import Map from '@/views/Map.vue';
import Board from '@/views/Board.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import WritePost from '@/views/WritePost.vue';
import { createRouter, createWebHistory } from 'vue-router';
import ReadPost from '@/views/ReadPost.vue';
import OAuth from '@/views/OAuth.vue';
import FindPassword from '@/views/FindPassword.vue';
import MyPage from '@/views/MyPage.vue';
import EditPost from '@/views/EditPost.vue';

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
    path: '/board/:name',
    component: Board,
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
    path: '/board/write/:name',
    component: WritePost,
  },
  {
    path: '/board/:name/:id',
    component: ReadPost,
  },
  {
    path: '/map',
    component: Map,
    meta: {
      footer: false,
    },
  },
  {
    path: '/oauth',
    component: OAuth,
  },
  {
    path: '/findpassword',
    component: FindPassword,
  },
  {
    path: '/mypage',
    component: MyPage,
  },
  {
    path: '/board/edit/:id',
    component: EditPost,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
