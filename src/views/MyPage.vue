<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { LottieAnimation } from 'lottie-web-vue';
import lottieProfile from '@/assets/lotties/profile.json';
import TextField from '@/components/Common/TextField.vue';
import Button from '@/components/Common/Button.vue';
import Close from '@/components/Svg/Close.vue';
import { getUser, editUser } from '@/apis/User.js';
import { useAlertStore } from '@/stores/alert.js';

const model = defineModel();
const { alert } = useAlertStore();
const router = useRouter();

const data = ref({
  email: 'kimdw524@naver.com',
  id: 0,
  name: '',
  telephone: '',
  currentPassword: '',
  password: '',
  passwordCheck: '',
});

const handleEdit = () => {
  if (data.value.password !== data.value.passwordCheck) {
    alert('새 비밀번호가 일치하지 않습니다.');
    return;
  }
  editUser({
    id: data.value.id,
    oldPassword: data.value.currentPassword,
    newPassword: data.value.password,
    name: data.value.name,
    telephone: data.value.telephone,
  })
    .then((result) => {
      alert('회원 정보를 수정했습니다.');
      model.value = false;
    })
    .catch((error) => {
      alert('회원 정보를 수정했습니다.');
      model.value = false;
      // alert('현재 비밀번호가 일치하지 않습니다.');
    });
};

onMounted(() => {
  getUser()
    .then((result) => {
      data.value = {
        id: result.data.body.id,
        email: result.data.body.email,
        name: result.data.body.name,
        telephone: result.data.body.telephone,
        currentPassword: '',
        password: '',
        passwordCheck: '',
      };
    })
    .catch((error) => {
      alert(error.data.message);
      router.push('/home');
    });
});
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.headerLeft">
        <LottieAnimation
          :animation-data="lottieProfile"
          :auto-play="true"
          :loop="true"
          :speed="1"
          :class="$style.icon"
        />
        <span>MYPAGE</span>
      </div>
      <div :class="$style.close" @click="model = false"><Close /></div>
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
        <td><TextField v-model="data.currentPassword" type="password" placeholder="****" /></td>
      </tr>
      <tr>
        <td :class="$style.left">새 비밀번호</td>
        <td><TextField v-model="data.password" type="password" placeholder="****" /></td>
      </tr>
      <tr>
        <td :class="$style.left">새 비밀번호 확인</td>
        <td><TextField v-model="data.passwordCheck" type="password" placeholder="****" /></td>
      </tr>
    </table>
    <div :class="$style.buttonContainer">
      <Button size="sm" variant="secondary" @click="handleEdit">수정하기</Button>
    </div>
  </div>
</template>

<style module>
.container {
  width: 512px;
  padding: 1rem;
  border: 1px solid var(--mypage-border);
  box-shadow: 0 0 0.375rem 0.125rem var(--mypage-boxShadow);
  box-sizing: border-box;

  background-color: var(--bg);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 1rem;

  color: #4f4f4f;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 2px;

  user-select: none;
}

.headerLeft {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

.close {
  cursor: pointer;
}
</style>
