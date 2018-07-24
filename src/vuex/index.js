import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    userLogin(state, data){
      localStorage.setItem('token', data.token);
      state.token = data.token;
    },
    userLogout(state){
      localStorage.removeItem('token');
      state.token = '';
    }
  },
  actions: {
    userLogin({commit}, data){
      commit('userLogin', data);
    },
    userLogout({commit}){
      commit('userLogout');
    }
  },
});

export default store;

