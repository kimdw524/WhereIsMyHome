<script setup>
import MainSection from './MainSection.vue';
import Section1 from './Section1.vue';
import Section2 from './Section2.vue';
import Down from '@/components/Intro/Down.vue';
</script>

<template>
  <div :class="$style.container">
    <MainSection />
    <Section1 />
    <Section2 />
    <Down />
  </div>
</template>

<style module>
.container {
  height: 100vh;
}
</style>
