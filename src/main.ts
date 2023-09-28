import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import * as Vue from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import * as G2Plot from '@antv/g2plot'
import * as dayjs from 'dayjs'
import * as axios from 'axios'
import * as ElementPlus from 'element-plus'
import TpColorPicker from "@/plugins/tp-plugin/components/TpColorPicker.vue";
// 第三方插件
import * as Plugins from './dependence';
import * as Global from '@/utils/global'
import 'viewerjs/dist/viewer.css'
import VueViewer, { api } from 'v-viewer'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局方法
Global.install();

import 'systemjs'
System.set('lib:vue', Vue)
System.set('lib:element-plus', ElementPlus)
System.set('lib:@antv/g2plot', G2Plot)
System.set('lib:dayjs', dayjs)
System.set('lib:axios', axios)


const app = createApp(App);


// 全局挂载和注册 element-plus 的所有 icon
app.config.globalProperties.$icons = []
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.config.globalProperties.$icons.push(key)
    app.component(key, component)
}

app.component('tp-color-picker', TpColorPicker);
// 使用 Element Plus
Plugins.installElementPlus(app);
// 使用AMap
Plugins.installAMap(app);
Plugins.installDataV(app);


app.use(router);
app.use(createPinia());
app.use(VueViewer, {
    // 参考：https://blog.csdn.net/ymzhaobth/article/details/122127852
    // 自定义默认配置
    defaultOptions: {
        toolbar: true,
        url: 'src', // Default: 'src'. Define where to get the original image URL for viewing.
    }
})

router.isReady().then(() => app.mount('#app'));
