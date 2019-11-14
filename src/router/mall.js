const MALL_ROUTERS = [{
        path: 'upper',
        component: () =>
            import ('@/views/mall/Upper'),

        meta: { title: '上架商品', icon: 'el-icon-trans', hidden: false },
        children: []
    },

    {
        path: 'order',
        component: () =>
            import ('@/views/mall/Order'),
        meta: { title: '订单处理', icon: 'el-icon-trans', hidden: false },
        children: []
    },

    {
        path: 'member',
        component: () =>
            import ('@/views/mall/Member'),
        meta: { title: '会员管理', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    {
        path: 'shop',
        component: () =>
            import ('@/views/mall/Shop'),
        meta: { title: '店铺概况', icon: 'el-icon-trans', hidden: false },
        children: []
    },

    {
        path: 'rule',
        component: () =>
            import ('@/views/mall/Rule'),
        meta: { title: '上架商品规则', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    // {
    //     path: 'channel',
    //     component: () =>
    //         import ('@/views/mall/Channel'),
    //     meta: { title: '支付渠道', icon: 'el-icon-trans', hidden: false },
    //     children: []
    // },
    {
        path: 'set',
        component: () =>
            import ('@/views/mall/Set'),
        meta: { title: '店面设置', icon: 'el-icon-trans', hidden: false },
        children: []
    },

]
export default MALL_ROUTERS;