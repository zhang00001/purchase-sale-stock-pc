 const HOME_ROUTERS = [{
         path: 'index',
         component: () =>
             import ('@/views/home/Index'),

         meta: { title: '首页', icon: 'el-icon-trans', hidden: false },
         children: []
     },

     {
         path: 'management',
         component: () =>
             import ('@/views/home/Management'),
         meta: { title: '经营概况', icon: 'el-icon-trans', hidden: false },
         children: []
     },



 ]
 export default HOME_ROUTERS;