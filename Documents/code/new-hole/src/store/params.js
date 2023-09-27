const params = {
  state: () => ({}),
  mutations: {
    SET_PARAMS(state, data) {
      console.log('SET_PARAMS', data);
      for (let key in data)
        state[key] = data[key]  
    },
  },
  actions: {
    setParams(store, data) {
      store.commit('SET_PARAMS', data)
    }
  },
  getters: {},
  namespaced: true
}

export default params
