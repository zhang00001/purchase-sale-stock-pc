const CUSTOMER_ROUTERS = [

    {
        path: 'add',
        component: () =>
            import('@/views/customer/Add_cust'),

        meta: { title: '客户新增', icon: 'el-icon-trans', hidden: true },
        children: []
    },
    {
        path: 'list',
        component: () =>
            import('@/views/customer/List_cust'),

        meta: { title: '客户列表', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    {
        path: 'detail',
        component: () =>
            import('@/views/customer/Add_cust'),

        meta: { title: '客户详情', icon: 'el-icon-trans', hidden: true },
        children: []
    },

    {
        path: 'Class_cust',
        component: () =>
            import('@/views/customer/Class_cust'),

        meta: { title: '客户分类', icon: 'el-icon-trans', hidden: false },
        children: []
    },


]
export default CUSTOMER_ROUTERS;