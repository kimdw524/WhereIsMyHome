<script setup>
const props = defineProps({ news: Array });

const ellipsis = (text) => {
  if (text.length > 30) return text.substr(0, 30) + '...';
  return text;
};
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.card" v-for="item in props.news" :key="item.link">
      <img :src="item.thumbnail" :class="$style.thumbnail" alt="thumbnail" />
      <div :class="$style.title">{{ ellipsis(item.title) }}</div>
      <div :class="$style.source">
        <div :class="$style.journalist">{{ item.journalist }}</div>
        <div :class="$style.press">{{ item.press }}</div>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  gap: 1rem;
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

.journalist {
  font-size: 0.875rem;
  font-weight: 500;
}

.press {
  font-size: 0.875rem;
}
</style>
