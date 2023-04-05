<template>
  <div>
    <span>{{ displayNumber ?? '--' }}</span>
    <slot></slot>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['number']);

const interval = ref();
const displayNumber = ref(props.number);

watch(
  () => props.number,
  () => {
    interval.value = window.setInterval(() => {
      if (displayNumber.value != props.number) {
        let change = (props.number - displayNumber.value) / 10;
        change = change >= 0 ? Math.ceil(change) : Math.floor(change);
        displayNumber.value = displayNumber.value + change;
      } else {
        clearInterval(interval.value);
        return;
      }
    }, 20);
  }
);
</script>
