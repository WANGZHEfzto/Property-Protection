import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
import permission from './modules/permission'
import search from './modules/search'
import zlxq from './modules/zlxqId'
import createVuexAlong from 'vuex-along'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    errorLog,
    permission,
    tagsView,
    search,
    zlxq
  },
  getters,
  plugins: [createVuexAlong()]
})

export default store
