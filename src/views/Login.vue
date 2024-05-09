<script setup>
import Button from '@/components/Common/Button.vue';
import Checkbox from '@/components/Common/Checkbox.vue';
import TextField from '@/components/Common/TextField.vue';
import { ref } from 'vue';

const email = ref('');
const autoLogin = ref(false);

const handleLogin = () => {
  alert(email.value);
};

const handleKakao = () => {
  window.open(
    'https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fwww.tmon.co.kr%252Fuser%252Fsocialcallback%26state%3D7b22736e735470223a226b616b616f222c227265646972656374557269223a2268747470733a5c2f5c2f7777772e746d6f6e2e636f2e6b725c2f757365725c2f736f6369616c63616c6c6261636b222c227265717565737450617468223a225c2f222c2272657475726e55726c223a22222c22636f6d706c65746555726c223a225c2f222c226f70656e54797065223a22706f707570222c22736e734f726967696e223a2268747470733a5c2f5c2f7777772e746d6f6e2e636f2e6b72227d%26through_account%3Dtrue%26client_id%3Dce7333e7f39d0197109bc1f09398108a#login',
  );
};
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">이메일로 로그인</div>
    <div :class="$style.inputForm">
      <TextField label="이메일 주소" v-model="email" />
      <TextField type="password" label="비밀번호" />
    </div>
    <div :class="$style.autoLogin"><Checkbox v-model="autoLogin">자동 로그인</Checkbox></div>
    <div :class="$style.submitForm">
      <div>
        아직 계정이 없으신가요?
        <RouterLink to="signup" :class="$style.signup">회원가입</RouterLink>
      </div>
      <Button @click="handleLogin">로그인</Button>
    </div>
    <div :class="$style.oauthContainer">
      <Button variant="kakao" :class="$style.oauth" @click="handleKakao">
        <img src="@/assets/images/kakao.png" />카카오로 로그인
      </Button>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: 360px;
  height: 100%;
  margin: 0 auto;
  padding: 1rem;
}

.header {
  padding: 1.5rem 0;

  font-size: 1.5rem;
  font-weight: 600;
}

.inputForm {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.autoLogin {
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

.signup {
  color: var(--login-link-color);
  font-weight: 600;
  text-decoration: none;
}
</style>
