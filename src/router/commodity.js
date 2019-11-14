 const COMMODITY_ROUTERS = [{
         path: 'list',
         component: () =>
             import ('@/views/commodity/List'),

         meta: { title: '商品管理', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'add',
         component: () =>
             import ('@/views/commodity/addGoods.vue'),

         meta: { title: '商品新增', icon: 'el-icon-trans', hidden: true },
         children: []
     },
     {
         path: 'class',
         component: () =>
             import ('@/views/commodity/Class'),

         meta: { title: '商品分类', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'color',
         component: () =>
             import ('@/views/commodity/Color'),

         meta: { title: '颜色管理', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'size',
         component: () =>
             import ('@/views/commodity/Size'),

         meta: { title: '尺码管理', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'brand',
         component: () =>
             import ('@/views/commodity/Brand'),

         meta: { title: '品牌管理', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'material',
         component: () =>
             import ('@/views/commodity/Material'),

         meta: { title: '材质管理', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'style',
         component: () =>
             import ('@/views/commodity/Style'),

         meta: { title: '款式管理', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'season',
         component: () =>
             import ('@/views/commodity/Season'),

         meta: { title: '季节管理', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'company',
         component: () =>
             import ('@/views/commodity/Company'),

         meta: { title: '单位管理', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'code',
         component: () =>
             import ('@/views/commodity/Code'),

         meta: { title: '条码管理', icon: 'el-icon-trans', hidden: false },
         children: []
     },

 ]
 export default COMMODITY_ROUTERS;