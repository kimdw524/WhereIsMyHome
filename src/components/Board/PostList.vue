<script setup>
const props = defineProps({
  data: Object,
});

const dateFormat = (time) => {
  return new Date(time * 1000).toLocaleString('ko', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h24',
  });
};
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.title">
      {{ data.title }}
    </div>
    <div :class="$style.info">
      <div>
        <span :class="$style.name">{{ data.name }}</span>
        <span :class="$style.date">{{ dateFormat(data.updatedAt) }}</span>
      </div>
      <div>
        <span :class="$style.viewCount"
          ><font-awesome-icon :icon="['far', 'eye']" />{{ data.viewCount }}</span
        >
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--post-separator);

  cursor: pointer;
}

.container:hover .title {
  text-decoration: underline;
}

.container:last-child {
  border-bottom: 0;
}

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 0.75rem;
}

.title {
  color: var(--color);
  font-size: 1.125rem;
  font-weight: 300;
}

.name {
  padding-right: 0.5rem;

  color: var(--post-color-light);
  font-size: 0.875rem;
  font-weight: 400;
}

.date {
  padding-left: 0.5rem;
  border-left: 1px solid var(--post-separator);

  color: var(--post-color-light);
  font-size: 0.875rem;
  font-weight: 300;
}

.viewCount {
  color: var(--post-color-light);
  font-size: 0.875rem;
  font-weight: 400;
}

.viewCount svg {
  margin-right: 0.25rem;
}
</style>
