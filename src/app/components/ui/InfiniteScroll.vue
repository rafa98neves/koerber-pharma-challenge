@@ -1,40 +0,0 @@
<script setup lang="ts">
import type { PaginatedRequest } from '@/app/models/pagination';

const props = withDefaults(defineProps<{
  total: number;
  limit?: number;
  skip?: number;
  increment?: number;
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