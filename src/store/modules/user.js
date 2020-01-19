// import { loginByUsername, logout, getUserInfo } from '@/api/login'
// import { getToken, setToken, removeToken, getName, setName, removeName } from '@/utils/auth'
// import secret from '@/utils/secret'

// const user = {
//   state: {
//     personID: '',
//     regInfo: '',
//     currentView: '',
//     currentChange: '',
//     user: '',
//     status: '',
//     code: '',
//     token: getToken(),
//     name: getName(),
//     avatar: '',
//     introduction: '',
//     roles: [],
//     company: '',
//     company2p: '',
//     checkCompany: '',
//     menu: [],
//     orgTree: [],
//     companyName: '',
//     setting: {
//       articlePlatform: []
//     }
//   },

//   mutations: {
//     SET_TOKEN: (state, token) => {
//       state.token = token
//     },
//     SET_NAME: (state, name) => {
//       state.name = name
//     },
//     SET_AVATAR: (state, avatar) => {
//       state.avatar = avatar
//     },
//     SET_ROLES: (state, roles) => {
//       state.roles = roles
//     },
//     SET_PERSONID: (state, personID) => {
//       state.personID = personID
//     },
//     SET_CURRENTVIEW: (state, currentView) => {
//       state.currentView = currentView
//     },
//     SET_CURRENTCHANGE: (state, currentChange) => {
//       state.currentChange = currentChange
//     },
//     SET_REGINFO: (state, regInfo) => {
//       state.regInfo = regInfo
//     },
//     SET_MENU: (state, menu) => {
//       state.menu = menu
//     },
//     SET_ORGTREE: (state, orgTree) => {
//       state.orgTree = orgTree
//     },
//     SET_COMPANYNAME: (state, companyName) => {
//       state.companyName = companyName
//     },
//     SET_INTRODUCTION: (state, introduction) => {
//       state.introduction = introduction
//     }
//   },

//   actions: {
//     // 用户名登录
//     LoginByUsername({ commit }, userInfo) {
//       const username = userInfo.username.trim()
//       return new Promise((resolve, reject) => {
//         console.log(username)
//         loginByUsername(username, userInfo.password, userInfo.checkCode, userInfo.identifyCode).then(response => {
//           if (response && response.content) {
//             commit('SET_TOKEN', response.content)
//             commit('SET_NAME', secret.decrypt(username))
//             setToken(response.content)
//             setName(secret.decrypt(username))
//             resolve()
//           } else {
//             reject('校验失败，用户名密码错误！')
//           }
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 获取用户信息
//     GetUserInfo({ commit, state }) {
//       console.log('geetUseerinfo')
//       return new Promise((resolve, reject) => {
//         getUserInfo(getToken()).then(response => {
//           if (!response.content) { // 由于mockjs 不支持自定义状态码只能这样hack
//             reject('error')
//           }
//           if(response.content.concernKeys){
//             localStorage.concernKeys = response.content.concernKeys
//           }else{
//             localStorage.concernKeys = '技术前沿,产业资讯,物联网,5G' // 默认关注的范围
//           }
//           const data = response.content
//           if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
//             commit('SET_ROLES', data.roles)
//           } else {
//             reject('getInfo: roles must be a non-null array !')
//           }
//           commit('SET_NAME', data.name)
//           commit('SET_MENU', data.menu)
//           commit('SET_AVATAR', data.avatar)
//           commit('SET_INTRODUCTION', data.introduction)
//           commit('SET_ORGTREE', data.orgTree)
//           commit('SET_COMPANYNAME', data.company)
//           resolve(response)
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 第三方验证登录
//     // LoginByThirdparty({ commit, state }, code) {
//     //   return new Promise((resolve, reject) => {
//     //     commit('SET_CODE', code)
//     //     loginByThirdparty(state.status, state.email, state.code).then(response => {
//     //       commit('SET_TOKEN', response.data.token)
//     //       setToken(response.data.token)
//     //       resolve()
//     //     }).catch(error => {
//     //       reject(error)
//     //     })
//     //   })
//     // },

//     // 登出
//     LogOut({ commit, state }) {
//       return new Promise((resolve, reject) => {
//         logout(state.token).then(() => {
//           commit('SET_TOKEN', '')
//           commit('SET_NAME', '')
//           commit('SET_ROLES', [])
//           removeToken()
//           removeName()
//           resolve()
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 前端 登出
//     FedLogOut({ commit }) {
//       console.log(111)
//       return new Promise(resolve => {
//         commit('SET_TOKEN', '')
//         removeToken()
//         resolve()
//       })
//     },

//     // 动态修改权限
//     ChangeRoles({ commit }, role) {
//       return new Promise(resolve => {
//         commit('SET_TOKEN', role)
//         setToken(role)
//         getUserInfo(role).then(response => {
//           const data = response.data
//           commit('SET_ROLES', data.roles)
//           commit('SET_NAME', data.name)
//           commit('SET_AVATAR', data.avatar)
//           commit('SET_INTRODUCTION', data.introduction)
//           resolve()
//         })
//       })
//     }
//   }
// }

// export default user
