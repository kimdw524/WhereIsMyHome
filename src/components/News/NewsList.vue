<script setup>
import { getNews } from '@/apis/News';
import { onMounted, ref } from 'vue';

const news = ref([]);
const wrapper = ref(null);

const LIMIT = 8;

const cardWidth = 16 * 17;
let current = 0,
  offset = 0;

const ellipsis = (text) => {
  if (text.length > 30) return text.substr(0, 30) + '...';
  return text;
};

const forwardNews = (link) => {
  window.open(link);
};

const handleWheel = (event) => {
  const direction = event.deltaX || event.deltaY > 0;
  event.preventDefault();

  current += direction ? 1 : -1;
  current = Math.min(
    news.value.length - Math.ceil(wrapper.value.offsetWidth / cardWidth) + 1,
    Math.max(current, 0),
  );

  if (wrapper.value.scrollWidth - wrapper.value.offsetWidth - wrapper.value.scrollLeft < 300) {
    appendNews((offset += LIMIT));
  }

  wrapper.value.scrollLeft = current * cardWidth;
};

const appendNews = (offset) => {
  getNews(offset)
    .then((result) => {
      news.value.push(...result.data.body);
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(() => {
  wrapper.value.addEventListener('wheel', handleWheel, { passive: false });

  appendNews(0);
});
</script>

<template>
  <div :class="$style.wrapper" ref="wrapper">
    <div :class="$style.container">
      <div
        :class="$style.card"
        v-for="item in news"
        :key="item.link"
        @click="forwardNews(item.link)"
      >
        <img :src="item.thumbnail" :class="$style.thumbnail" alt="thumbnail" />
        <div :class="$style.title">{{ ellipsis(item.title) }}</div>
        <div :class="$style.source">
          <div :class="$style.press">{{ item.press }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.wrapper {
  overflow-x: scroll;

  padding-top: 0.5rem;
  max-width: 100%;
  padding-bottom: 0.5rem;

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

.wrapper::-webkit-scrollbar {
  width: 0.375rem;
  height: 0.375rem;

  background-color: transparent;
}

.wrapper::-webkit-scrollbar-thumb {
  border-radius: 0.125rem;

  background-color: var(--scrollbar-thumb-bg);
}

.container {
  display: flex;
  gap: 1rem;

  width: fit-content;
}

.card {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  width: 16rem;
  border: 1px solid var(--card-border-color);
  border-radius: 0.25rem;
  box-sizing: border-box;

  cursor: pointer;

  transition: all 200ms ease;
}

.card:hover {
  transform: translateY(-0.5rem);
}

.thumbnail {
  flex: 0 0;

  width: 100%;
  aspect-ratio: 16 / 9;
}

.title {
  flex: 1 1 auto;

  padding: 0.75rem;

  font-size: 1.125rem;
  font-weight: 400;
  line-height: 150%;
}

.source {
  display: flex;
  flex: 0 0;
  justify-content: space-between;

  padding: 0.75rem;
}

.press {
  font-size: 0.875rem;
}
</style>
