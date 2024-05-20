import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAlertStore = defineStore('alert', () => {
  const alerts = ref([]);
  let id = 0;

  const alert = (message, type) => {
    alerts.value.push({ id: id++, type, message });
  };

  const pop = () => {
    if (alerts.value.length === 0) return;
    alerts.value.pop();
  };

  return { alerts, alert, pop };
});
