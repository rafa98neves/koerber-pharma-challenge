import router from '@/router';
import { defineStore } from 'pinia';
import { getServices, type Services } from '../requests/services';
import type { UserData } from '../models/user';
import { cachedItem } from './cache';
import { commonStoreActions } from './commonStoreActions';
import { runActions } from './setup';

let services!: Services;

export const useAuthStore = defineStore('authStore', {
    state: () => ({
      userData: cachedItem<UserData | null>('userData'),   
    }),
    getters: {
      loggedIn: (state) => !!state.userData,
      loggedInUser: (state) => state.userData, 
    },
    actions: {
        async login(payload: { username: string; password: string }) {
          this.userData = await services.auth.login(payload);
          router.push('.');
          return this.userData;
        },
        async logout() {
          this.clearTokenUser();
          runActions(commonStoreActions.ON_DESTROY).then(() => router.push('/login') );
        },
        clearTokenUser() {
          this.userData = null;
        },
        async [commonStoreActions.ON_SETUP](){
          services = getServices(true);
        },
        async [commonStoreActions.ON_DESTROY](){
          this.clearTokenUser();
        }
    },
  });


  