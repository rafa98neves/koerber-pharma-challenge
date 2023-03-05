<script setup lang="ts">
import NavBar from '../app/components/layout/NavBar.vue';
</script>

<template>
  <div class="main">
    <NavBar />
    <RouterView class="content" />
  </div>
</template>
<style lang="scss" scoped>
.content {
  height: calc(100vh - 5rem);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
