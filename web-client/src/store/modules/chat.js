import {
  FETCH_CHATS,
  SET_CHATS,
  SOCKET_CHAT_RECENT,
  SOCKET_CHAT_SEND,
  SOCKET_CHAT_ADD_TYPING_ACCOUNT_INDICATOR,
  SOCKET_CHAT_REMOVE_TYPING_ACCOUNT_INDICATOR,
  SET_TYPING_ACCOUNTS,
} from "../types/chat";
import { Chat } from "../../common/apiService";

export default {
  state: {
    list: [],
    recent: [],
    typingAccounts: [],
  },

  mutations: {
    [SOCKET_CHAT_SEND]: (state, chat) => {
      state.list = [...state.list, chat];
    },

    [SOCKET_CHAT_RECENT]: (state, chats) => (state.recent = chats),

    [SET_CHATS]: (state, chats) => (state.list = chats),

    [SOCKET_CHAT_ADD_TYPING_ACCOUNT_INDICATOR]: (state, account) => {
      const typingAccounts = state.typingAccounts;
      const foundAccount = typingAccounts.find(
        ({ id }) => account.id === account.id
      );
      if (!foundAccount) {
        state.typingAccounts = [...state.typingAccounts, account];
      }
    },

    [SOCKET_CHAT_REMOVE_TYPING_ACCOUNT_INDICATOR]: (state, accountId) => {
      state.typingAccounts = state.typingAccounts.filter(
        (account) => account.id !== accountId
      );
    },

    [SET_TYPING_ACCOUNTS]: (state, accounts) =>
      (state.typingAccounts = accounts),
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
