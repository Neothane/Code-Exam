import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from './router';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Notifications from '@kyvg/vue3-notification'

const axiosInstance = axios.create({
    baseURL: "https://illfatedlavendermemoryallocator--jabez007.repl.co/api"
});

const app =  createApp(App);
app.config.globalProperties.$axios = axiosInstance;
app.config.globalProperties.mode = 'production';
app.use(VueRouter);
app.use(Notifications);

app.mount('#app');
