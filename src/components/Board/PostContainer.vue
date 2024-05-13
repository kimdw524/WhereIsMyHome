<script setup>
import Button from '@/components/Common/Button.vue';
import Select from '@/components/Common/Select.vue';
import TextField from '@/components/Common/TextField.vue';
import { ref } from 'vue';

const emit = defineEmits({ search: Object });
const searchType = ref(1);
const query = ref('');
const props = defineProps({
  title: String,
});

const handleSearch = () => {
  emit('search', { type: searchType.value, query: query.value });
};
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.title">{{ title }}</div>

      <form @submit.prevent="handleSearch">
        <div :class="$style.searchContainer">
          <Select style="width: 12rem" v-model.number="searchType">
            <option value="1">전체</option>
            <option value="2">제목</option>
            <option value="3">내용</option>
          </Select>
          <TextField v-model="query" placeholder="검색어를 입력해 주세요." />
          <Button type="submit" style="flex-shrink: 0">검색</Button>
        </div>
      </form>
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>

<style module>
.container {
  position: relative;

  max-width: 1024px;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;

  padding: 1.5rem 0 2rem 0;

  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 80%, rgba(255, 255, 255, 0) 100%);

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 1.5rem;
  }
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.searchContainer {
  display: flex;
  align-items: center;
  flex-basis: 1;
  gap: 0.75rem;

  width: 500px;

  @media (max-width: 768px) {
    width: 100%;
  }
}
</style>
