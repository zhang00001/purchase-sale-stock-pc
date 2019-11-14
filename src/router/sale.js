const SALE_ROUTERS = [{
    path: 'order',
    component: () =>
        import('@/views/sale/Order'),

    meta: { title: '销售订单', icon: 'el-icon-trans', hidden: false },
    children: []
},
{
    path: 'order_add',
    component: () =>
        import('@/views/sale/Order_add'),

    meta: { title: '新增销售订单', icon: 'el-icon-trans', hidden: true },
    children: []
},
{
    path: 'orderDetail',
    component: () =>
        import('@/views/sale/Order_add'),

    meta: { title: '销售订单详情', icon: 'el-icon-trans', hidden: true },
    children: []
},
{
    path: 'retreat',
    component: () =>
        import('@/views/sale/Retreat'),
    meta: { title: '退货单', icon: 'el-icon-trans', hidden: false },
    children: []
},
{
    path: 'retreat_add',
    component: () =>
        import('@/views/sale/Retreat_add'),

    meta: { title: '新增销售退货订单', icon: 'el-icon-trans', hidden: true },
    children: []
},
{
    path: 'retreatDetail',
    component: () =>
        import('@/views/sale/Retreat_add'),

    meta: { title: '销售退货单详情', icon: 'el-icon-trans', hidden: true },
    children: []
},
{
    path: 'reception',
    component: () =>
        import('@/views/sale/Reception'),
    meta: { title: '前台收银', icon: 'el-icon-trans', hidden: false },
    children: []
},
{
    path: 'history',
    component: () =>
        import('@/views/sale/Reception_history'),
    meta: { title: '收银历史', icon: 'el-icon-trans', hidden: false },
    children: []
},
{
    path: 'historyDetail',
    component: () =>
        import('@/views/sale/Reception'),

    meta: { title: '收银详情', icon: 'el-icon-trans', hidden: true },
    children: []
},
]
export default SALE_ROUTERS;