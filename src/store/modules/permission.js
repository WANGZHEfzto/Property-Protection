import { asyncRouterMap, constantRouterMap, allRightRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    headerRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_HEADERROUTERS: (state, routers) => {
      state.headerRouters = routers
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles, menu } = data
        // const { roles } = data
        const accessedRouters = []
        /* if (roles.indexOf('admin') >= 0) {
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }*/
        const headerRouters = []
        // allRightRouterMap.forEach((r) => {
        //   accessedRouters.push(r)
        // })
        console.log(menu)
        if (menu) {
          menu.split(',').forEach((m) => {
            allRightRouterMap.forEach((r) => {
              // if (r.children[0].name.indexOf(m) !== -1) {
              //   accessedRouters.push(r)
              // }
              if (r.name.indexOf(m) !== -1) {
                accessedRouters.push(r)
              }
            })
          })
        }
        accessedRouters.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTERS', accessedRouters)
        commit('SET_HEADERROUTERS', headerRouters)
        resolve()
      })
    }
  }
}

export default permission
