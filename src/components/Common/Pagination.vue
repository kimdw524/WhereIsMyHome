<script setup>
import { ref, onUpdated } from 'vue';
defineEmits(['change']);

const pages = ref([]);
const current = ref(0);

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

const updatePage = () => {
  let left = Math.max(1, props.current - Math.floor(props.visible / 2)),
    right = Math.min(props.max, props.current + Math.floor(props.visible / 2));

  if (left === 1) {
    right = Math.min(props.max, props.visible);
  } else if (right === props.max) {
    left = Math.max(1, props.max - props.visible + 1);
  }
  pages.value = new Array(right - left + 1).fill(0).map((value, index) => index + left);
};

updatePage();
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
  border-radius: 50%;

  font-size: 0.875rem;
  font-weight: 300;

  transition: all 200ms ease;
}

.item:hover {
  background-color: var(--pagination-bg-hover);
}

.item.selected {
  font-weight: 700;

  transform: scale(1.25);
}

.item.selected:hover {
  text-decoration: none;
}

.arrow {
  color: var(--color-light);
  font-size: 0.75rem;
}
</style>
