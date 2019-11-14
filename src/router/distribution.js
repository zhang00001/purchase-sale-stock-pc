const DISTRIBUTION_ROUTERS = [{
        path: 'order',
        component: () =>
            import ('@/views/distribution/Order'),

        meta: { title: '配货订单', icon: 'el-icon-trans', hidden: false },
        children: []
    },

    {
        path: 'retreat',
        component: () =>
            import ('@/views/distribution/Retreat'),
        meta: { title: '配货退货单', icon: 'el-icon-trans', hidden: false },
        children: []
    },



]
export default DISTRIBUTION_ROUTERS;