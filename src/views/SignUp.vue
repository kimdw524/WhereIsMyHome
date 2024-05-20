@ -1,104 +0,0 @@
<script setup>
import {
  signUp,
  validateEmail,
  validateName,
  validatePassword,
  validateTelephone,
} from '@/apis/Signup';
import Button from '@/components/Common/Button.vue';
import IconButton from '@/components/Common/IconButton.vue';
import ProgressBar from '@/components/Common/ProgressBar.vue';
import TextField from '@/components/Common/TextField.vue';
import { useAlertStore } from '@/stores/alert';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import JSConfetti from 'js-confetti';

const confetti = new JSConfetti();
const email = ref('');
const password = ref('');
const passwordCheck = ref('');
const name = ref('');
const telephone = ref('');
const progress = ref(0);
const router = useRouter();
const validation = ref({ email: '', password: '', passwordCheck: '', name: '', telephone: '' });
const { alert } = useAlertStore();
const handleSignUp = () => {
  signUp({
    email: email.value,
    password: password.value,
    name: name.value,
    telephone: telephone.value,
  })
    .then((result) => {
      router.push('/home');
      confetti.addConfetti({
        emojis: ['🧡', '🎈', '🎁', '🎐', '🎉'],
        emojiSize: 50,
        confettiNumber: 100,
      });
      alert('회원가입을 완료했습니다.');
    })
    .catch((error) => {
      alert(error?.response?.data?.message);
    });
};

const goSignIn = () => {
  router.push('/signin');
};

watch(email, (value) => {
  validateEmail(value)
    .then((result) => {
      if (value !== email.value) return;
      validation.value.email = '';
    })
    .catch((error) => {
      if (value !== email.value) return;
      validation.value.email = error?.response?.data?.message;
    });
});

watch(password, (value) => {
  validatePassword(value)
    .then((result) => {
      if (value !== password.value) return;
      validation.value.password = '';
    })
    .catch((error) => {
      if (value !== password.value) return;
      validation.value.password = error?.response?.data?.message;
    });
});

watch([password, passwordCheck], (value) => {
  if (password.value === value[1]) {
    validation.value.passwordCheck = '';
  } else {
    validation.value.passwordCheck = '비밀번호가 일치하지 않습니다.';
  }
});

watch(name, (value) => {
  validateName(value)
    .then((result) => {
      if (value !== name.value) return;
      validation.value.name = '';
    })
    .catch((error) => {
      if (value !== name.value) return;
      validation.value.name = error?.response?.data?.message;
    });
});

watch(telephone, (value) => {
  validateTelephone(value)
    .then((result) => {
      if (value !== telephone.value) return;
      validation.value.telephone = '';
    })
    .catch((error) => {
      if (value !== telephone.value) return;
      validation.value.telephone = error?.response?.data?.message;
    });
});
</script>

<template>
  <Transition name="fade" appear>
    <div :class="$style.container">
      <ProgressBar :value="progress" :max="5" />

      <div :class="$style.header">회원가입</div>
      <div :class="$style.inputForm">
        <TextField
          label="이메일 주소"
          v-model="email"
          @focus="progress = 1"
          :red="validation.email !== ''"
        />
        <div :class="$style.validation">{{ validation.email }}</div>
        <TextField
          type="password"
          v-model="password"
          label="비밀번호"
          @focus="progress = 2"
          :red="validation.password !== ''"
        />
        <div :class="$style.validation">{{ validation.password }}</div>
        <TextField
          type="password"
          v-model="passwordCheck"
          label="비밀번호 확인"
          @focus="progress = 3"
          :red="validation.passwordCheck !== ''"
        />
        <div :class="$style.validation">{{ validation.passwordCheck }}</div>
        <TextField
          label="이름"
          @input="name = $event.target.value"
          @focus="progress = 4"
          :red="validation.name !== ''"
        />
        <div :class="$style.validation">{{ validation.name }}</div>
        <TextField
          label="전화번호"
          v-model="telephone"
          @focus="progress = 5"
          :red="validation.telephone !== ''"
        />
        <div :class="$style.validation">{{ validation.telephone }}</div>
      </div>
      <div :class="$style.submitForm">
        <div>
          <IconButton text="뒤로가기" @click="goSignIn">
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

  max-width: 540px;
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
  gap: 0.75rem;
}

.validation {
  color: rgb(255, 32, 32);
  font-size: 0.875rem;
  font-weight: 400;
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
