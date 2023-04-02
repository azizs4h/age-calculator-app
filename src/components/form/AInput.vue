<template>
  <div class="a-input-container" :class="isValid">
    <label :for="uid" class="a-input-label">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <input v-model="model" class="a-input" :id="uid" :type="type" :disabled="disabled" :placeholder="placeholder">
    <div v-if="!valid" aria-describedby="form-validation-error" class="a-input-error-wrapper">
      <small class="a-input-error">
        Must be valid date
      </small>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';

const props = defineProps(["type", "disabled", "modelValue", "label", "placeholder"]);
const emit = defineEmits(["update:modelValue"]);
const valid = ref(true);

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value);
  }
});

const uid = computed(() => {
  return "a-input" + Date.now().toString(36).substring(2) + Math.random().toString(36).substring(2);
});

const isValid = computed(() =>
  [{
    "a-input-field-error": !valid.value
  }]
);
</script>
<style scoped lang="scss">
@import "@/assets/scss/theme.scss";
@import "@/assets/scss/typography.scss";

.a-input-container {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  &[class~="a-input-field-error"] {
    .a-input-label {
      color: theme-color(light-red);
    }

    .a-input {
      outline-color: theme-color(light-red);
      caret-color: theme-color(light-red);
      margin: 0.625rem 0 0.5rem 0; //10px 0 8px 0
    }
  }
}

.a-input-label {
  font-family: 'Poppins-Bold';
  font-size: 0.875rem; // 14px
  margin-bottom: 0.25rem; // 4px
  color: theme-color(smokey-grey);
  text-transform: uppercase;
  letter-spacing: 0.25rem;
}

.a-input {
  font-family: 'Poppins-Bold';
  font-size: 2rem; //32px
  padding: 0.75rem 1.5rem; // 12px 20px
  margin-top: 0.625rem; // 10px
  color: theme-color(off-black);
  background-color: transparent;
  border-radius: 0.5rem; // 8px
  outline: solid theme-color(light-grey) 1px;

  &:focus {
    outline-color: theme-color(purple);
    caret-color: theme-color(purple);
  }

}

.a-input-error {
  color: theme-color(light-red);
  font-family: 'Poppins-Italic';
  font-size: 0.75rem; // 12px
}

.a-input-error-wrapper {
  text-transform: initial;
}
</style>