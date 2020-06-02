import Vue from "vue";
import Vuex from "vuex";
import account from "./modules/account";
import room from "./modules/room";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    room,
  },
});
