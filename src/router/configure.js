const CONFIGURE_ROUTERS = [{
    path: 'userInfo',
    component: () =>
        import('@/views/configure/UserInfo'),

    meta: { title: '个人信息', icon: 'el-icon-trans', hidden: false },
    children: []
},
{
    path: 'print',
    component: () =>
        import('@/views/configure/Menu'),

    meta: { title: '打印设置', icon: 'el-icon-trans', hidden: false },
    children: []
},
{
    path: 'staff',
    component: () =>
        import('@/views/configure/Staff'),

    meta: { title: '门店与员工', icon: 'el-icon-trans', hidden: false },
    children: []
},
{
    path: 'role',
    component: () =>
        import('@/views/configure/Role'),

    meta: { title: '角色管理', icon: 'el-icon-trans', hidden: false },
    children: []
},
{
    path: 'notice',
    component: () =>
        import('@/views/configure/Notice'),

    meta: { title: '公司公告', icon: 'el-icon-trans', hidden: false },
    children: []
},
{
    path: 'printing',
    component: () =>
        import('@/views/configure/Printing'),

    meta: { title: '发件信息', icon: 'el-icon-trans', hidden: false },
    children: []
},
{
    path: 'logistics',
    component: () =>
        import('@/views/configure/Logistics'),

    meta: { title: '物流管理', icon: 'el-icon-trans', hidden: false },
    children: []
},
{
    path: 'system',
    component: () =>
        import('@/views/configure/System'),

    meta: { title: '系统参数', icon: 'el-icon-trans', hidden: false },
    children: []
},
{
    path: 'type',
    component: () =>
        import('@/views/configure/Type'),

    meta: { title: '系统日志', icon: 'el-icon-trans', hidden: false },
    children: []
},

]
export default CONFIGURE_ROUTERS;