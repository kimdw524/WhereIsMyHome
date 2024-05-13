<script setup>
import { LottieAnimation } from 'lottie-web-vue';
import lottieSearch from '@/assets/lotties/search.json';
import { ref } from 'vue';
import SearchCollapse from './SearchCollapse.vue';

const collapsed = ref(false);
const searchIcon = ref(null);
let searchIconFrame = 0;

const handleFrame = () => {
  if (++searchIconFrame >= 45) {
    searchIcon.value.pause();
  }
};

const handleFocus = () => {
  searchIconFrame = 0;
  searchIcon.value.setDirection(1);
  searchIcon.value.play();

  collapsed.value = true;
};

const handleBlur = () => {
  searchIconFrame = 0;
  searchIcon.value.setDirection(-1);
  searchIcon.value.play();

  collapsed.value = false;
};
</script>

<template>
  <div :class="[$style.textContainer, collapsed && $style.collapsed]">
    <div :class="$style.icon">
      <LottieAnimation
        :animation-data="lottieSearch"
        :auto-play="false"
        :loop="false"
        :speed="1"
        :class="$style.right"
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
    />
  </div>
  <SearchCollapse :show="collapsed" />
</template>

<style module>
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
  flex: 0 0 2rem;
  position: relative;

  width: 2rem;
  height: 2rem;
  margin-left: 0.5rem;
}

.icon svg {
  position: absolute;
  top: -2rem;
  left: -2rem;

  width: 6rem !important;
  height: 6rem !important;
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
