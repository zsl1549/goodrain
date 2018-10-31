export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/overview', authority: ['admin', 'user'] },
      {
        path: '/overview',
        icon: 'dashboard',
        name: 'overview',
        component: './Overview/Overview',
        authority: ['admin', 'user']
      },
      {
        path: '/regions/:regionID',
        component: './Region/index',
        name: 'resources',
        icon: 'appstore',
        authority: ['admin', 'user'],
        routes: [
        ],
      },
      {
        path: '/nodes/:regionID/:nodeID',
        name: 'nodes',
        component: './Region/nodes/index',
        authority: ['admin', 'user'],
        hideInMenu:true,
      },
      // 团队管理
      {
        path: '/team',
        icon: 'team',
        name: 'team',
        component: './TeamManage/index',
        authority: ['admin', 'user']
      },
      // 用户管理
      {
        path: '/users',
        icon: 'user',
        name: 'users',
        component: './ConsoleUserManage/index',
        authority: ['admin', 'user']
      },
      // 操作审计
      {
        path: '/log',
        icon: 'upload',
        name: 'log',
        component: './Log/Log',
      },
      {
        path: '/system/settings',
        name: 'settings',
        icon: 'setting',
        component: './System/Settings/Info',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/system/settings',
            redirect: '/system/settings/base',
          },
          {
            path: '/system/settings/base',
            component: './System/Settings/BaseView',
          },
          {
            path: '/system/settings/security',
            component: './System/Settings/SecurityView',
          },
          {
            path: '/system/settings/binding',
            component: './System/Settings/BindingView',
          },
          {
            path: '/system/settings/notification',
            component: './System/Settings/NotificationView',
          },
        ],
      },
    ],
  },
];
