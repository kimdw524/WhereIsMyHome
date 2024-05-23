<script setup>
defineProps({ src: String });
</script>

<template>
  <div :class="$style.container">
    <video
      ref="video"
      :class="$style.video"
      :src="src"
      type="video/webm"
      autoplay
      muted
      loop
    ></video>
  </div>
</template>

<style module>
.container {
  position: relative;

  width: 100%;
  height: 100%;
  aspect-ratio: 2000 / 1484;

  background-image: url('@/assets/images/ipad.png');
  background-size: cover;
}

.video {
  position: absolute;
  top: 9.7%;
  left: 7.2%;

  width: 86.1%;
}
</style>
