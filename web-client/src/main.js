import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import apiService from "./common/apiService";
import VueSocketIOExt from "vue-socket.io-extended";
import socketIO from "./socket-io-client";

Vue.config.productionTip = false;
apiService.init();
Vue.use(VueSocketIOExt, socketIO, { store });

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
