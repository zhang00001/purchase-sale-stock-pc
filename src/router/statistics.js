 const STATISTICS_ROUTERS = [{
         path: 'purchase',
         component: () =>
             import ('@/views/statistics/Purchase'),
         meta: { title: '采购报表', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'sale',
         component: () =>
             import ('@/views/statistics/Sale'),
         meta: { title: '销售报表', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'inventory',
         component: () =>
             import ('@/views/statistics/Inventory'),
         meta: { title: '盘点报表', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'allocation',
         component: () =>
             import ('@/views/statistics/Allocation'),
         meta: { title: '调拨报表', icon: 'el-icon-trans', hidden: false },
         children: []
     }, {
         path: 'production',
         component: () =>
             import ('@/views/statistics/Production'),
         meta: { title: '生产报表', icon: 'el-icon-trans', hidden: false },
         children: []
     }, {
         path: 'distribution',
         component: () =>
             import ('@/views/statistics/Distribution'),
         meta: { title: '配货报表', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'commodity',
         component: () =>
             import ('@/views/statistics/Commodity'),
         meta: { title: '商品分析', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'revenue',
         component: () =>
             import ('@/views/statistics/Revenue'),

         meta: { title: '营收报表', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'contrast',
         component: () =>
             import ('@/views/statistics/Contrast'),

         meta: { title: '进销对比', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'out_stock',
         component: () =>
             import ('@/views/statistics/Out_stock'),

         meta: { title: '出库报表', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'warehousing',
         component: () =>
             import ('@/views/statistics/Warehousing'),

         meta: { title: '入库报表', icon: 'el-icon-trans', hidden: false },
         children: []
     },
 ]
 export default STATISTICS_ROUTERS;