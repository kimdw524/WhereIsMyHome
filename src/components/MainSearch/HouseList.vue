<script setup>
import TypeLabel from './TypeLabel.vue';

const props = defineProps({ query: String, item: Object });

const highlight = (text) => {
  return text.replaceAll(props.query, `<span>${props.query}</span>`);
};
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.houseName" v-html="highlight(item.houseName)"></div>
    <div :class="$style.roadName" v-html="highlight(item.roadName)"></div>
    <div :class="$style.labelWrapper">
      <TypeLabel :type="item.houseType" />
    </div>
  </div>
</template>

<style module>
.container {
  position: relative;

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

.houseName {
  font-weight: 400;
}

.roadName {
  margin-top: 0.5rem;

  color: var(--color-light);
  font-size: 0.875rem;
  font-weight: 300;
}

.labelWrapper {
  position: absolute;
  top: calc(50% - 0.75rem);
  right: 0.75rem;
}
</style>
