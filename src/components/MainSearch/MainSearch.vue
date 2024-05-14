<script setup>
import { LottieAnimation } from 'lottie-web-vue';
import lottieSearch from '@/assets/lotties/search.json';
import { ref } from 'vue';
import SearchCollapse from './SearchCollapse.vue';
import SearchHistory from './SearchHistory.vue';
import SearchResult from './SearchResult.vue';

const collapsed = ref(false);
const searchIcon = ref(null);
const query = ref('');

const handleFocus = () => {
  searchIcon.value.setDirection(1);
  searchIcon.value.play();

  collapsed.value = true;
};

const handleBlur = () => {
  searchIcon.value.setDirection(-1);
  searchIcon.value.play();

  collapsed.value = false;
};
</script>

<template>
  <div :class="$style.container">
    <div :class="[$style.textContainer, collapsed && $style.collapsed]">
      <div :class="$style.icon">
        <LottieAnimation
          :animation-data="lottieSearch"
          :auto-play="false"
          :loop="false"
          :speed="1"
          @enter-frame="handleFrame"
          ref="searchIcon"
        />
      </div>
      <input
        type="text"
        :class="$style.text"
        placeholder="지역 또는 단지명을 입력해 주세요."
        @focus="handleFocus"
        @blur="handleBlur"
        v-model="query"
      />
    </div>
    <SearchCollapse :show="collapsed">
      <SearchHistory v-if="query === ''" />
      <SearchResult v-else :query="query" />
    </SearchCollapse>
  </div>
</template>

<style module>
.container {
  position: relative;
}

.textContainer {
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  border: 1px solid #ddd;
  border-radius: 0.25rem;

  transition: all 200ms ease;
}

.textContainer.collapsed {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 2rem;
  position: relative;

  width: 2rem;
  height: 2rem;
  margin-left: 0.5rem;
}

.icon svg {
  width: 1.5rem !important;
  height: 1.5rem !important;
}

.text {
  width: 100%;
  height: 3.25rem;
  padding: 0 0.75rem 0 0.25rem;
  border: 0;

  font-size: 1.125rem;
  font-weight: 300;

  outline: none;
}
</style>
