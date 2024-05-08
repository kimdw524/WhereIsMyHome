<script setup>
import { ref } from 'vue';

const emit = defineEmits(['input']);
const model = defineModel();

const props = defineProps({
  placeholder: String,
  label: String,
  width: {
    type: String,
    default: '100%',
  },
  type: {
    type: String,
    default: 'text',
  },
});

const focus = ref(false);
</script>

<template>
  <div :class="$style.container" :style="{ width: width }">
    <span :class="[focus || model ? $style.floatLabel : $style.label]">{{ label }}</span>
    <input
      v-model="model"
      :type="type"
      :class="$style.text"
      :placeholder="placeholder"
      @focus="focus = true"
      @blur="focus = false"
    />
  </div>
</template>

<style module>
.container {
  position: relative;
}

.text {
  width: 100%;
  padding: 1.75rem 0.625rem 0.5rem 0.625rem;
  box-sizing: border-box;
  border: 0;
  border-radius: 0.175rem;
  border: 1px solid var(--textfield-border);

  background-color: var(--textfield-bg);

  color: var(--textfield-color);
  font-size: 1rem;

  transition: all 100ms ease;

  outline: none;
}

.text:focus {
  border: 1px solid var(--textfield-border-focus);
}

.label {
  position: absolute;
  top: 50%;

  margin-top: -0.5rem;
  margin-left: 0.625rem;

  color: var(--textfield-label-color);
  font-size: 0.875rem;
  line-height: 1rem;

  transition: all 150ms ease;

  pointer-events: none;
}

.floatLabel {
  position: absolute;
  top: 0.5rem;

  margin-left: 0.625rem;

  color: var(--textfield-label-color-focus);
  font-size: 0.75rem;
  line-height: 1rem;

  transition: all 150ms ease;

  pointer-events: none;
}
</style>
