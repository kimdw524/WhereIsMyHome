<script setup>
import Down from '@/components/Intro/Down.vue';
import MainSection from '@/components/Intro/MainSection.vue';
import Section1 from '@/components/Intro/Section1.vue';
import Section2 from '@/components/Intro/Section2.vue';
</script>

<template>
  <div :class="$style.container">
    <MainSection />
    <Section1 />
    <Section2 />
    <Down>아래로 스크롤 하여 구해줘! 홈즈에 대해 알아보세요.</Down>
  </div>
</template>

<style module>
.container {
  height: 100vh;
}
</style>
