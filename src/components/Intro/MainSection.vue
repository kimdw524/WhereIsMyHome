<script setup>
import { LottieAnimation } from 'lottie-web-vue';
import lottieHouse from '@/assets/lotties/house.json';
import CountUp from '@/components/Common/CountUp.vue';
import EnterButton from '@/components/Intro/EnterButton.vue';
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.left">
      <div :class="$style.title">집콕</div>
      <div :class="$style.body">
        <CountUp to="1505408" duration="1000" />개의 부동산 거래 데이터를 바탕으로<br />어쩌구
        저쩌구 어쩌구 저쩌구 시작하세요.
      </div>
      <div :class="$style.buttonWrapper">
        <EnterButton>시작하기</EnterButton>
      </div>
    </div>
    <LottieAnimation
      :animation-data="lottieHouse"
      :auto-play="true"
      :loop="false"
      :speed="1"
      :class="$style.right"
    />
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  position: relative;

  width: 100%;
  height: 100%;
  padding: 0 2rem;
  box-sizing: border-box;

  @media (max-width: 576px) {
    flex-direction: column-reverse;
    justify-content: flex-end;
  }
}

.title {
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: 1px;

  user-select: none;

  @media (max-width: 576px) {
    margin-top: 6rem;

    font-size: 2.5rem;
  }
}

.body {
  margin: 1.5rem 0;

  font-size: 1.5rem;
  font-weight: 400;
  line-height: 175%;
  letter-spacing: 1px;
  word-break: keep-all;

  user-select: none;

  @media (max-width: 576px) {
    font-size: 1.25rem;
  }
}

@keyframes fadeIn {
  from {
    transform: translateY(5rem);

    opacity: 0;
  }

  to {
    transform: none;

    opacity: 1;
  }
}

.left {
  z-index: 10;

  animation-name: fadeIn;
  animation-timing-function: ease;
  animation-duration: 500ms;
}

.right {
  @media (max-width: 576px) {
    height: 30vh;
  }
}

.buttonWrapper {
  @media (max-width: 576px) {
    text-align: right;
  }
}
</style>
