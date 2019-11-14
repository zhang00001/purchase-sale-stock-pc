import Vue from 'vue'
import Router from 'vue-router'

import HOME_ROUTERS from './home'
import COMMODITY_ROUTERS from './commodity'

import CUSTOMER_ROUTERS from './customer'
import PURCHASE_ROUTERS from './purchase'
import SALE_ROUTERS from "./sale"
import DISTRIBUTION_ROUTERS from "./distribution"
import WAREHOUSE_ROUTERS from "./warehouse"
import STATISTICS_ROUTERS from "./statistics"
import MALL_ROUTERS from "./mall"
import MARKETING_ROUTERS from "./marketing"
import FINANCE_ROUTERS from "./finance"
import CONFIGURE_ROUTERS from "./configure"
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import { format } from 'util'
const Login = () =>
    import ('@/views/login/login')
const whiteList = ['/login', '/sigin', '/home/index',
        '/purchase/newBuild', '/purchase/addSupplier',
        '/sale/order_add', '/sale/orderDetail', '/sale/retreat_add', '/sale/retreatDetail', '/sale/historyDetail',
        "/customer/add", "/customer/detail", '/commodity/add', '/marketing/list',
    ] // 不重定向白名单
    /**
     * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
     * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
     *                                if not set alwaysShow, only more than one route under the children
     *                                it will becomes nested mode, otherwise not show the root menu
     * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
     * name:'router-name'             the name is used by <keep-alive> (must set!!!)
     * meta : {
        title: 'title'               the name show in submenu and breadcrumb (recommend set)
        icon: 'svg-name'             the icon show in the sidebar,
      }
     **/


const routes = new Router({

    routes: [{
            path: '/home',
            component: Layout,
            redirect: '/home/index',
            meta: { title: '首页', icon: 'iconfont icon-twohome', hidden: false },
            children: [...HOME_ROUTERS]
        },
        {
            path: '/purchase',
            component: Layout,

            meta: { title: '采购', icon: 'iconfont icon-twocaigoudan', hidden: false },
            children: [...PURCHASE_ROUTERS]
        },
        {
            path: '/sale',
            component: Layout,

            meta: { title: '销售', icon: 'iconfont icon-twobiaoqian', hidden: false },
            children: [...SALE_ROUTERS]
        },
        {
            path: '/distribution',
            component: Layout,

            meta: { title: '配货', icon: 'iconfont icon-icon', hidden: false },
            children: [...DISTRIBUTION_ROUTERS]
        },
        {
            path: '/warehouse',
            component: Layout,

            meta: { title: '仓库', icon: 'iconfont icon-twogouwuche', hidden: false },
            children: [...WAREHOUSE_ROUTERS]
        },


        {

            path: '/customer',
            component: Layout,
            redirect: '/customer/list',
            meta: { title: '客户', icon: 'iconfont icon-twokehu', hidden: false },
            children: [
                ...CUSTOMER_ROUTERS
            ],
        },

        {

            path: '/statistics',
            component: Layout,
            redirect: '/statistics/purchase',
            meta: { title: '统计', icon: 'iconfont icon-twotongjifenxi', hidden: false },
            children: [
                ...STATISTICS_ROUTERS
            ],
        },
        {

            path: '/mall',
            component: Layout,
            redirect: '/mall/Upper',
            meta: { title: '商城', icon: 'iconfont icon-twoshangchengmoban', hidden: false },
            children: [
                ...MALL_ROUTERS
            ],
        },
        {

            path: '/marketing',
            component: Layout,

            meta: { title: '营销', icon: 'iconfont icon-twoico-', hidden: false },
            children: [
                ...MARKETING_ROUTERS
            ],
        },
        {

            path: '/finance',
            component: Layout,

            meta: { title: '财务', icon: 'iconfont icon-twocaiwu', hidden: false },
            children: [
                ...FINANCE_ROUTERS
            ],
        },


        {
            path: '/commodity',
            component: Layout,
            redirect: '/commodity/list',
            meta: { title: '商品', icon: 'iconfont icon-twoshouye', hidden: false },
            children: [
                ...COMMODITY_ROUTERS
            ],
        },
        {

            path: '/configure',
            component: Layout,

            meta: { title: '配置', icon: 'iconfont icon-twoset', hidden: false },
            children: [
                ...CONFIGURE_ROUTERS
            ],
        },

        {
            path: '/login',
            component: Login,
            meta: { hidden: true },

        },
        {
            path: '/sigin',
            component: () =>
                import ('@/views/login/sigIn.vue'),
            meta: { hidden: true },

        },
        { path: '*', redirect: '/404', meta: { hidden: true }, },
        { path: '/', redirect: '/home', meta: { hidden: true }, },
    ]

})

routes.beforeEach((to, from, next) => {

    NProgress.start()

    if (sessionStorage.getItem("token")) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            let meuns = []
            if (sessionStorage.getItem("menu")) {

                JSON.parse(sessionStorage.getItem("menu")).forEach(val => {
                    if (val.children) {
                        val.children.forEach(item => {
                            meuns.push(val.path + '/' + item.path)
                        })
                    }
                })
            }
            if (meuns.indexOf(to.path) !== -1 || whiteList.indexOf(to.path) !== -1) {
                next()

            } else {

                Message({
                    message: `暂无权限,请联系管理员`,
                    type: 'error',
                    duration: 3 * 1000
                })

                next({ path: from.path, query: from.query })

            }
        }

    } else {

        if (to.path === '/login') {
            next()
        } else {
            next({ path: '/login' })
        }




    }
    NProgress.done()
})

routes.afterEach(() => {
    NProgress.done() // 结束Progress
})
export default routes;