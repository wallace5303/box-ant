// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/home',
    children: [
      // home
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: { title: 'menu.home', keepAlive: true, icon: 'home' }
      },
      // manage
      // {
      //   path: '/manage',
      //   name: 'manage',
      //   component: () => import('@/views/manage'),
      //   meta: { title: 'menu.manage', keepAlive: true, icon: 'setting' }
      // },
      // setting
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/settings/Index'),
        meta: { title: 'menu.settings', hideHeader: true, icon: 'setting' },
        redirect: '/settings/base',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/settings/base',
            name: 'UserCenterSettings',
            component: () => import('@/views/settings/UserCenter'),
            meta: { title: '个人信息', hidden: true, keepAlive: true }
          },
          {
            path: '/settings/security',
            name: 'SecuritySettings',
            component: () => import('@/views/settings/Security'),
            meta: { title: '安全设置', hidden: true, keepAlive: true }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/404')
  }

]
