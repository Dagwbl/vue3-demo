import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import * as VueRouter from 'vue-router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import {VueJsExcel} from 'vue-js-excel'

import node from './components/node.vue'
import sensor from "./components/sensor.vue";
import data from "./components/data.vue";
import log from "./components/log.vue";
import dataExport from "./components/export.vue";
import about from "./components/about.vue";

import {useRouter} from 'vue-router'


// const Home = { template: '<div>Home</div>' }
// 定义路由
const routes = [
    {path: '/',component: data},
    {path:'/node',component: node},
    {path:'/sensor',component: sensor},
    {path:'/data',component: data},
    {path:'/log',component: log},
    {path:'/export',component: dataExport},
    {path:'/about',component: about},

]

// const router = useRouter()
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

const app = createApp(App)
app.use(ElementPlus).use(router)
app.mount('#app')

// export default