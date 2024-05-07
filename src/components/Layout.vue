<script setup>
import NavBar from './NavBar/NavBar.vue';
import Footer from './Footer.vue';
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <NavBar />
      <slot />
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;

  max-height: 100vh;
}

.content {
  flex-basis: 100vh;
}
</style>
