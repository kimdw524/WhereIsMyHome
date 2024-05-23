<script setup>
const model = defineModel();
</script>

<template>
  <Transition name="modal">
    <div v-if="model" :class="$style.container">
      <div :class="$style.inner" class="inner">
        <slot />
      </div>
      <div :class="$style.shadow" class="shadow" @click="model = false"></div>
    </div>
  </Transition>
</template>
+
<style module>
.shadow {
  position: fixed;
  inset: 0 0 0 0;
  z-index: 110;

  background-color: rgba(0, 0, 0, 0.33);
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0 0 0 0;
  position: fixed;
  z-index: 100;

  transition: all 300ms ease;
}

.inner {
  overflow: hidden;
  z-index: 120;

  border: 1px solid var(--modal-border);
  border-radius: 0.25rem;
  box-shadow: 0 0 0.5rem 0.125rem var(--modal-boxShadow);
}
</style>

<style>
.inner {
  transition: all 300ms ease;
}

.modal-enter-from,
.modal-leave-to,
.modal-leave-to .inner {
  opacity: 0;
}

.modal-enter-from .inner {
  transform: scale(0.9);
}
</style>
