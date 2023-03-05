<script setup lang="ts">
import LoginForm from '../app/components/login/LoginForm.vue'
</script>

<template>
    <div class="login-wrapper-view">
        <Transition name="slide" appear>
            <div class="left-panel">
                <img class="korber-logo" src="../assets/korber-logo.svg" />
                <p> Have you done your todos today?</p>
            </div>
        </Transition>

        <LoginForm class="right-panel" />
    </div>
</template>

<style lang="scss" scoped>
.login-wrapper-view{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr min-content;

    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }

    .left-panel{
        @media (max-width: 992px) {
            display: none;
        }
        display: flex;
        align-items: center;
        margin: auto 7vw;
        .korber-logo{
            width: 25vw;
            height: auto;
            margin-right: 2rem;
        }
    }

    .right-panel{
        height: 100vh;
        box-shadow: #6a8985 0px 0px 7px 8px !important;
    }
}
</style>
