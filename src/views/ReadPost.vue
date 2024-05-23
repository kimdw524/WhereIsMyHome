<script setup>
import { readPost, deletePost } from '@/apis/Board';
import Comment from '@/components/Board/Comment.vue';
import { fullDateFormat } from '@/utils/utils';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ListIcon from '@/components/Svg/List.vue';
import { useUserStore } from '@/stores/user';
import { useAlertStore } from '@/stores/alert';
import Button from '@/components/Common/Button.vue';

const route = useRoute();
const router = useRouter();
const user = useUserStore();
const { alert } = useAlertStore();

const body = ref(null);

const handleDelete = () => {
  deletePost(route.params.name === 'notice' ? 'boardNotice' : 'board', route.params.id)
    .then((result) => {
      alert('게시글을 삭제했습니다.');
      history.go(-1);
    })
    .catch((error) => {
      alert('게시글 삭제를 실패했습니다.');
    });
};

readPost(route.params.name === 'notice' ? 'boardNotice' : 'board', route.params.id)
  .then((result) => {
    body.value = result.data.body;
  })
  .catch((error) => {
    history.go(-1);
  });
</script>

<template>
  <div :class="$style.top">
    <div :class="$style.topHeader">
      <div :class="$style.topTitle">자유게시판</div>
      <div :class="$style.list" @click="router.go(-1)">
        <ListIcon />
      </div>
    </div>
  </div>
  <Transition name="fade2" v-if="body" appear>
    <div :class="$style.wrapper">
      <div :class="$style.container">
        <div :class="$style.header">
          <div :class="$style.title">
            <div>
              {{ body.title }}
            </div>
            <div v-if="body.userId === user.userData.id" :class="$style.buttonContainer">
              <span>수정</span>
              <span :class="$style.delete" @click="handleDelete">삭제</span>
            </div>
          </div>
          <div :class="$style.detail">
            <div>{{ body.name }}<span>|</span>{{ fullDateFormat(body.updatedAt) }}</div>
            <div>조회수 {{ body.viewCount }}회</div>
          </div>
        </div>
        <div :class="$style.content" v-html="body.content"></div>
        <div :class="$style.footer">
          <Comment
            v-if="$route.params.name !== 'notice'"
            :name="route.params.name"
            :id="route.params.id"
          />
          <div v-else :class="$style.footerItem">
            <Button @click="$router.push('/board/notice')">목록</Button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style module>
.top {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid var(--map-header-border-top);
}

.topHeader {
  display: flex;
  justify-content: space-between;

  max-width: 1024px;
  margin: 0 auto;
}

.topTitle {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 2px;
}

.wrapper {
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}

.container {
  position: relative;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1rem;
  border-bottom: 1px solid #e7e7e7;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1.125rem;
  font-weight: 500;
}

.detail {
  display: flex;
  justify-content: space-between;
  color: var(--color-light);
  font-size: 0.875rem;
  font-weight: 400;
}

.detail span {
  margin: 0 0.375rem;
}

.content {
  min-height: 20rem;
  padding: 1rem;
}

.content p {
  margin: 0;
}

.footer {
  padding: 1rem;
  border-top: 1px solid #e7e7e7;
}

.list {
  width: 2rem;
  height: 2rem;

  transition: all 150ms ease;

  cursor: pointer;
}

.list:hover {
  color: var(--color-primary);
}

.list:active {
  transform: scale(0.95);
}

.footerItem {
  display: flex;
  justify-content: center;
}

.buttonContainer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;

  font-size: 0.875rem;
  font-weight: 400;
}

.buttonContainer > span {
  cursor: pointer;
}

.delete {
  color: var(--color-danger);
}
</style>
