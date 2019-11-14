const WAREHOUSE_ROUTERS = [{
        path: 'outbound',
        component: () =>
            import ('@/views/warehouse/Outbound'),
        meta: { title: '待出库单', icon: 'el-icon-trans', hidden: false },
        children: []
    },

    {
        path: 'orderFinished',
        component: () =>
            import ('@/views/warehouse/orderFinished'),
        meta: { title: '已出库单', icon: 'el-icon-trans', hidden: false },
        children: []
    },

    {
        path: 'OutboundFinished',
        component: () =>
            import ('@/views/warehouse/OutboundFinished'),
        meta: { title: '待入库单', icon: 'el-icon-trans', hidden: false },
        children: []
    },

    {
        path: 'warehousing',
        component: () =>
            import ('@/views/warehouse/Warehousing'),
        meta: { title: '已入库单', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    {
        path: 'allocation',
        component: () =>
            import ('@/views/warehouse/Allocation'),
        meta: { title: '库存调拨单', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    {
        path: 'inventory',
        component: () =>
            import ('@/views/warehouse/Inventory'),
        meta: { title: '库存盘点单', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    {
        path: 'production',
        component: () =>
            import ('@/views/warehouse/Production'),
        meta: { title: '生产入库单', icon: 'el-icon-trans', hidden: false },
        children: []
    }, {
        path: 'stock',
        component: () =>
            import ('@/views/warehouse/Stock'),
        meta: { title: '库存流水', icon: 'el-icon-trans', hidden: false },
        children: []
    },




    {
        path: 'stock_query',
        component: () =>
            import ('@/views/warehouse/Stock_query'),
        meta: { title: '库存查询', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    {
        path: 'administration',
        component: () =>
            import ('@/views/warehouse/Administration'),

        meta: { title: '仓库管理', icon: 'el-icon-trans', hidden: false },
        children: []
    },
]
export default WAREHOUSE_ROUTERS;