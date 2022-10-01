import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
// import './jquery';

createApp(App).use(router).mount('#app')
