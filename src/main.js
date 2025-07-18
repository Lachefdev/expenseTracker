import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/style.css'
import './registerServiceWorker'

import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

const app = createApp(App)

app.use(Toast)

app.use(createPinia())
app.use(router)

app.mount('#app')
