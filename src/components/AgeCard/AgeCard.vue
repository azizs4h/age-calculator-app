<template>
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
</template>

<script setup>
import { reactive, ref } from 'vue';

const formRef = ref();

const today = new Date();
const year = today.getFullYear();

const rules = {
  day: [(v) => !!v || 'This Field Required', (v) => validateMonthDay(v) || 'Must be valid day'],
  month: [(v) => !!v || 'This Field Required', (v) => (v < 13 && v > 0) || 'Must be valid month'],
  year: [
    (v) => !!v || 'This Field Required',
    (v) => (v <= year && v > 0) || 'Must be in past',
    (v) => v > year - 130 || 'Must be valid age range'
  ]
};

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

/**
 * Validates a given day number, given the month.
 * @param {number} day The day number to validate.
 * @returns {boolean} true if the day number is valid for the given month, false otherwise.
 */
const validateMonthDay = (day) => {
  const { month } = formData.value;

  if (month === 2 && day < 30 && day > 0) {
    return true;
  }

  if (month % 2 && day < 32 && day > 0) {
    return true;
  }

  if (0 < day && day < 31) {
    return true;
  }

  return false;
};

/**
 * Validates the form and calculates the age difference between today and the selected date. The age is
 * calculated in years, months and days.
 *
 * @returns {void}
 */
const calculateAge = () => {
  try {
    if (!formRef.value.validate()) return;

    const { day, month, year } = formData.value;

    const birthDate = new Date(year, month - 1, day);
    const { years, months, days } = calculateExactAge(birthDate);

    calculatedAge.years = years;
    calculatedAge.months = months;
    calculatedAge.days = days;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get the number of days in a given month, taking into account leap years.
 * @param {number} year
 * @param {number} month 0-based index of the month (0-11)
 * @returns {number} The number of days in the given month (28-31)
 */
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Calculate the exact age in years, months and days from the given birth date until today.
 * @param {Date} birthDate The birth date
 * @returns {object} An object with the properties years, months and days,
 * which represent the exact age in years, months and days.
 */
const calculateExactAge = (birthDate) => {
  const today = new Date();

  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  let age = currentYear - birthYear;
  let monthDiff = currentMonth - birthMonth;
  let dayDiff = currentDay - birthDay;

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
    monthDiff += 12;
  }

  if (dayDiff < 0) {
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPreviousMonth = getDaysInMonth(previousYear, previousMonth);

    dayDiff += daysInPreviousMonth;
    monthDiff--;
  }

  if (monthDiff < 0) {
    monthDiff += 12;
    age--;
  }

  return {
    years: age,
    months: monthDiff,
    days: dayDiff
  };
};
</script>
