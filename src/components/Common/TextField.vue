<script setup>
import { ref } from 'vue';

const model = defineModel();

const props = defineProps({
  placeholder: String,
  label: String,
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
  },
  type: {
    type: String,
    default: 'text',
  },
  red: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['focus', 'blur']);

const focus = ref(false);
</script>

<template>
  <div :class="[$style.container, red && $style.red]" :style="{ width: width }">
    <span v-if="label" :class="[focus || model ? $style.floatLabel : $style.label]">{{
      label
    }}</span>
    <input
      v-if="type !== 'textarea'"
      v-model="model"
      :type="type"
      :class="[$style.text, !label && $style.hideLabel]"
      :placeholder="placeholder"
      @focus="(focus = true), emit('focus')"
      @blur="(focus = false), emit('blur')"
      :readonly="readonly"
    />
    <textarea
      v-else
      v-model="model"
      :type="type"
      :class="[$style.text, !label && $style.hideLabel]"
      :placeholder="placeholder"
      :style="{ height: props.height }"
      @focus="(focus = true), emit('focus')"
      @blur="(focus = false), emit('blur')"
    ></textarea>
  </div>
</template>

<style module>
.container {
  position: relative;
}

.container.red {
  --textfield-border: #ff0000;
  --textfield-color: #ff0000;
  --textfield-border-focus: #ff0000;
  --textfield-label-color: #ff0000;
  --textfield-label-color-focus: #ff0000;
}

.text {
  width: 100%;
  padding: 1.75rem 0.625rem 0.5rem 0.625rem;
  box-sizing: border-box;
  border-radius: 0.175rem;
  border: 1px solid var(--textfield-border);

  background-color: var(--textfield-bg);

  color: var(--textfield-color);
  font-size: 1rem;

  transition: all 100ms ease;

  outline: none;
}

.hideLabel {
  height: 3rem;
  padding: 0 0.625rem;
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
