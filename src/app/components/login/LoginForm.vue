<script setup lang="ts">
import FormInput  from '../ui/FormInput.vue'
import Button  from '../ui/Button.vue'
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive } from 'vue';
import { useAuthStore } from '@/app/store/authStore';

const state = reactive({
  isWaiting: false,
});

const model = {
  username: '',
  password: '',
}

const rules = reactive({
  username: { required },
  password: { required },
})

const v$ = useVuelidate(model, rules);

function submit(){
  if(!v$.value.$invalid){
    state.isWaiting = true;
    useAuthStore().login(model).then(() => state.isWaiting = false);
  }
}

</script>

<template>
  <Transition name="slide" appear>
    <div class="login-form card-block">
      <h1> Login </h1>
      <div>
        <FormInput v-model:value="model.username" placeholder="Username" :validator="v$" />
        <FormInput v-model:value="model.password" placeholder="Password" :validator="v$" type="password"  />
      </div>
      <div class="button-wrapper">
        <Button :loading="state.isWaiting" @click="submit"> Login </Button>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
  .login-form {
    display: grid;
    grid-template-rows: 1fr max-content 1fr;
    width: 35vw;
    height: 50vh;

    @media (max-width: 1400px) {
      width: 60vw;
    }

    .button-wrapper{
      display: flex;
      align-items: center;
      justify-content: end;
    }
  }
</style>