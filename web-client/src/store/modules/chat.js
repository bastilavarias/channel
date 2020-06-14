import { SOCKET_CHAT_SEND } from "../types/chat";

export default {
  state: {
    list: [],
  },

  mutations: {
    [SOCKET_CHAT_SEND]: (state, chat) => {
      state.list = [...state.list, chat];
    },
  },
};
