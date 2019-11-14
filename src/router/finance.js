const FINANCE_ROUTERS = [{
        path: 'customer/id',
        component: () =>
            import ('@/views/finance/Customer'),
        meta: { title: '对账汇总', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    {
        path: 'customer_list/id2',
        component: () =>
            import ('@/views/finance/CustomerList'),
        meta: { title: '客户对账单', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    {
        path: 'supplier/id3',
        component: () =>
            import ('@/views/finance/Supplier'),
        meta: { title: '供应商对账', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    {
        path: 'account',
        component: () =>
            import ('@/views/finance/Account'),
        meta: { title: '账户流水', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    {
        path: 'receivables',
        component: () =>
            import ('@/views/finance/Receivables'),
        meta: { title: '收款流水', icon: 'el-icon-trans', hidden: false },
        children: []
    }, {
        path: 'settlement',
        component: () =>
            import ('@/views/finance/Settlement'),
        meta: { title: '结算账户', icon: 'el-icon-trans', hidden: false },
        children: []
    }, {
        path: 'type',
        component: () =>
            import ('@/views/finance/Type'),
        meta: { title: '账目类型', icon: 'el-icon-trans', hidden: false },
        children: []
    },

]
export default FINANCE_ROUTERS;