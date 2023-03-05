@@ -1,40 +0,0 @@
<script setup lang="ts">
/**
 * General Button
 */

import IconLoading from '@/app/components/icons/IconLoading.vue';

const props = withDefaults(defineProps<{
  /**
   * Whether to blur on button click
   *
   * Defaults to true
   */
  blurOnClick?: boolean | string;

  /**
   * Button label if set
   */
  label?: string;

  /**
   * Whether to present the button in a loading state
   */
  loading?: boolean | string;
}>(),
{
  label: undefined,
  blurOnClick: true,
  loading: undefined,
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
