import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueGtag from "vue-gtag";
import './styles/app.css'
import './registerServiceWorker'

createApp(App).use(VueGtag, {
    config: { id: "G-ZZCQLKNR3W" }
}).use(VueAxios, axios).mount('#app')
