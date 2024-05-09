@ -1,104 +0,0 @@
<script setup>
import Button from '@/components/Common/Button.vue';
import Checkbox from '@/components/Common/Checkbox.vue';
import TextField from '@/components/Common/TextField.vue';
import IconButton from '@/components/Common/IconButton.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const agree = ref(false);
const router = useRouter();

const handleSignUp = () => {
  alert(email.value);
};

const goSignUp = () => {
  router.push('/signin');
};
</script>

<template>
  <Transition name="fade" appear>
    <div :class="$style.container">
      <div :class="$style.header">회원가입</div>
      <div :class="$style.inputForm">
        <TextField label="이메일 주소" v-model="email" />
        <TextField type="password" label="비밀번호" />
        <TextField type="password" label="비밀번호 확인" />
        <TextField label="닉네임" />
      </div>
      <div :class="$style.autoLogin"><Checkbox v-model="agree">약관에 동의합니다.</Checkbox></div>
      <div :class="$style.submitForm">
        <div>
          <IconButton text="뒤로가기" @click="goSignUp">
            <font-awesome-icon :icon="['fas', 'angle-left']" />
          </IconButton>
        </div>
        <Button @click="handleSignUp">회원가입</Button>
      </div>
    </div>
  </Transition>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: 360px;
  height: 100%;
  margin: 0 auto;
  padding: 1.5rem 0;
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
  margin: 1.5rem 0 1rem;
}

.submitForm {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
</style>
