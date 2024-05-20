<script setup>
defineEmits(['change']);

const props = defineProps({
  current: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  visible: {
    type: Number,
    default: 5,
  },
});

let left = Math.max(1, props.current - Math.floor(props.visible / 2)),
  right = Math.min(props.max, props.current + Math.floor(props.visible / 2));

if (left === 1) {
  right = Math.min(props.max, props.visible);
} else if (right === props.max) {
  left = Math.max(1, props.max - props.visible + 1);
}

const pages = new Array(right - left + 1).fill(0).map((value, index) => index + left);
</script>

<template>
  <div :class="$style.container">
    <div :class="[$style.arrow, $style.item]" @click="$emit('change', 1)">
      <font-awesome-icon :icon="['fas', 'angles-left']" />
    </div>
    <div
      :class="[$style.item, page === props.current && $style.selected]"
      v-for="page in pages"
      :key="page"
      @click="$emit('change', page)"
    >
      <span>{{ page }}</span>
    </div>
    <div :class="[$style.arrow, $style.item]" @click="$emit('change', max)">
      <font-awesome-icon :icon="['fas', 'angles-right']" />
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  margin: 0.5rem;
  box-shadow: 0 0 0.375rem 0 rgba(80, 80, 80, 0.1);

  cursor: pointer;
  outline: none;
  user-select: none;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 2rem;
  border: 1px solid var(--pagination-border);
  border-right: 0;

  font-size: 0.875rem;

  transition: all 150ms ease;
}

.item:first-child {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.item:last-child {
  border-right: 1px solid var(--pagination-border);
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

.item:hover {
  background-color: var(--pagination-bg-hover);
}

.item.selected {
  background-color: var(--pagination-bg-selected);
}

.item.selected:hover {
  text-decoration: none;
}

.arrow {
  color: var(--color-light);
  font-size: 0.75rem;
}
</style>
