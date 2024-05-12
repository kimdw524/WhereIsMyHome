<script setup>
import TextField from '@/components/Common/TextField.vue';
import Button from '@/components/Common/Button.vue';
</script>

<template>
  <Transition name="fade2" appear>
    <div :class="$style.container">
      <h2>게시글 작성</h2>
      <TextField placeholder="제목"></TextField>
      <TextField type="textarea" placeholder="내용" height="300px"></TextField>
      <Button>글쓰기</Button>
    </div>
  </Transition>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
</style>
