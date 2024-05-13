<script setup>
import MainSearch from '@/components/MainSearch/MainSearch.vue';
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.searchWrapper">
      <MainSearch />
    </div>
  </div>
</template>

<style module>
.container {
  max-width: 1024px;
  margin: 0 auto;
}

.searchWrapper {
  padding: 1rem;
}
</style>
