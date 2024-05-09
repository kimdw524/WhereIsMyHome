<script setup>
import { watch } from 'vue';

const props = defineProps({
  name: {
    type: String,
  },
});
const model = defineModel();
</script>

<template>
  <div :class="$style.container" @click="model = !model">
    <div :class="$style.box">
      <font-awesome-icon
        :class="[$style.check, model && $style.checked]"
        :icon="['fas', 'check']"
      />
    </div>
    <div :class="$style.slot">
      <slot />
    </div>
    <input type="checkbox" v-model="model" :name="name" v-show="false" />
  </div>
</template>

<style module>
.container {
  display: inline-flex;
  align-items: center;

  cursor: pointer;
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.5rem;
  height: 1.5rem;

  border-radius: 50%;

  background-color: var(--checkbox-bg);

  color: var(--checkbox-color);

  transition: all 150ms ease;
}

.check {
  transition: all 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  transform: scale(0);
  opacity: 0;
}

.checked {
  transform: scale(1);
  opacity: 1;
}

.slot {
  margin-left: 0.5rem;

  user-select: none;
}
</style>
