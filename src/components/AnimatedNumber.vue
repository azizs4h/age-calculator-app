<template>
  <div>
    <span>{{ displayNumber ?? '--' }}</span>
    <slot></slot>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['number']);

let interval = null;
const displayNumber = ref(0);

watch(
  () => props.number,
  () => {
    interval = window.setInterval(() => {
      if (displayNumber.value != props.number) {
        let change = (props.number - displayNumber.value) / 10;
        change = change >= 0 ? Math.ceil(change) : Math.floor(change);
        displayNumber.value = displayNumber.value + change;
      } else {
        clearInterval(interval);
      }
    }, 20);
  }
);
</script>
