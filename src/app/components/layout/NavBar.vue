<script setup lang="ts">
/**
 * Global user Navigation Bar
 *
 * Displayed fixed on top when if logged in user
 */

import { computed } from 'vue';
import { useAuthStore } from '@/app/store/authStore';

const authStore = useAuthStore();

const user = computed(() => authStore.loggedInUser!);

function logout() {
  authStore.logout();
}
</script>

<template>
  <div class="navbar" v-if="user">
    <div class="user-info">
      <img class="image" :src="user.image" />
      <p>{{ user.firstName }} {{ user.lastName }}</p>
    </div>
    <div class="logout-wrapper">
      <a @click="logout"> Logout </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  display: grid;
  grid-template-columns: 1fr min-content;
  background-color: var(--cambr-soft);
  color: var(--indigo);
  align-items: center;
  height: 5rem;
  padding-left: 2rem;
  padding-right: 2rem;

  .user-info {
    display: inline-flex;
    align-items: center;
    p {
      margin-left: 1rem;
    }
  }

  .image {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 1px solid var(--white-mute);
  }

  .logout-wrapper {
    cursor: pointer;
    a {
      margin-left: auto;
    }
  }
}
</style>
