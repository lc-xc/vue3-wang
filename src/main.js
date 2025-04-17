import './assets/main.css'

import {
  createApp
} from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import {
  createPinia
} from 'pinia'
import Vant from 'vant';
import 'vant/lib/index.css';

import App from './App.vue'
import router from './router'
import Vconsole from 'vconsole' // 日志工具

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(Vant);
app.use(createPinia())
app.use(router)
app.use(new Vconsole())
app.use(ElementPlus)
app.mount('#app')
