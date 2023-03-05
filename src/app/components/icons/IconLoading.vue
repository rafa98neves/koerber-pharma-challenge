<template>
  <svg class="loading-icon" width="22" height="4" viewBox="0 0 22 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle class="circle-1" cx="3" cy="2" r="2" fill="currentColor" />
    <circle class="circle-2" cx="11" cy="2" r="2" fill="currentColor" />
    <circle class="circle-3" cx="19" cy="2" r="2" fill="currentColor" />
  </svg>
</template>
<style lang="scss" scoped>
@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.2;
  }
}

.loading-icon {
  circle {
    animation-name: fade;
    animation-iteration-count: infinite;
    animation-duration: 0.9s;
    animation-direction: alternate;

    &.circle-2 {
      animation-delay: 0.3s;
    }

    &.circle-3 {
      animation-delay: 0.6s;
    }
  }
}
</style>
