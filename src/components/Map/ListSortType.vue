<script setup>
import { ref } from 'vue';

const props = defineProps({ type: Number });
const model = defineModel();
const asc = ref(false);

const handleClick = () => {
  if (model.value.type === props.type) {
    asc.value = !asc.value;
  }

  model.value = { type: props.type, asc: asc.value };
};
</script>
<template>
  <div
    :class="[$style.sortType, asc && $style.asc, type === model.type && $style.active]"
    @click="handleClick"
  >
    <slot /><font-awesome-icon :icon="['fas', 'sort-down']" />
  </div>
</template>
<style module>
.sortType {
  display: flex;
  align-items: center;

  color: var(--color-light);

  cursor: pointer;
  user-select: none;
}

.sortType.active {
  color: var(--color);
}

.sortType.asc svg {
  margin-top: 0.375rem !important;
  margin-left: 0.25rem;

  transform: rotateX(180deg);
}

.sortType svg {
  margin-top: -0.375rem;
  margin-left: 0.25rem;

  transition: all 100ms ease;
}
</style>
