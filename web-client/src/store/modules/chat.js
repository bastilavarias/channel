import {
  FETCH_CHATS,
  SET_CHATS,
  SOCKET_CHAT_RECENT,
  SOCKET_CHAT_SEND,
} from "../types/chat";
import { Chat } from "../../common/apiService";

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

    [SET_CHATS]: (state, chats) => {
      state.list = chats;
    },
  },

  actions: {
    [FETCH_CHATS]: async ({ commit }, { roomId, offset }) => {
      try {
        const result = await Chat.fetch(roomId, offset);
        const chats = result.data;
        commit(SET_CHATS, chats);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
