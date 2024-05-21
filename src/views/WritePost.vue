<script setup>
import Button from '@/components/Common/Button.vue';
import TextField from '@/components/Common/TextField.vue';
import { writePost } from '@/apis/Board';
import { useAlertStore } from '@/stores/alert';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { alert } = useAlertStore();
const editor = ref(null);
const title = ref('');

const handleSubmit = () => {
  let url = '';
  switch (route.params.name) {
    case 'free':
      url = 'board';
      break;
    case 'notice':
      url = 'boardNotice';
      break;
    default:
      alert('존재하지 않는 게시판입니다.');
      router.replace('/home');
      return;
  }
  writePost(url, { title: title.value, content: editor.value.getHTML() })
    .then((result) => {
      router.replace(`/board/${route.params.name}`);
    })
    .catch((error) => {
      alert('게시글 작성을 실패했습니다.');
    });
};
</script>

<template>
  <Transition name="fade2" appear>
    <div :class="$style.container">
      <div :class="$style.header">
        <TextField v-model="title" placeholder="제목"></TextField>
        <div :class="$style.write">
          <Button variant="secondary" size="sm" @click="handleSubmit">글쓰기</Button>
        </div>
      </div>
      <div>
        <QuillEditor ref="editor" :class="$style.editor" theme="snow" />
      </div>
    </div>
  </Transition>
</template>

<style>
.ql-snow {
  border: 0 !important;
  border-bottom: 1px solid #d1d5db !important;
}
</style>

<style module>
.container {
  overflow: hidden;

  max-width: 1024px;
  margin: 0 auto;
  margin-top: 2rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.125rem 0rem rgba(60, 60, 60, 0.5);
  box-sizing: border-box;

  font-weight: 400;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: 1rem;
  border-bottom: 1px solid #e7e7e7;

  background-color: var(--postlist-header-bg);
}

.write {
  display: flex;
  justify-content: center;

  width: 5rem;
}

.editor {
  height: 30rem;
  border: 0 !important;
}
</style>
