const PURCHASE_ROUTERS = [{
        path: 'order',
        component: () =>
            import ('@/views/purchase/Order'),

        meta: { title: '采购订单', icon: 'el-icon-trans', hidden: false },
        children: []
    },

    {   
        path: 'newBuild',
        component:  ()  =>             
            import  ('@/views/purchase/newBuild'),
        meta:  {  title:   '新建采购订单',  icon:   'el-icon-trans',  hidden:  true },
        children:  []    
    },

    // {   
    //     path: 'addPurchase',
    //     component:  ()  =>             
    //         import  ('@/views/purchase/AddPurchase'),
    //     meta:  {  title:   '补货',  icon:   'el-icon-trans',  hidden:  true },
    //     children:  []    
    // },

    {
        path: 'replenishment',
        component: () =>
            import ('@/views/purchase/Replenishment'),
        meta: { title: '智能补货', icon: 'el-icon-trans', hidden: false },
        children: []
    },

    {
        path: 'retreat',
        component: () =>
            import ('@/views/purchase/Retreat'),
        meta: { title: '采购退货', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    {
        path: 'Supplier',
        component: () =>
            import ('@/views/purchase/Supplier'),
        meta: { title: '供应商管理', icon: 'el-icon-trans', hidden: false },
        children: []
    },

      {        
        path:   'addSupplier',
                component:  ()  =>             
            import  ('@/views/purchase/AddSupplier'),

                meta:  {  title:   '新增供应商',  icon:   'el-icon-trans',  hidden:  true },
                children:  []    
    },
]
export default PURCHASE_ROUTERS;