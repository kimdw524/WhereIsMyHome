<script setup>
import { kakaoOAuth } from '@/apis/Signup';
import { useAlertStore } from '@/stores/alert';
import { useUserStore } from '@/stores/user';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { alert } = useAlertStore();
const { signIn } = useUserStore();

kakaoOAuth({
  redirectURI: 'https://localhost:5173/oauth',
  code: route.query.code,
})
  .then((result) => {
    signIn(
      result.data.body.id,
      result.data.body.email,
      result.data.body.name,
      result.data.body.admin,
    );
    router.push('/home');
  })
  .catch((error) => {
    alert('OAuth 인증을 실패했습니다.');
    router.push('/home');
  });
</script>

<template>
  <div :class="$style.container">OAuth 로그인 중입니다...</div>
</template>

<style module>
.container {
  margin-top: 2rem;

  font-size: 1.125rem;
  text-align: center;
}
</style>
