import router from '@/router';
import { defineStore } from 'pinia';
import { getServices, type Services } from '../requests/services';
import type { Credentials, UserData } from '../models/user';
import { cachedItem } from './cache';
import { commonStoreActions } from './commonStoreActions';
import { runActions } from './setup';

let services!: Services;

/**
 * Authentication Store
 *
 * User/Session management store
 */
export const useAuthStore = defineStore('authStore', {
    state: () => ({
      /**
       * Current logged in user session data if any
       */
      userData: cachedItem<UserData | null>('userData'),

      /**
       * Saved past logged in user credentials
       */
      savedCredentials: cachedItem<Credentials | null>('savedCredentials'),
    }),
    getters: {
      // Whether user is logged in
      loggedIn: (state) => !!state.userData,

      // Logged in user object
      loggedInUser: (state) => state.userData,

      // Past cached credentials
      credentials: (state) => state.savedCredentials,
    },
    actions: {
        /**
         * Login action
         *
         * Saves user session data and redirects to homepage
         */
        async login(payload: { username: string; password: string }) {
          this.userData = await services.auth.login(payload);
          this.savedCredentials = payload;
          router.push('.');
          return this.userData;
        },

        /**
         * Logout action
         *
         * Runs destroy actions accross all stores and redirects user
         * to login page
         */
        async logout() {
          runActions(commonStoreActions.ON_DESTROY).then(() => router.push('/login') );
        },
        clearTokenUser() {
          this.userData = null;
        },

        /**
         * Setup action
         *
         * Run on store initialization
         */
        async [commonStoreActions.ON_SETUP](){
          services = getServices();
        },

        /**
         * Destroy action
         *
         * Clears current user session
         */
        async [commonStoreActions.ON_DESTROY](){
          this.clearTokenUser();
        }
    },
  });


