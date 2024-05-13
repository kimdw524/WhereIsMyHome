<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import SearchHistory from './SearchHistory.vue';

const props = defineProps({ show: Boolean });

const container = ref(null);
const wrapper = ref(null);

onMounted(() => {
  container.value.style.display = 'none';

  container.value.addEventListener('transitionend', () => {
    if (!props.show) {
      container.value.style.display = 'none';
    }
  });
});

onUpdated(() => {
  const show = props.show;
  if (show) {
    container.value.style.display = 'block';
    wrapper.value.style.height = 'auto';

    const height = wrapper.value.offsetHeight;
    wrapper.value.style.height = '0';
    wrapper.value.offsetHeight;
    wrapper.value.style.height = `${height}px`;
  } else {
    wrapper.value.style.height = '0';
  }
});
</script>

<template>
  <div :class="$style.container" ref="container">
    <div :class="$style.wrapper" ref="wrapper">
      <SearchHistory :show="props.show" />
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 100;

  width: 100%;
  box-sizing: border-box;

  border: 1px solid #ddd;
  border-top: 0;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  box-shadow: 0 0.375rem 0.25rem 0 #f1f1f1;

  background-color: var(--bg);
}

.wrapper {
  overflow: hidden;

  height: 0;

  transition: all 200ms ease;
}
</style>
