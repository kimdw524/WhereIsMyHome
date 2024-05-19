<script setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const user = useUserStore();
const router = useRouter();
const popup = ref(false);

const doLogout = () => {
  user.logOut();
  router.push('/home');
};
</script>
<template>
  <div :class="$style.container" @click="popup = !popup">
    <font-awesome-icon :icon="['fas', 'user']" :class="$style.icon" />
    <TransitionGroup name="fade" tag="div">
      <div v-if="popup" :class="$style.popup">
        <div :class="$style.email">
          <span>이메일</span>
          <div>{{ user.userData.email || '...' }}</div>
        </div>
        <div :class="$style.menuContainer">
          <div :class="$style.menu">내 정보</div>
          <div :class="$style.menu" @click="doLogout()">로그아웃</div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;

  background-color: #74809b;

  cursor: pointer;
  user-select: none;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;

  color: #fff;
}

.popup {
  position: absolute;
  top: calc(100% + 1rem);
  right: 0;
  z-index: 20;

  width: 15rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.5rem 0.0625rem rgba(167, 167, 167, 0.33);

  background-color: var(--bg);

  cursor: default;
}

.email {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  padding: 1rem;

  font-size: 0.875rem;
  font-weight: 300;
}

.email span {
  font-weight: 600;
}

.menuContainer {
  display: flex;
  flex-direction: column;
}

.menu {
  padding: 1rem;

  border-top: 1px solid #ebebeb;

  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;

  transition: all 100ms ease;

  cursor: pointer;
}

.menu:hover {
  background-color: #f3f5f7;
}

.menu:last-child {
  border-bottom: 1px solid #ebebeb;
}
</style>
