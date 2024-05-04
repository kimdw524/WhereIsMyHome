<script setup>
import Footer from '@/components/Footer.vue';
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
    <Footer />
    <Down>아래로 스크롤 하여 구해줘! 홈즈에 대해 알아보세요.</Down>
  </div>
</template>

<style module>
.container {
  height: 100vh;
}
</style>
