<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { LottieAnimation } from 'lottie-web-vue';
import lottieProfile from '@/assets/lotties/profile.json';
import TextField from '@/components/Common/TextField.vue';
import Button from '@/components/Common/Button.vue';
import { getUser } from '@/apis/User.js';
import { useAlertStore } from '@/stores/alert.js';

const { alert } = useAlertStore();
const router = useRouter();

const data = ref({
  email: 'kimdw524@naver.com',
  name: '',
  telephone: '',
  currentPassword: '',
  password: '',
  passwordCheck: '',
});

onMounted(() => {
  getUser()
    .then((result) => {})
    .catch((error) => {
      alert(error.data.message);
      router.push('/home');
    });
});
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.container">
      <div :class="$style.header">
        <LottieAnimation
          :animation-data="lottieProfile"
          :auto-play="true"
          :loop="true"
          :speed="1"
          :class="$style.icon"
        />
        <span>MYPAGE</span>
      </div>
      <table :class="$style.formTable">
        <tr>
          <td :class="$style.left">이메일 주소</td>
          <td><TextField v-model="data.email" readonly /></td>
        </tr>
        <tr>
          <td :class="$style.left">이름</td>
          <td><TextField v-model="data.name" /></td>
        </tr>
        <tr style="border-bottom: 1px solid var(--color)">
          <td :class="$style.left">전화번호</td>
          <td><TextField v-model="data.telephone" /></td>
        </tr>
        <tr>
          <td :class="$style.left">현재 비밀번호</td>
          <td><TextField v-model="data.currentPassword" type="password" /></td>
        </tr>
        <tr>
          <td :class="$style.left">새 비밀번호</td>
          <td><TextField v-model="data.password" type="password" /></td>
        </tr>
        <tr>
          <td :class="$style.left">새 비밀번호 확인</td>
          <td><TextField v-model="data.passwordCheck" type="password" /></td>
        </tr>
      </table>
      <div :class="$style.buttonContainer">
        <Button size="sm">수정하기</Button>
      </div>
    </div>
  </div>
</template>

<style module>
.wrapper {
  width: 100%;
  max-width: 512px;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 1rem;
}

.container {
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid var(--mypage-border);
  border-radius: 0.25rem;
  box-shadow: 0 0 0.375rem 0.125rem var(--mypage-boxShadow);

  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  margin-bottom: 1rem;

  color: #4f4f4f;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 2px;

  user-select: none;
}

.icon {
  width: 4rem;
  height: 4rem;
}

.formTable {
  width: 100%;
  border-collapse: collapse;
}

.formTable tr {
  border-bottom: 1px solid var(--post-separator);
}

.formTable tr:last-child {
  border-bottom: 0;
}

.formTable td {
  padding: 0.5rem 0.125rem;
}

.formTable td input {
  border: 0 !important;
}

.formTable td.left {
  width: 6rem;

  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;

  user-select: none;
}

.buttonContainer {
  display: flex;
  justify-content: flex-end;
}
</style>
