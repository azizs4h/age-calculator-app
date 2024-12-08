<template>
  <div class="a-input-container" :class="isValid">
    <label :for="getUid" class="a-input-label">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <input
      v-model="model"
      class="a-input"
      :id="getUid"
      :type="type"
      :disabled="disabled"
      :placeholder="placeholder"
    />
    <div
      v-if="errors.length > 0"
      aria-describedby="form-validation-error"
      class="a-input-error-wrapper"
    >
      <small class="a-input-error" v-for="error in errors" :key="error"> {{ error }} </small>
    </div>
  </div>
</template>
<script setup>
import { computed, getCurrentInstance, inject, ref } from 'vue';
import { validation } from '../validation';

const props = defineProps([
  'type',
  'disabled',
  'modelValue',
  'label',
  'placeholder',
  'rules',
  'required'
]);
const emit = defineEmits(['update:modelValue']);
const form = inject('registerSelf');
const errors = ref([]);

const self = getCurrentInstance();
form(self);
// with inject above, you can use this.form to reference parent VForm

const validate = () => {
  // use rules to validate input
  errors.value = [];
  const isValid = validation(props.rules, model.value);
  if (isValid !== true) {
    errors.value.push(isValid);
  }
  return isValid;
};

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

const getUid = computed(() => {
  return 'a-input-' + self.uid;
});

const isValid = computed(() => [
  {
    'a-input-field-error': errors.value.length > 0
  }
]);

defineExpose({ validate });
</script>
<style scoped lang="scss">
@import '@/assets/scss/theme.scss';
@import '@/assets/scss/typography.scss';

.a-input-container {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  &[class~='a-input-field-error'] {
    animation: horizontal-shaking 0.2s linear 1;
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
  font-size: 1.25rem; //32px
  padding: 0.75rem 0.75rem; // 12px 20px
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

@media screen and (min-width: 699.999px) {
  .a-input {
    font-size: 2rem; //32px
    padding: 0.75rem 1.5rem; // 12px 20px
  }
}

@keyframes horizontal-shaking {
  0% {
    transform: translateX(0);
  }
  30% {
    transform: translateX(0.25rem);
  }
  60% {
    transform: translateX(-0.25rem);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
