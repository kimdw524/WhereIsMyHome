<script setup>
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
    <div :class="$style.arrow"><font-awesome-icon :icon="['fas', 'angles-left']" /></div>
    <div
      :class="[$style.item, page === props.current && $style.selected]"
      v-for="page in pages"
      :key="page"
    >
      {{ page }}
    </div>
    <div :class="$style.arrow"><font-awesome-icon :icon="['fas', 'angles-right']" /></div>
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  margin: 0.5rem;

  cursor: pointer;
  outline: none;
  user-select: none;
}

.item {
  display: inline-block;

  padding: 0.5rem 0.75rem;

  font-size: 0.875rem;
}

.item:hover {
  text-decoration: underline;
}

.item.selected {
  font-weight: 800;
}

.item.selected:hover {
  text-decoration: none;
}

.arrow {
  color: var(--color-light);
  font-size: 0.75rem;
}

.arrow:hover {
  color: var(--color);
}
</style>
