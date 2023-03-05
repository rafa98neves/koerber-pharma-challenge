import router from '@/router';
import { defineStore } from 'pinia';
import { getServices, type Services } from '../requests/services';
import type { Credentials, UserData } from '../models/user';
import { cachedItem } from './cache';
import { commonStoreActions } from './commonStoreActions';
import { runActions } from './setup';

let services!: Services;

export const useAuthStore = defineStore('authStore', {
    state: () => ({
      userData: cachedItem<UserData | null>('userData'),
      savedCredentials: cachedItem<Credentials | null>('savedCredentials'),
    }),
    getters: {
      loggedIn: (state) => !!state.userData,
      loggedInUser: (state) => state.userData,
      credentials: (state) => state.savedCredentials,
    },
    actions: {
        async login(payload: { username: string; password: string }) {
          this.userData = await services.auth.login(payload);
          this.savedCredentials = payload;
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


