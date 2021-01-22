import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

const reducer = val => {
  return {
    token: val.token,
    customerId: val.customerId,
    permission: val.permission,
    userInfo: val.userInfo,
    position: val.position
  };
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      reducer: reducer
    })
  ]
});
