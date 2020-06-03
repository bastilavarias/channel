import Vue from "vue";
import axios from "axios";
import vueAxios from "vue-axios";
import token from "./tokenService";

const apiService = {
  init: () => {
    Vue.use(vueAxios, axios);
    Vue.axios.defaults.baseURL = "/api";
  },

  setHeader() {
    Vue.axios.defaults.headers.common["Authorization"] = token.get();
  },

  get: (route, body) => {
    return Vue.axios.get(route, body);
  },

  post: (route, body) => {
    return Vue.axios.post(route, body);
  },

  put: (route, body) => {
    return Vue.axios.put(route, body);
  },

  delete: (route, body) => {
    return Vue.axios.delete(route, body);
  },
};

export default apiService;

export const Account = {
  login: (code) => apiService.post("/account/login", { code }),

  checkCurrent: () => apiService.get("/account/check-current"),
};

export const Room = {
  create: ({ name, description, type, password }) =>
    apiService.post("/room/", { name, description, type, password }),

  search: (keyword, offset) => apiService.get(`/room/${keyword}/${offset}`),
};
