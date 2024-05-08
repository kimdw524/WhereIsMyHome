<script setup>
import TextField from '@/components/Common/TextField.vue';
import { shallowRef, ref } from 'vue';

const email = ref('');

const handleLogin = () => {
  alert(email.value);
};
</script>

<template>
  <div :class="$style.container">
    <h1>이메일 주소로 로그인</h1>
    <div :class="$style.inputForm">
      <TextField label="이메일 주소" v-model="email" />
      <TextField type="password" label="비밀번호" />
    </div>
    <div :class="$style.submitForm">
      <button :class="$style.login" @click="handleLogin">로그인</button>
    </div>
  </div>
</template>

<style module>
.container {
  max-width: 576px;
  margin: 0 auto;
  padding: 1rem;
}

.inputForm {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login {
  padding: 0.75rem 1.25rem;

  border: 1px solid red;
}

.submitForm {
  padding: 1rem 0;
}
</style>
