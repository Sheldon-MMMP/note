import Vue from 'vue'
import Vuex from 'vuex'
import params from './params';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const clerkLevel = {
  state: () => ({
    clerkLevel: []
  }),
  mutations: {
    setClerkLevel(state,data){
      state.clerkLevel = data
    }
  },
  actions: {
    setClerkLevel(store,data){
      store.commit('setClerkLevel',data)
    }
  },
  getters: {}
}

const store = new Vuex.Store({
  modules: {
    clerkLevel,
    params
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })] 
})


export default store
