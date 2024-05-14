<script setup></script>

<template>
  <div :class="$style.container"><slot /></div>
</template>

<style module>
.container {
  display: inline-block;
  position: relative;
  overflow: hidden;

  width: 20rem;
  height: 10rem;
  padding: 1rem;
  border: 1px solid #d7dbdf;
  border-radius: 0.25rem;

  cursor: pointer;
  user-select: none;
  transition: all 100ms ease;
}
</style>
