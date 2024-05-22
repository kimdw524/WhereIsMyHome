<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
// route.query.code
</script>

<template>
  <div :class="$style.container">OAuth 로그인 중입니다...</div>
</template>

<style module>
.container {
  margin-top: 2rem;

  font-size: 1.125rem;
  text-align: center;
}
</style>
