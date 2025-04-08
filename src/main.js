import './assets/main.css'

import {
  createApp
} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {
  createPinia
} from 'pinia'

import App from './App.vue'
import router from './router'
import Vconsole from 'vconsole' // 日志工具

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(new Vconsole())
app.use(ElementPlus)
app.mount('#app')
