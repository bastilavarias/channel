import { SOCKET_CHAT_SEND_SINGLE } from "../types/chat";

export default {
  state: {
    list: [],
  },

  mutations: {
    [SOCKET_CHAT_SEND_SINGLE]: (state, chat) => {
      state.list = [...state.list, chat];
    },
  },
};
