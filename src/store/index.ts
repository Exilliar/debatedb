import Vue from "vue";
import Vuex from "vuex";

// import Account from "@/models/Account";
import Account from "@/db/elements/accountTbl";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: {} as Account,
  },
  mutations: {
    updateAccount(state, account: Account) {
      state.account = account;
    },
  },
  actions: {
    updateAccount(context, account: Account) {
      context.commit("updateAccount", account);
    },
  },
  modules: {},
});
