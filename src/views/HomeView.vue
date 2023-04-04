<template>
  <div class="container">
    <div class="todo-container">TODO: calculate absolute age <br /></div>
    <div class="age-app-card">
      <a-form ref="formRef">
        <div class="input-section">
          <a-input
            v-model="formData.day"
            label="Day"
            placeholder="DD"
            type="number"
            :rules="rules.day"
          ></a-input>
          <a-input
            v-model="formData.month"
            label="Month"
            placeholder="MM"
            type="number"
            :rules="rules.month"
          ></a-input>
          <a-input
            v-model="formData.year"
            label="Year"
            placeholder="YYYY"
            type="number"
            :rules="rules.year"
          ></a-input>
        </div>
      </a-form>
      <div class="calculate-section">
        <hr class="horizontal-divider" />
        <a-btn @click="calculateAge"></a-btn>
      </div>
      <div class="calculations-section">
        <div>
          <span>{{ calculatedAge.year ?? '--' }}</span>
          years
        </div>
        <div>
          <span>{{ calculatedAge.month ?? '--' }}</span>
          months
        </div>
        <div>
          <span>{{ calculatedAge.day ?? '--' }}</span>
          days
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formRef = ref();
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // Months start at 0!
const day = today.getDate();

const rules = ref({
  day: [(v) => !!v || 'This Field Required', (v) => (v < 31 && v > 0) || 'Must be valid day'],
  month: [(v) => !!v || 'This Field Required', (v) => (v < 13 && v > 0) || 'Must be valid month'],
  year: [(v) => !!v || 'This Field Required', (v) => (v <= year && v > 0) || 'Must be in past']
});

const formData = ref({
  day: day,
  month: month,
  year: year
});

const calculatedAge = ref({
  day: null,
  month: null,
  year: null
});

const calculateAge = () => {
  // TODO: calculate absolute age
  // TODO: create a-form component
  try {
    if (formRef.value.validate()) {
      calculatedAge.value.year = year - formData.value.year;
      calculatedAge.value.month = Math.abs(month - formData.value.month);
      calculatedAge.value.day = Math.abs(day - formData.value.day);
    }
  } catch (e) {
    console.log('err', e);
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theme.scss';
@import '@/assets/scss/typography.scss';

.todo-container {
  position: fixed;
  left: 1rem;
  top: 1rem;
  background: whitesmoke;
  border: 4px solid theme-color(purple);
  border-radius: 0.75rem;
  padding: 2rem;
  line-height: 1.5rem;
}

// TODO: Mobil Responsive layout
.container {
  width: 100%;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-section {
  display: flex;
  padding-right: 11.5rem;
  gap: 2rem; // 20px

  .a-input-container {
    width: calc((100% - 4rem) / 3);
  }
}

.horizontal-divider {
  background-color: theme-color(light-grey);
  border: none;
  height: 0.125rem;
  flex: 1 1 auto;
}

.age-app-card {
  background-color: theme-color(white);
  border-radius: 1.5rem 1.5rem 12rem 1.5rem;
  padding: 3.5rem; //56px
  max-width: 840px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.calculate-section {
  display: flex;
  align-items: center;
}

.calculations-section {
  margin-top: 0.25rem; //4px
  display: flex;
  flex-direction: column;
  gap: 0.625rem; //6px

  div {
    color: theme-color(off-black);
    font-size: 6.5rem; //104px
    font-family: 'Poppins-ExtraBold-Italic';
    letter-spacing: -0.125rem; //2px
    display: flex;
    gap: 0.875rem; //14px

    span {
      color: theme-color(purple);
      letter-spacing: -0.25rem; //4px
    }
  }
}
</style>
