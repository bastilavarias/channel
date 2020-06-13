import Vue from "vue";
import Vuex from "vuex";
import account from "./modules/account";
import room from "./modules/room";
import chat from "./modules/chat";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    room,
    chat,
  },
});
