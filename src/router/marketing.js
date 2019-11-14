const MARKETING_ROUTERS = [{
    path: 'customer',
    component: () =>
        import('@/views/marketing/Customer'),

    meta: { title: '客户积分', icon: 'el-icon-trans', hidden: false },
    children: []
},

{
    path: 'card',
    component: () =>
        import('@/views/marketing/card'),
    meta: { title: '会员卡', icon: 'el-icon-trans', hidden: false },
    children: []
},

{
    path: 'discount',
    component: () =>
        import('@/views/marketing/Discount'),
    meta: { title: '限时折扣', icon: 'el-icon-trans', hidden: false },
    children: []
},
{
    path: 'seckill',
    component: () =>
        import('@/views/marketing/Seckill'),
    meta: { title: '秒杀', icon: 'el-icon-trans', hidden: false },
    children: []
},

{
    path: 'coupon',
    component: () =>
        import('@/views/marketing/Coupon'),
    meta: { title: '优惠券', icon: 'el-icon-trans', hidden: false },
    children: []
},
{
    path: 'distribution',
    component: () =>
        import('@/views/marketing/Distribution'),
    meta: { title: '分销', icon: 'el-icon-trans', hidden: false },
    children: []
},
{
    path: 'list',
    component: () =>
        import('@/views/marketing/List'),
    meta: { title: '分销列表', icon: 'el-icon-trans', hidden: false },
    children: []
},

]
export default MARKETING_ROUTERS;