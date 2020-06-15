import { SOCKET_CHAT_RECENT, SOCKET_CHAT_SEND } from "../types/chat";

export default {
  state: {
    list: [],
    recent: [],
  },

  mutations: {
    [SOCKET_CHAT_SEND]: (state, chat) => {
      state.list = [...state.list, chat];
    },

    [SOCKET_CHAT_RECENT]: (state, chats) => {
      state.recent = [...chats];
    },
  },
};
