import {
  ACCOUNT_CHECK_AUTHENTICATION,
  ACCOUNT_LOGIN,
  ACCOUNT_PURGE_AUTHENTICATION,
  ACCOUNT_SET_AUTHENTICATION,
} from "../types/account";
import apiService, { Account } from "../../common/apiService";
import tokenService from "../../common/tokenService";

export default {
  state: {
    isAuthenticated: !!tokenService.get(),
    current: {},
  },

  mutations: {
    [ACCOUNT_SET_AUTHENTICATION]: (state, token) => {
      state.isAuthenticated = true;
      tokenService.save(token);
      state.current = tokenService.getDecodedToken();
      apiService.setHeader();
    },

    [ACCOUNT_PURGE_AUTHENTICATION]: (state) => {
      state.isAuthenticated = false;
      state.current = {};
      tokenService.remove();
    },
  },

  actions: {
    [ACCOUNT_LOGIN]: async ({ commit }, code) => {
      try {
        const result = await Account.login(code);
        const { token } = result.data;
        commit(ACCOUNT_SET_AUTHENTICATION, token);
      } catch (error) {
        console.log(error);
      }
    },

    [ACCOUNT_CHECK_AUTHENTICATION]: async ({ commit }) => {
      if (tokenService.get()) {
        apiService.setHeader();
        try {
          const result = await Account.checkCurrent();
          const { token } = result.data;
          commit(ACCOUNT_SET_AUTHENTICATION, token);
        } catch (error) {
          console.log(error);
        }
      } else {
        commit(ACCOUNT_PURGE_AUTHENTICATION);
      }
    },
  },
};
