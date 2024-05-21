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

<style>
.ql-snow {
  border: 0 !important;
  border-bottom: 1px solid #d1d5db !important;
}
</style>

<style module>
.wrapper {
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}
.container {
  position: relative;
  overflow: hidden;

  box-shadow: 0 0 0.125rem 0rem rgba(60, 60, 60, 0.35);
  box-sizing: border-box;

  font-weight: 400;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1rem;
  border-bottom: 1px solid #e7e7e7;
  box-shadow: 0 0.125rem 0.5rem 0 rgba(218, 218, 210, 0.3);

  background-color: rgb(248, 248, 248);
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
</style>
