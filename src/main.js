import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import AButton from '@/components/AButton.vue';
import AForm from '@/components/form/AForm.vue';
import AInput from '@/components/form/AInput.vue';

import './assets/scss/main.scss';

const app = createApp(App);

app.component('a-form', AForm);
app.component('a-input', AInput);
app.component('a-btn', AButton);
app.use(router);

app.mount('#app');
