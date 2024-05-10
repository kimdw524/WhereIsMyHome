<script setup>
const posts = [{ title: '', content: '', updatedAt: '' }];
</script>

<template>
  <div :class="$style.container">
    <h1>공지사항</h1>
  </div>
</template>

<style module>
.container {
  padding: 1rem;
}
</style>
