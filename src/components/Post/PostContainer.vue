<script setup></script>

<template>
  <div :class="$style.container">
    <div :class="$style.postList">
      <slot />
    </div>
  </div>
</template>

<style module>
.container {
}

.postList {
  box-shadow: 0 0.5rem 2rem -1rem rgba(0, 0, 0, 0.4);

  background-color: #fff;
}
</style>
