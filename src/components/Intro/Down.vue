<template>
  <div :class="$style.downIcon">
    <font-awesome-icon :icon="['fas', 'chevron-down']" />
  </div>
</template>

<style module>
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
  right: 0;
  bottom: 2rem;
  left: 0;

  font-size: 2rem;
  text-align: center;

  animation: 2s ease-in-out down infinite;
}
</style>
