<script setup lang="ts">
import FormInput  from '../ui/FormInput.vue'
import UButton  from '../ui/UButton.vue'
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive, watch } from 'vue';
import { useAuthStore } from '@/app/store/authStore';

const authStore = useAuthStore();

const state = reactive({
  isWaiting: false,
  apiError: '',
  model: {
    username: authStore.credentials?.username ?? '',
    password: authStore.credentials?.password ?? '',
  }
});

const rules = {
  username: { required },
  password: { required },
}

const v$ = useVuelidate(rules, state.model);

watch(state.model, () => {
  state.apiError = '';
})

async function submit(){
  v$.value.$touch();
  if(!v$.value.$invalid){
    state.isWaiting = true;
    await useAuthStore().login(state.model).catch((e) => {
      if(e.response?.data?.message){
        state.apiError = e.response?.data?.message
      }
    });
    state.isWaiting = false
  }
}

</script>

<template>
    <form class="login-form card-block" @submit.prevent="submit">
      <h1> Login </h1>
      <div class="form">
        <FormInput v-model="state.model.username" placeholder="Username" :validator="v$.username" />
        <FormInput v-model="state.model.password" placeholder="Password" :validator="v$.password" type="password"  />
        <p class="error" v-if="state.apiError"> {{ state.apiError }}   </p>
      </div>
      <div class="button-wrapper">
        <UButton :loading="state.isWaiting"> Login </UButton>
      </div>
    </form>
</template>

<style lang="scss" scoped>
  .login-form {
    display: grid;
    grid-template-rows: 1fr max-content max-content 1fr;
    min-width: 45vw;

    .form{
      margin: 0 6rem;
    }

    h1{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
    }

    .button-wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2rem;
    }
  }
</style>
