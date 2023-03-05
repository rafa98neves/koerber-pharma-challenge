import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import { getServices } from './app/requests/services'
import { setupStore } from './app/store/setup'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)

app.provide('$services', getServices(true))

setupStore().then(() => {
    app.mount('#app')
})
