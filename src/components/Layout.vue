<script setup>
import NavBar from './NavBar/NavBar.vue';
import Footer from './Footer.vue';
</script>

<template>
  <div :class="$style.container">
    <NavBar />
    <div :class="$style.content">
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

  height: 100vh;
}

.content {
  flex-grow: 1;
}
</style>
