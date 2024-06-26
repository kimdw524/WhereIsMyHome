import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMapStore = defineStore('map', () => {
  const map = ref({});
  return { map };
});
