import { createApp } from 'vue'
import 'normalize.css'
import '../src/assets/css/style.css'
import router from './router'
import App from './App.vue'

createApp(App).use(router).mount('#app')
