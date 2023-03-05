@@ -1,40 +0,0 @@
<script setup lang="ts">
import IconLoading from '@/app/components/icons/IconLoading.vue';

const props = withDefaults(defineProps<{
  blurOnClick?: boolean | string;
  label?: string;
  loading?: boolean | string;
}>(),
{ 
  blurOnClick: true,
});

function onClick($event: MouseEvent) {
  if (props.blurOnClick !== false && $event && $event.currentTarget && ($event.currentTarget as HTMLElement).blur) {
    ($event.currentTarget as HTMLElement).blur();
  }
}
</script>

<template>
  <button class="btn" @click="onClick" v-bind="$attrs">
    <div v-if="!loading">
      <slot>
        {{ label }}
      </slot>
    </div>
    <div class="loading-wrapper" v-else>
        <IconLoading class="loading-icon" />
    </div>
  </button>
</template>