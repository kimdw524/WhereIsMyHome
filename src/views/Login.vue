<script setup>
import Button from '@/components/Common/Button.vue';
import TextField from '@/components/Common/TextField.vue';
import { ref } from 'vue';

const email = ref('');

const handleLogin = () => {
  alert(email.value);
};
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">이메일로 로그인</div>
    <div :class="$style.inputForm">
      <TextField label="이메일 주소" v-model="email" />
      <TextField type="password" label="비밀번호" />
    </div>
    <div :class="$style.submitForm">
      <div>아직 계정이 없으신가요? 회원가입</div>
      <Button @click="handleLogin">로그인</Button>
    </div>
    <div :class="$style.oauthContainer">
      <Button variant="kakao" :class="$style.oauth">
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

.submitForm {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
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
</style>
