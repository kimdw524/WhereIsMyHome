<script setup>
import Light from '@/components/Svg/Light.vue';
import Dark from '@/components/Svg/Dark.vue';
import { ref, watch } from 'vue';

const dark = ref(false);

watch(dark, (value) => {
  document.body.classList.toggle('dark');
});
</script>

<template>
  <div :class="[$style.container, dark && $style.active]" @click="dark = !dark">
    <Light :class="$style.light" />
    <Dark :class="$style.dark" />
  </div>
</template>

<style module>
.container {
  position: relative;

  width: 2rem;
  height: 2rem;

  cursor: pointer;
}

.light {
  position: absolute;
  top: 0;
  left: 0;

  transition: all 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  transform: scale(1);
}

.dark {
  position: absolute;
  top: 0;
  left: 0;

  transition: all 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  transform: scale(0);
}

.active .light {
  transform: scale(0);
}

.active .dark {
  transform: scale(1);
}
</style>
