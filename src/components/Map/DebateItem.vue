<script setup>
import { useUserStore } from '@/stores/user';
import { fullDateFormat } from '@/utils/utils';

defineProps({ data: Object });
defineEmits(['delete']);

const user = useUserStore();
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.name">{{ data.name }}</div>
      <div
        :class="$style.delete"
        v-if="user.userData.id == data.userId"
        @click="$emit('delete', data.id)"
      >
        삭제
      </div>
    </div>
    <div :class="$style.body">
      {{ data.content }}
    </div>
    <div :class="$style.date">
      {{ fullDateFormat(data.updatedAt) }}
    </div>
  </div>
</template>

<style module>
.container {
  padding: 1rem;
  border-bottom: 1px solid var(--map-houselist-border);
}

.header {
  display: flex;
  justify-content: space-between;
}

.name {
  color: var(--color-primary);
  font-weight: 400;
}

.date {
  color: var(--color-light);
  font-size: 0.875rem;
}

.body {
  margin: 0.875rem 0;

  font-size: 1rem;
  font-weight: 400;
}

.delete {
  color: var(--color);
  font-size: 0.875rem;
  word-break: keep-all;

  cursor: pointer;
}
</style>
