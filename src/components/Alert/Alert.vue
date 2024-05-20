<script setup>
import { useAlertStore } from '@/stores/alert';
import Button from '../Common/Button.vue';
const props = defineProps({ data: Object });
const { pop } = useAlertStore();
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.shadow" @click.stop="pop"></div>
    <div :class="$style.alert">
      <div :class="$style.message">
        {{ props.data.message }}
      </div>
      <div :class="$style.footer">
        <Button :style="{ padding: '0.5rem 0.75rem', fontSize: '0.875rem' }" @click="pop"
          >확인</Button
        >
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0 0 0 0;
  z-index: 100;
}

.shadow {
  position: absolute;
  inset: 0 0 0 0;
  z-index: -1;

  background-color: rgba(0, 0, 0, 0.33);
}

.alert {
  width: 25rem;
  max-width: 100vw;
  border-radius: 0.25rem;
  box-sizing: border-box;
  box-shadow: 0 0 1rem 0.125rem rgba(0, 0, 0, 0.25);

  background-color: #fff;
}

.message {
  padding: 1rem;

  line-height: 125%;

  /* user-select: none; */
}

.footer {
  display: flex;
  justify-content: flex-end;

  padding: 0.75rem;
  border-top: 1px solid var(--alert-border);
}
</style>
