<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps(['class', 'duration', 'to']);
const current = ref(0);

let timer,
  count = 0;

let duration = Math.floor(props.duration / 50) * 50;

const getCountUp = (count, duration, to) => {
  return Math.round(Math.sin((((count / duration + 0.25) / 1.25) * Math.PI) / 2) * to);
};

current.value = getCountUp(0, duration, props.to).toLocaleString();

onMounted(() => {
  timer = setInterval(() => {
    current.value = getCountUp(
      count >= 900 ? (count >= 980 ? (count += 2) : (count += 10)) : (count += 50),
      duration,
      props.to,
    ).toLocaleString();

    if (count >= duration) {
      clearInterval(timer);
    }
  }, 50);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <span :class="[props.class, $style.text]">
    <span :class="$style.visible">{{ current }}</span>
    <span :class="$style.clone">{{ Number(to).toLocaleString() }}</span>
  </span>
</template>

<style module>
.text {
  display: inline-block;
  position: relative;

  font-weight: 600;
  text-align: center;
}

.visible {
  position: absolute;
  right: 0;
  left: 0;
}

.clone {
  visibility: hidden;
}
</style>
