<script setup></script>

<template>
  <div :class="$style.container">
    <div :class="$style.title">구해줘 홈즈</div>
    <div :class="$style.body">내용</div>
    <div>
      <!-- <button :class="$style.go">test1</button>
      <button :class="$style.go">test2</button> -->
    </div>
    <div :class="$style.downIcon">
      <font-awesome-icon :icon="['fas', 'chevron-down']" />
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;

  height: 100vh;
}

.title {
  margin-top: 8rem;

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
  letter-spacing: 1px;

  user-select: none;

  @media (max-width: 576px) {
    font-size: 1.25rem;
  }
}

.go {
  padding: 0.75rem 1.25rem;
  border: 0;
  border-radius: 0.25rem;

  background-color: rgb(45, 55, 71);

  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 1px;
  color: #fff;

  cursor: pointer;

  user-select: none;
}

@keyframes down {
  0% {
    transform: translateY(0);

    opacity: 1;
  }

  50% {
    transform: translateY(1.5rem);

    opacity: 0.2;
  }

  100% {
    transform: translateY(0);

    opacity: 1;
  }
}

.downIcon {
  position: absolute;
  bottom: 2rem;

  font-size: 2rem;

  animation: 2s ease-in-out down infinite;
}
</style>
