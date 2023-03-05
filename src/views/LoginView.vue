<script setup lang="ts">
import LoginForm from '../app/components/login/LoginForm.vue';
</script>

<template>
  <div class="login-wrapper-view">
    <Transition name="slide" appear>
      <div class="left-panel">
        <img class="korber-logo" src="../assets/korber-logo.svg" />
        <div>
          <p>
            The Pomodoro Technique is a time management system that encourages people to work with the time they have.
          </p>
          <p class="mt-3">Try it now.</p>
        </div>
      </div>
    </Transition>

    <LoginForm class="right-panel">
      <Transition name="slide" appear>
        <div class="left-panel small">
          <img class="korber-logo" src="../assets/korber-logo.svg" />
        </div>
      </Transition>
    </LoginForm>
  </div>
</template>

<style lang="scss" scoped>
.login-wrapper-view {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr min-content;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }

  .left-panel {
    @media (max-width: 992px) {
      display: none;
    }
    display: flex;
    align-items: center;
    margin: auto 7vw;
    .korber-logo {
      min-width: 25vw;
      height: auto;
      margin-right: 2rem;
    }
  }

  .right-panel {
    .small {
      display: none;
    }

    height: 100vh;
    box-shadow: #6a8985 0px 0px 7px 8px !important;
    padding-left: 10%;

    border-top-left-radius: 40%;
    border-bottom-left-radius: 40%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    @media (max-width: 992px) {
      padding-left: 0;
      border-radius: 0;

      .small {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        .korber-logo {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
