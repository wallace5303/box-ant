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
        component: () => import('@/views/home/single/Feed'),
        meta: { title: 'menu.home', keepAlive: true, icon: 'home' }
      },
      // feed
      // {
      //   path: '/feed',
      //   name: 'feed',
      //   component: () => import('@/views/home/single/Feed'),
      //   meta: { title: 'menu.feed', keepAlive: true, icon: 'compass' }
      // },
      // web
      {
        path: '/web',
        name: 'web',
        component: () => import('@/views/home/single/Web'),
        meta: { title: 'menu.web', keepAlive: true, icon: 'user' }
      },
      {
        path: '/privateweb',
        name: 'privateweb',
        component: () => import('@/views/home/single/PrivateWeb'),
        meta: { title: 'menu.privateweb', keepAlive: true, icon: 'lock' }
      },
      // all web
      {
        path: '/allweb',
        name: 'allweb',
        component: () => import('@/views/home/single/AllWeb'),
        meta: { title: 'menu.allweb', keepAlive: true, icon: 'appstore' }
      },
      // manage
      // {
      //   path: '/manage',
      //   name: 'manage',
      //   component: () => import('@/views/home/single/WebSiteManage'),
      //   meta: { title: 'menu.manage', keepAlive: true, icon: 'tool' }
      // },
      {
        path: '/manage',
        name: 'manage',
        component: () => import('@/views/home/single/BaseManage'),
        redirect: '/manage/website',
        meta: { title: 'menu.manage', keepAlive: true, icon: 'tool' },
        hideChildrenInMenu: true,
        children: [
          {
            path: '/manage/website',
            name: 'MangeWebSite',
            component: () => import('@/views/home/single/WebSiteManage'),
            meta: { title: 'menu.managewebsite' }
          },
          {
            path: '/manage/webtype',
            name: 'ManageWebType',
            component: () => import('@/views/home/single/WebTypeManage'),
            meta: { title: 'menu.managewebtype' }
          }
          // {
          //   path: '/manage/feed',
          //   name: 'ManageFeed',
          //   component: () => import('@/views/home/single/WebTypeManage'),
          //   meta: { title: '' }
          // }
        ]
      },
      // setting
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/settings/Index'),
        meta: { title: 'menu.settings', hideHeader: true, icon: 'setting' },
        redirect: '/settings/security',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/settings/security',
            name: 'SecuritySettings',
            component: () => import('@/views/settings/Security'),
            meta: { title: '安全设置', hidden: true, keepAlive: true }
          },
          {
            path: '/settings/user',
            name: 'UserCenterSettings',
            component: () => import('@/views/settings/UserCenter'),
            meta: { title: '个人信息', hidden: true, keepAlive: true }
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
