<template>
  <form>
    <slot></slot>
  </form>
</template>

<script setup>
import { provide, ref } from 'vue';

const formElements = ref([]);
const errors = ref([]);

const registerSelf = (_instance) => {
  setTimeout(() => {
    formElements.value.push(_instance.exposed);
  }, 0);
};

const validate = () => {
  // use rules to validate input
  let valid = true;
  errors.value = [];
  for (let formElement of formElements.value) {
    const isValid = formElement.validate();
    if (isValid !== true) {
      errors.value.push(isValid);
      valid = false;
    }
  }
  return valid;
};

provide('registerSelf', registerSelf);

defineExpose({
  validate
});
</script>
