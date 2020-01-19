const search = {
  state: {
    keyword: '',
    ejly: '',
    person: '',
    zczx: '',
    jdal: '',
    flfg: '',
    news: ''
  },

  mutations: {
    SET_KEYWORD: (state, keyword) => {
      state.keyword = keyword
    },
    SET_EJLY: (state, ejly) => {
      state.ejly = ejly
    },
    SET_PERSON: (state, person) => {
      state.person = person
    },
    SET_ZCZX: (state, zczx) => {
      state.zczx = zczx
    },
    SET_JDAL: (state, jdal) => {
      state.jdal = jdal
    },
    SET_FLFG: (state, flfg) => {
      state.flfg = flfg
    },
    SET_News: (state, news) => {
      state.news = news
    }
  }
}

export default search
