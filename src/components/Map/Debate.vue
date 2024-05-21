<script setup>
import { getDebate, writeDebate, deleteDebate } from '@/apis/Home';
import lottieCloudy from '@/assets/lotties/cloudy.json';
import { useAlertStore } from '@/stores/alert';
import { LottieAnimation } from 'lottie-web-vue';
import { onMounted, ref } from 'vue';
import Button from '../Common/Button.vue';
import TextField from '../Common/TextField.vue';
import DebateItem from './DebateItem.vue';

const props = defineProps({ houseCode: Number });
const query = ref('');
const comments = ref([]);
const { alert } = useAlertStore();

const getList = () => {
  getDebate(props.houseCode)
    .then((result) => {
      comments.value = result.data.body.reverse();
    })
    .catch((error) => {
      console.error(error);
      alert('매물토론 목록을 가져오지 못했습니다.');
    });
};

const handleSubmit = () => {
  writeDebate(props.houseCode, query.value)
    .then((result) => {
      getList();
      query.value = '';
    })
    .catch((error) => {
      console.error(error);
      alert('매물토론 작성 도중 오류가 발생하였습니다.');
    });
};

const handleDelete = (id) => {
  deleteDebate(props.houseCode, id)
    .then((result) => {
      getList();
    })
    .catch((error) => {
      console.error(error);
      alert('삭제 도중 오류가 발생하였습니다.');
    });
};

onMounted(() => {
  getList();
});
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <form @submit.prevent="handleSubmit">
        <TextField v-model="query" placeholder="내용을 입력하세요." />
        <Button size="sm">등록</Button>
      </form>
    </div>
    <div v-if="comments.length">
      <DebateItem
        v-for="comment in comments"
        :key="comment.id"
        :data="comment"
        @delete="handleDelete"
      />
    </div>
    <div v-else :class="$style.empty">
      <LottieAnimation
        :animation-data="lottieCloudy"
        :auto-play="true"
        :loop="true"
        :speed="1"
        :class="$style.icon"
      />
      <span>아직 글이 없습니다.</span>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;

  height: 100%;
}

.header {
  flex: 0 0;
  position: sticky;
  top: 0;

  padding: 1rem;

  background-color: var(--bg);
}

.header form {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.empty {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 1rem;

  text-align: center;

  .icon {
    width: 5rem;
    margin: 0 auto;
    margin-bottom: 0.75rem;
  }

  span {
    font-weight: 400;
  }
}
</style>
