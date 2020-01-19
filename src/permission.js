// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css'// progress bar style
// import { getToken } from '@/utils/auth' // getToken from cookie

// NProgress.configure({ showSpinner: false })// NProgress Configuration

// // permission judge function
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

// const whiteList = ['/login', '/register', '/auth-redirect', '/index', '/zczx', '/zczxxq', '/flfg',
//   '/flfgxq', '/jdal', '/jdalxq', '/xcpx', '/rdts', '/cyjj', '/search'
// ]// no redirect whitelist

// const whiteList2params = ['/zczxxq', '/flfgxq', '/jdalxq'
// ]// has params

// router.beforeEach((to, from, next) => {
//   NProgress.start() // start progress bar
//   // console.log('token', getToken())
//   if (getToken()) { // determine if there has token
//     /* has token*/
//     if (to.path === '/login') {
//       next({ path: '/' })
//       NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
//     } else {
//       if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
//         store.dispatch('GetUserInfo').then(res => { // 拉取user_info
//           const roles = res.content.roles // note: roles must be a array! such as: ['editor','develop']
//           const menu = res.content.menu // note: roles must be a array! such as: ['editor','develop']
//           store.dispatch('GenerateRoutes', { roles, menu }).then(() => { // 根据roles权限生成可访问的路由表
//             console.log(store.getters.addRouters)
//             router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//             next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
//           })
//         }).catch((err) => {
//           store.dispatch('FedLogOut').then(() => {
//             Message.error(err || '校验失败，用户名密码错误！')
//             next({ path: '/' })
//           })
//         })
//       } else {
//         // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
//         if (hasPermission(store.getters.roles, to.meta.roles)) {
//           next()
//         } else {
//           next({ path: '/401', replace: true, query: { noGoBack: true }})
//         }
//         // 可删 ↑
//       }
//     }
//   } else {
//     /* has no token*/
//     console.log(to.path)
//     let toPath = to.path
//     // 跳过带参数的
//     for (const whiteList2param of whiteList2params) {
//       if (toPath.indexOf(whiteList2param) !== -1) {
//         toPath = whiteList2param
//       }
//     }
//     if (whiteList.indexOf(toPath) !== -1) { // 在免登录白名单，直接进入
//       next()
//     } else {
//       next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
//       NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
//     }
//   }
// })

// router.afterEach(() => {
//   NProgress.done() // finish progress bar
// })
