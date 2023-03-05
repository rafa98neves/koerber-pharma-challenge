@@ -1,40 +0,0 @@
<script setup lang="ts">
import type { Validation } from '@vuelidate/core';

withDefaults(defineProps<{
  validator: Partial<Validation> | null;
  label?: string,
  modelValue?: string;
}>(), {
  validator: null,
  label: undefined,
  modelValue: '',
});

const emit = defineEmits(['update:modelValue'])

function onInput(event: Event){
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="form-field-wrapper">
    <div class="form-field">
        <label class="form-label" v-if="label"> {{ label }}</label>
        <input autocomplete="on" :class="{'is-invalid': validator?.$error}" class="input-form-field" v-bind="$attrs" :value="modelValue" @input="onInput" />
        <p class="error" v-for="error in validator?.$errors" :key="error.$uid"> {{ error.$message }}</p>
    </div>
  </div>
</template>
