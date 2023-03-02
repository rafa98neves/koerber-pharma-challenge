import { defineStore } from 'pinia';
  
// Importing persisted state plugin for type completion
import 'pinia-plugin-persistedstate';
  
  
export const useAuthStore = defineStore('authStore', {
    state: () => ({
        userData: null       
    }),
    getters: {
        loggedIn: (state) => !!state.userData 
    },
    actions: {
        login(payload: { email: string; password: string }) {
          // login
        },
        logout() {
          // logout
          this.clearTokenUser();
        },
        clearTokenUser() {
          this.userData = null;
        },
    },
});

  