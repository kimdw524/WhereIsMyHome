<script setup>
import { readPost } from '@/apis/Board';
import Button from '@/components/Common/Button.vue';
import { useAlertStore } from '@/stores/alert';
import { fullDateFormat } from '@/utils/utils';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { alert } = useAlertStore();

console.log(router);

const body = ref(null);

readPost('board', route.params.id)
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
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
  <Transition name="fade2" v-if="body" appear>
    <div :class="$style.wrapper">
      <div :class="$style.container">
        <div :class="$style.header">
          <div :class="$style.title">
            {{ body.title }}
          </div>
          <div :class="$style.detail">
            <div>{{ body.name }}<span>|</span>{{ fullDateFormat(body.updatedAt) }}</div>
            <div>조회수 {{ body.viewCount }}회</div>
          </div>
        </div>
        <div :class="$style.content" v-html="body.content"></div>
        <div :class="$style.footer">
          <Button variant="secondary" size="sm" @click="router.go(-1)">목록</Button>
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
  display: flex;
  justify-content: flex-end;

  padding: 1rem;
  border-top: 1px solid #e7e7e7;

  background-color: rgb(248, 248, 248);
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
</style>
