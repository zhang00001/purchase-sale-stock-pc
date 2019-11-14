import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import { pca, pcaa } from 'area-data'
import vueAreaLinkage from 'vue-area-linkage'

import '@/styles/index.scss' // global css
import 'babel-polyfill'
import App from './App'
import router from './router'
import store from './store'

// 引入公共方法
// import { common, getDayTime, getNowFormatDate } from '@/utils/commonApi'
import { common } from '@/utils/commonApi'


// import '@/icons' // icon


Vue.use(ElementUI, { locale })
Vue.prototype.$common = common
    // Vue.prototype.$getDayTime = getDayTime
    // Vue.prototype.$getNowFormatDate = getNowFormatDate
Vue.use(VueAreaLinkage)

import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title';
// import 'echarts/lib/component/legend';
Vue.component('chart', ECharts)
Vue.config.productionTip = false
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { formatDate } from '@/utils/date.js'
Vue.use(VueQuillEditor)


import VueAreaLinkage from 'vue-area-linkage';

import 'vue-area-linkage/dist/index.css';

Vue.use(VueAreaLinkage);
Vue.filter('formatDate', function(time) {
    var date = new Date(time * 1000);
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
});
Vue.filter('formatDate2', function(time) {
    var date = new Date(time);
    return formatDate(date, 'yyyy-MM-dd');
});
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})