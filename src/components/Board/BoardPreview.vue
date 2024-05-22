<script setup>
import { ref } from 'vue';

const props = defineProps({ name: String });
const title = ref('');

switch (props.name) {
  case 'notice':
    title.value = '공지사항';
    break;
  case 'free':
    title.value = '자유게시판';
    break;
  default:
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.title">
      {{ title }}
    </div>
  </div>
</template>

<style module>
.container {
  flex: 1;

  padding: 0.5rem;
  border: 1px solid red;
  box-sizing: border-box;
}

.title {
  font-size: 1.125rem;
  font-weight: 400;
}
</style>
