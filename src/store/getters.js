const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  regInfo: state => state.user.regInfo,
  permission_routers: state => state.permission.routers,
  errorLogs: state => state.errorLog.logs,
  keyword: state => state.search.keyword,
  addRouters: state => state.permission.addRouters,
  headerRouters: state => state.permission.headerRouters,
  ejly: state => state.search.ejly,
  person: state => state.search.person,
  zczx: state => state.search.zczx,
  jdal: state => state.search.jdal,
  flfg: state => state.search.flfg,
  news: state => state.search.news,
  currentView: state => state.user.currentView,
  currentChange: state => state.user.currentChange,
  zlxqId: state => state.zlxq.zlxqId
}
export default getters
