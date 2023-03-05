@@ -1,40 +0,0 @@
<script setup lang="ts">
/**
 * Infinite Scroll
 *
 * Displays a page of elements. If scroll gets to the bottom
 * a event will be emmited to fetch more information
 */

import type { PaginatedRequest } from '@/app/models/pagination';

const props = withDefaults(defineProps<{
  /**
   * Total number of elements
   *
   * Defaults to 0.
   */
  total: number;

  /**
   * Max elements per page
   *
   * Defaults to 30.
   */
  limit?: number;

  /**
   * Elements to be skipped on next fetch
   *
   * Defaults to 0.
   */
  skip?: number;

  /**
   * Elements to be incremented on next fetch
   *
   * Defaults to 20.
   */
  increment?: number;

  /**
   * Percentual distance from bottom where fetch will be triggered
   *
   * Defaults to 0.2 (20 %).
   */
  breakpointPercentage?: number;
}>(), {
  total: 0,
  limit: 30,
  skip: 0,
  increment: 20,
  breakpointPercentage: 0.2,
});

const page: PaginatedRequest = {
    limit: props.limit,
    skip: props.skip,
}

const emit = defineEmits(['fetch'])

/**
 * On scroll check if there's more elements to be loaded
 * and if scroll is reaching the `breakpointPercentage` value.
 *
 * If so emit fetch event.
 */
function onScroll(e: Event){
  if(props.total >= page.limit){
  const { scrollTop, offsetHeight, scrollHeight } = e.target as any;
    if(scrollTop + offsetHeight >= scrollHeight - (scrollHeight * props.breakpointPercentage)) {
      page.limit += props.increment;
      emit('fetch', page)
    }
  }
}


</script>

<template>
  <div class="infinite-scroll-wrapper" @scroll="onScroll">
    <slot name="header" />
    <div class="centered">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.infinite-scroll-wrapper{
  overflow-y: auto;
  max-height: 100%;
}
</style>
