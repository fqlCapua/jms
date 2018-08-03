import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || '',
     id: sessionStorage.getItem('id')||''
  },
  mutations: {
    userLogin(state, data){
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('id', data.id);
      state.token = data.token;
      state.id = data.id;
    },
    userLogout(state){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id');
      state.token = '';
      state.id='';
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

