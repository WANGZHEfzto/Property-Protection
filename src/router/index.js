import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'login',
    hidden: true
  },
  {
    path: '/qqpd',
    component: () => import('@/views/aqpd/index'),
    name: 'qqpd',
    hidden: true
  },
  {
    path: '/wqyz',
    component: () => import('@/views/wqyz/index'),
    name: 'wqyz',
    hidden: true
  },
  {
    path: '/jftj',
    component: () => import('@/views/jjtj/index'),
    name: 'jftj',
    hidden: true
  },
  {
    path: '/ywzx',
    component: () => import('@/views/ywzx/index'),
    name: 'ywzx',
    hidden: true
  },
  {
    path: '/ywzxDetail',
    component: () => import('@/views/ywzx/detail'),
    name: 'ywzxDetail',
    hidden: true
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/index'),
    name: 'admin',
    // redirect: '/admin/search',
    redirect: to => {
      const { hash, params, query } = to
      return {
        path: '/admin/search',
        query: {
          status: '0',
          type: '1'
        }
      }
    },
    hidden: true,
    children: [
      {
        path: 'search',
        component: () => import('@/views/admin/components/search'),
        name: 'search',
        hidden: true
      },
      {
        path: 'count_al',
        component: () => import('@/views/admin/components/count_al'),
        name: 'count_al',
        hidden: true
      },
      {
        path: 'count_qqr',
        component: () => import('@/views/admin/components/count_qqr'),
        name: 'count_qqr',
        hidden: true
      },
      {
        path: 'count_qt',
        component: () => import('@/views/admin/components/count_qt'),
        name: 'count_qt',
        hidden: true
      },
      {
        path: 'count_cyly',
        component: () => import('@/views/admin/components/count_cyly'),
        name: 'count_cyly',
        hidden: true
      }
    ]
  },
  {
    path: '/adminDetail_dsh',
    component: () => import('@/views/admin/components/detail_dsh'),
    name: 'adminDetail_dsh',
    hidden: true
  },
  {
    path: '/adminDetail_shz',
    component: () => import('@/views/admin/components/detail_shz'),
    name: 'adminDetail_shz',
    hidden: true
  },
  {
    path: '/adminDetail_ysh',
    component: () => import('@/views/admin/components/detail_ysh'),
    name: 'adminDetail_ysh',
    hidden: true
  },
  {
    path: '/zlqqplk_search',
    component: () => import('@/views/zlqqplk/search'),
    name: 'zlqqplk_search',
    hidden: true
  },
  {
    path: '/zlqqplk_list',
    component: () => import('@/views/zlqqplk/list'),
    name: 'zlqqplk_list',
    hidden: true
  },
  {
    path: '/zlqqplk_detail',
    component: () => import('@/views/zlqqplk/detail'),
    name: 'zlqqplk_detail',
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]
export const asyncRouterMap = []

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const allRightRouterMap = []

// export const asyncRouterMap = []

function getCookie(name) {
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  var arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}
