import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import AButton from '@/components/AButton';
import AnimatedNumber from '@/components/AnimatedNumber';
import AForm from '@/components/FormElements/AForm';
import AInput from '@/components/FormElements/AInput';

import './assets/scss/main.scss';

const app = createApp(App);

app.component('animated-number', AnimatedNumber);
app.component('a-form', AForm);
app.component('a-input', AInput);
app.component('a-btn', AButton);
app.use(router);

app.mount('#app');
