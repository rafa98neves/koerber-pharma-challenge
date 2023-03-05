@@ -1,40 +0,0 @@
<script setup lang="ts">
import type { Validation } from '@vuelidate/core';

withDefaults(defineProps<{
  label?: string,
  validator?: Validation;
  value?: string;
}>(), {
  value: '',
});

const emit = defineEmits(['update:value'])

function onInput(event: Event){
  const value = (event.target as HTMLInputElement).value;
  emit('update:value', value)
}
</script>

<template>
  <div class="form-field">
      <label class="form-label" v-if="label"> {{ label }}</label>
      <input autocomplete="on" class="input-form-field" v-bind="$attrs" @input="onInput" />
  </div> 
</template>