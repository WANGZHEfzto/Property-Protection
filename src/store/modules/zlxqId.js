import user from './user'

const zlxq = {
  state: {
    zlxqId: '',
    result: {}
  },
  mutations: {
    SET_ZLXQID: (state, token) => {
      state.zlxqId = token
    },
    searchResult(state, result) {
      state.result = result
    }
  }
}
export default zlxq
