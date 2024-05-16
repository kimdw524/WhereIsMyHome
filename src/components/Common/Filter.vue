<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ text: String });

const toggle = ref(false);
const container = ref(null);
const popup = ref(null);
const left = ref(0);

const handleMouseDown = (e) => {
  e.stopPropagation();
};

const handleWindowMouseDown = (e) => {
  if (!toggle.value) return;
  toggle.value = false;
};

watch(toggle, (value) => {
  if (value) {
    const containerLeft = container.value.offsetLeft,
      bodyWidth = document.body.offsetWidth,
      popupWidth = parseInt(popup.value.children[0].style.width) + 36;

    if (containerLeft + popupWidth > bodyWidth) {
      left.value = bodyWidth - containerLeft - popupWidth;
    } else {
      left.value = 0;
    }

    container.value.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousedown', handleWindowMouseDown);
  } else {
    container.value.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('mousedown', handleWindowMouseDown);
  }
});
</script>

<template>
  <div :class="$style.container" ref="container">
    <div :class="$style.text" @click="toggle = !toggle">
      {{ text }}
      <img
        src="@/assets/images/arrow_down.svg"
        alt="자세히"
        :class="[$style.icon, toggle && $style.reverse]"
      />
    </div>
    <TransitionGroup name="popup" tag="div">
      <div
        v-show="toggle"
        :key="toggle"
        :class="$style.popup"
        ref="popup"
        :style="{ left: `${left}px` }"
      >
        <slot />
      </div>
    </TransitionGroup>
  </div>
</template>

<style module>
.container {
  position: relative;

  border: 1px solid var(--filter-border);
  border-radius: 0.125rem;
}

.text {
  display: inline-flex;
  align-items: center;

  padding: 0.375rem 0.25rem 0.375rem 0.625rem;
  border-radius: 0.25rem;

  background-color: var(--filter-bg);

  font-size: 0.875rem;

  cursor: pointer;
  user-select: none;
}

.text:hover {
  background-color: var(--filter-bg-hover);
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.25rem;

  transition: all 200ms ease;
}

.icon.reverse {
  transform: rotateZ(-180deg);
}

.popup {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 20;

  padding: 1rem;
  border: 1px solid var(--filter-popup-border);
  border-radius: 0.125rem;
  box-shadow: #00000040 0 0.5rem 1rem 0;

  background-color: var(--bg);

  transform-origin: 0 0;
}
</style>
