<script setup lang="ts">
/**
 * Counter Wizard
 *
 * Will display a counter of x / y items where x is the
 * current item count and y is the item total
 */

defineProps<{
  /**
   * Number of in-progress items
   */
  inProgress: number;

  /**
   * Number of total items
   */
  max: number;

  /**
   * Inline label, if any
   */
  label?: string;
}>();
</script>

<template>
  <div class="counter-wrapper">
    <div>{{ label }}</div>
    <div class="counter">{{ inProgress }} / {{ max }}</div>
  </div>
</template>

<style lang="scss" scoped>
.counter-wrapper {
  display: flex;
  align-items: center;
  justify-content: end;

  .counter {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
    width: 5rem;
    height: 5rem;
    border: 1px solid #f2f2f2;
    border-radius: 50%;
  }
}
</style>
