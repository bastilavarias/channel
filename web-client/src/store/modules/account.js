import { ACCOUNT_LOGIN } from "../types/account";

export default {
  actions: {
    [ACCOUNT_LOGIN]: ({ commit }, code) => {
      alert(code);
    },
  },
};
