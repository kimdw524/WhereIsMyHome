<script setup>
import TextField from '@/components/Common/TextField.vue';
import { ref } from 'vue';
import Button from '../Common/Button.vue';
import { writeComment, getComments, deleteComment } from '@/apis/Board';
import DebateItem from '../Map/DebateItem.vue';
import { useAlertStore } from '@/stores/alert';

const props = defineProps({ name: String, id: String });
const text = ref('');
const comments = ref([]);
const { alert } = useAlertStore();

const updateComment = () => {
  getComments(props.id)
    .then((result) => {
      comments.value = result.data.body;
    })
    .catch((error) => {
      console.error(error);
    });
};

const handleSubmit = () => {
  if (text.value.trim() === '') return;
  writeComment(props.id, text.value)
    .then((result) => {
      text.value = '';
      updateComment();
    })
    .catch((error) => {
      console.error(error);
    });
};

const handleDelete = (id) => {
  deleteComment(props.id, id)
    .then((result) => {
      updateComment();
      alert('댓글을 삭제했습니다.');
    })
    .catch((error) => {
      alert('댓글 삭제 오류가 발생하였습니다.');
    });
};

updateComment();
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.commentCount">
      댓글 <span>{{ comments.length }}개</span>
    </div>
    <form @submit.prevent="handleSubmit">
      <div :class="$style.textContainer">
        <TextField v-model="text" />
        <Button type="submit">등록</Button>
      </div>
    </form>
  </div>
  <DebateItem
    v-for="comment in comments"
    :data="comment"
    :key="comment.id"
    @delete="handleDelete"
  />
</template>

<style module>
.container {
  width: 100%;
  padding: 1rem 0;
}

.commentCount {
  padding-bottom: 1rem;

  font-size: 1.125rem;
  font-weight: 300;
}

.commentCount span {
  font-weight: 500;
}

.textContainer {
  display: flex;
  gap: 0.75rem;
}
</style>
