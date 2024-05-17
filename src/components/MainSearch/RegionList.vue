<script setup>
const props = defineProps({ query: String, item: Object });

const highlight = (text) => {
  return text.replaceAll(props.query, `<span>${props.query}</span>`);
};
</script>

<template>
  <div :class="$style.container">
    <div
      :class="$style.region"
      v-html="highlight(`${item.sidoName} ${item.gugunName} ${item.dongName}`)"
    ></div>
  </div>
</template>

<style module>
.container {
  padding: 0.625rem 0.75rem;
  border-radius: 0.25rem;

  cursor: pointer;

  user-select: none;
}

.container:hover {
  background-color: #f2f5f8;
}

.container span {
  color: var(--color-primary);
}

.region {
  font-weight: 400;
}
</style>
