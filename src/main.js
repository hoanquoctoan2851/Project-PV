import './design/main.scss'
import 'ant-design-vue/dist/antd.css'
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import router from './router'
import { setupStore } from './stores'
import App from './App.vue'

const app = createApp(App)

setupStore(app)
app.use(Antd)
app.use(router)
app.mount('#app')
