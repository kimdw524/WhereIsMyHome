import { defineStore } from 'pinia';
import { ref } from 'vue';
import { setCookie, deleteCookie } from '@/utils/utils.js';

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false);
  const userData = ref({});

  const signIn = (id, email, name, admin) => {
    isLoggedIn.value = true;
    userData.value = { id, email, name, admin };
    setCookie('userData', JSON.stringify(userData.value));
  };

  const logOut = () => {
    isLoggedIn.value = false;
    userData.value = {};
    deleteCookie('userData');
  };

  return { isLoggedIn, userData, signIn, logOut };
});
