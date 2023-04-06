<template>
  <div class="container">
    <div class="age-app-card">
      <a-form ref="formRef">
        <div class="input-section">
          <a-input
            v-model="formData.day"
            label="Day"
            placeholder="DD"
            type="number"
            :rules="rules.day"
            @keydown.enter="calculateAge"
          ></a-input>
          <a-input
            v-model="formData.month"
            label="Month"
            placeholder="MM"
            type="number"
            :rules="rules.month"
            @keydown.enter="calculateAge"
          ></a-input>
          <a-input
            v-model="formData.year"
            label="Year"
            placeholder="YYYY"
            type="number"
            :rules="rules.year"
            @keydown.enter="calculateAge"
          ></a-input>
        </div>
      </a-form>
      <div class="calculate-section">
        <hr class="horizontal-divider" />
        <a-btn @click="calculateAge"></a-btn>
      </div>
      <div class="calculations-section">
        <animated-number v-for="(item, index) in calculatedAge" :key="index" :number="item">
          {{ index }}
        </animated-number>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const formRef = ref();
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // Months start at 0!
const day = today.getDate();

const rules = ref({
  day: [(v) => !!v || 'This Field Required', (v) => validateMonthDay(v) || 'Must be valid day'],
  month: [(v) => !!v || 'This Field Required', (v) => (v < 13 && v > 0) || 'Must be valid month'],
  year: [(v) => !!v || 'This Field Required', (v) => (v <= year && v > 0) || 'Must be in past']
});

const formData = ref({
  day: null,
  month: null,
  year: null
});

const calculatedAge = reactive({
  years: null,
  months: null,
  days: null
});

const validateMonthDay = (v) => {
  if (formData.value.month == 2) {
    if (v < 30 && v > 0) {
      return true;
      // february
    }
  } else if (formData.value.month % 2) {
    if (v < 32 && v > 0) {
      return true;
    }
  } else {
    if (v < 31 && v > 0) {
      return true;
    }
  }
  return false;
};

const calculateAge = () => {
  try {
    /* calculations calculate age with this formula
      2023 04 06
      1996 09 04
      -__________
      0026 06 02
      @azizs4h need to change this find the best solution,
      for leap years and need to calculate the people who borned in February 29
    */

    if (formRef.value.validate()) {
      calculatedAge.days = day - formData.value.day;
      if (calculatedAge.days < 0) {
        calculatedAge.days = day + 30 - formData.value.day;
        calculatedAge.months = month - 1 - formData.value.month;

        if (calculatedAge.months < 0) {
          calculatedAge.months = month + 11 - formData.value.month;
          calculatedAge.years = year - 1 - formData.value.year;
        }
        return;
      }

      calculatedAge.months = month - formData.value.month;
      if (calculatedAge.months < 0) {
        calculatedAge.months = month + 11 - formData.value.month;
        calculatedAge.years = year - 1 - formData.value.year;
      } else {
        calculatedAge.years = year - formData.value.year;
      }
    }
  } catch (e) {
    console.log('err', e);
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
