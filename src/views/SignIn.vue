@ -1,104 +0,0 @@
<script setup>
import { signIn } from '@/apis/User';
import Button from '@/components/Common/Button.vue';
import Checkbox from '@/components/Common/Checkbox.vue';
import TextField from '@/components/Common/TextField.vue';
import { useAlertStore } from '@/stores/alert';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref(localStorage.getItem('email') || '');
const password = ref('');
const rememberId = ref(!!localStorage.getItem('email'));
const user = useUserStore();
const router = useRouter();
const { alert } = useAlertStore();

const handleLogin = () => {
  signIn({ email: email.value, password: password.value })
    .then((result) => {
      user.signIn(result.data.id, result.data.email, result.data.name, result.data.admin);
      router.push('/home');
      if (rememberId.value) {
        localStorage.setItem('email', result.data.email);
      } else {
        localStorage.removeItem('email');
      }
    })
    .catch((error) => {
      console.log(error);
      alert('아이디 또는 비밀번호를 확인해 주세요.');
    });
};

const handleKakao = () => {
  window.open(
    'https://kauth.kakao.com/oauth/authorize?client_id=d476f3898d6a5422a15bdea57516a63e&redirect_uri=https://localhost:5173/oauth&response_type=code',
  );
};
</script>

<template>
  <Transition name="fade" appear>
    <form @submit.prevent="handleLogin" :class="$style.container">
      <div :class="$style.header">이메일로 로그인</div>
      <div :class="$style.inputForm">
        <TextField label="이메일 주소" v-model="email" />
        <TextField type="password" v-model="password" label="비밀번호" />
      </div>
      <div :class="$style.autoLogin">
        <Checkbox v-model="rememberId">이메일 저장</Checkbox>
        <div>
          <RouterLink to="findpassword" :class="$style.linkLight">비밀번호 찾기</RouterLink>
        </div>
      </div>
      <div :class="$style.submitForm">
        <div>
          아직 계정이 없으신가요?
          <RouterLink to="signup" :class="$style.link">회원가입</RouterLink>
        </div>
        <Button type="submit">로그인</Button>
      </div>
      <div :class="$style.oauthContainer">
        <Button variant="kakao" :class="$style.oauth" @click.prevent="handleKakao">
          <img src="@/assets/images/kakao.png" />카카오로 로그인
        </Button>
      </div>
    </form>
  </Transition>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: 540px;
  height: 100%;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  box-sizing: border-box;
}

.header {
  margin-bottom: 1.5rem;

  font-size: 1.5rem;
  font-weight: 600;
}

.inputForm {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.autoLogin {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 1.5rem 0 1rem;
}

.submitForm {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.oauth {
  justify-content: center;

  width: 100%;
  height: 4rem;

  font-size: 1rem;
  font-weight: 500;
}

.oauth img {
  position: absolute;
  left: 1rem;
}

.oauthContainer {
  margin-top: 1rem;
}

.link {
  color: var(--login-link-color);
  font-weight: 600;
  text-decoration: none;
}

.linkLight {
  color: var(--login-link-color);
  font-weight: 500;
  text-decoration: none;
}
</style>
