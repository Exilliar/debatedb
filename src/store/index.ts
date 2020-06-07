import Vue from "vue";
import Vuex from "vuex";

// import User from "@/models/User";
import User from "@/db/elements/userTbl";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {} as User,
  },
  mutations: {
    updateUser(state, user: User) {
      state.user = user;
    },
  },
  actions: {
    updateUser(context, user: User) {
      context.commit("updateUser", user);
    },
  },
  modules: {},
});
