<script setup lang="ts">
/**
 * Login Form
 *
 * Displays a validated form composed with username and password.
 */

import FormInput from '../ui/FormInput.vue';
import UButton from '../ui/UButton.vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive, watch } from 'vue';
import { useAuthStore } from '@/app/store/authStore';

const authStore = useAuthStore();

const state = reactive({
  /**
   * Whether component is waiting on request to finish
   * Defaults to false
   */
  isWaiting: false,

  /**
   * API Error, if any.
   * Defaults to empty string
   */
  apiError: '',

  /**
   * Login form model
   * Defaults to the last saved user credentials, if any
   */
  model: {
    username: authStore.credentials?.username ?? '',
    password: authStore.credentials?.password ?? '',
  },
});

/**
 * Set of rules to be match agains `state.model`
 */
const rules = {
  username: { required },
  password: { required },
};

const v$ = useVuelidate(rules, state.model);

/**
 * Watcher to clear error on user input
 */
watch(state.model, () => (state.apiError = ''));

async function submit() {
  // check form validations
  v$.value.$touch();
  if (!v$.value.$invalid) {
    // if valid try to login
    state.isWaiting = true;
    await useAuthStore()
      .login(state.model)
      .catch((e) => {
        if (e.response?.data?.message) {
          // on API error, display it's message to the user
          state.apiError = e.response?.data?.message;
        }
      });
    state.isWaiting = false;
  }
}
</script>

<template>
  <form class="login-form card-block" @submit.prevent="submit">
    <h1>Login</h1>
    <div class="form">
      <FormInput v-model="state.model.username" placeholder="Username" :validator="v$.username" />
      <FormInput v-model="state.model.password" placeholder="Password" :validator="v$.password" type="password" />
      <p class="error" v-if="state.apiError">{{ state.apiError }}</p>
    </div>
    <div class="button-wrapper">
      <UButton :loading="state.isWaiting"> Login </UButton>
    </div>
    <slot />
  </form>
</template>

<style lang="scss" scoped>
.login-form {
  display: grid;
  grid-template-rows: 1fr max-content max-content 1fr;
  min-width: 45vw;

  .form {
    margin: 0 6rem;
  }

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
  }

  .button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }
}
</style>
