import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false);
  const userData = ref({});

  const signIn = (id, email, name) => {
    isLoggedIn.value = true;
    userData.value = { id, email, name };
  };

  const logOut = () => {
    isLoggedIn.value = false;
    userData.value = {};
  };

  return { isLoggedIn, userData, signIn, logOut };
});
