<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
  title: String,
  items: Array,
});

const model = defineModel({ type: Array });

const leftHandle = ref(null);
const rightHandle = ref(null);
const bar = ref(null);
const fill = ref(null);
const range = ref([Math.min(...model.value), Math.max(...model.value)]);

let leftDown = false,
  rightDown = false;

const drawRange = (value) => {
  const min = Math.min(...value),
    max = Math.max(...value);
  fill.value.style.left = `${(min / (props.items.length - 1)) * 100}%`;
  fill.value.style.right = `${(1 - max / (props.items.length - 1)) * 100}%`;

  leftHandle.value.style.left = `${(value[0] / (props.items.length - 1)) * 100}%`;
  rightHandle.value.style.left = `${(value[1] / (props.items.length - 1)) * 100}%`;
};

const handleMouseUp = (e) => {
  leftDown = rightDown = false;
};

const handleMouseMove = (e) => {
  if (!leftDown && !rightDown) return;

  const { x, width } = bar.value.getBoundingClientRect();
  const posX = Math.min(Math.max(0, (e.pageX - x) / width), 1);
  let value = Math.round((props.items.length - 1) * posX);

  if (value === range.value[leftDown ? 0 : 1]) return;
  range[leftDown ? 0 : 1] = value;
  range.value = leftDown ? [value, range.value[1]] : [range.value[0], value];

  drawRange(range.value);
};

onMounted(() => {
  drawRange(range.value);

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseup', handleMouseUp);
});

watch(range, (value) => {
  model.value = value;
});
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.title">{{ title }}</div>
      <div :class="$style.value">
        {{ items[Math.min(...range)].name }} ~ {{ items[Math.max(...range)].name }}
      </div>
    </div>
    <div :class="$style.rangeContainer">
      <div :class="$style.bar">
        <div :class="$style.fill" ref="fill"></div>
      </div>
      <div :class="$style.barRect" ref="bar">
        <div
          :class="$style.handle"
          ref="leftHandle"
          @mousedown="
            (e) => {
              leftDown = true;
              e.preventDefault();
            }
          "
        ></div>
        <div
          :class="$style.handle"
          ref="rightHandle"
          @mousedown="
            (e) => {
              rightDown = true;
              e.preventDefault();
            }
          "
        ></div>
      </div>
    </div>

    <div :class="$style.marks">
      <div :class="$style.markContainer">
        <div :class="$style.mark"></div>
        <div :class="$style.mark"></div>
        <div :class="$style.mark"></div>
        <div v-if="props.items.length % 2 === 0" :class="$style.mark"></div>
      </div>
      <div :class="$style.markTextContainer">
        <div :class="$style.markText">{{ items[0].name }}</div>
        <div :class="$style.markText">{{ items[items.length - 1].name }}</div>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  position: relative;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 0.5rem;
}

.title {
  font-weight: 400;
}

.value {
  color: var(--color-primary);
  font-size: 0.875rem;
  font-weight: 300;
}

.rangeContainer {
  position: relative;
  height: 1.5rem;
}

.bar {
  position: absolute;
  top: calc(50% - 0.125rem);
  right: 0;
  left: 0;
  overflow: hidden;

  height: 0.25rem;
  border-radius: 0.75rem;

  background-color: rgb(187, 195, 203);
}

.barRect {
  position: relative;
  width: calc(100% - 1.5rem);
}

.fill {
  position: absolute;
  inset: 0;

  background-color: #208fff;
}

.handle {
  position: absolute;

  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid #8b8b8b;
  border-radius: 50%;
  box-sizing: border-box;

  background-color: #fff;

  cursor: pointer;
}

.marks {
  position: relative;

  height: 2rem;
  margin-top: 0.5rem;
}

.markContainer {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  right: 0.75rem;
  left: 0.75rem;
}

.mark {
  width: 1px;
  height: 0.5rem;

  background-color: var(--range-mark);
}

.markTextContainer {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.markText {
  margin-top: 1rem;

  color: var(--color-light);
  font-size: 0.875rem;
  font-weight: 300;
}
</style>
