import { Room } from "../../common/apiService";
import {
  ROOM_CREATE,
  ROOM_GET_FEATURED,
  ROOM_GET_INFORMATION,
  ROOM_SEARCH,
  SOCKET_ROOM_JOINED,
  SOCKET_ROOM_MEMBERS,
} from "../types/room";

export default {
  state: {
    members: [],
    joined: [],
  },

  mutations: {
    [SOCKET_ROOM_MEMBERS]: (state, members) => {
      state.members = members;
    },

    [SOCKET_ROOM_JOINED]: (state, joined) => {
      state.joined = joined;
    },
  },

  actions: {
    [ROOM_CREATE]: async (
      { commit },
      { name, description, type, password }
    ) => {
      try {
        const result = await Room.create({ name, description, type, password });
        const { id } = result.data;
        return id;
      } catch (error) {
        console.log(error);
      }
    },

    [ROOM_SEARCH]: async ({ commit }, { keyword, offset }) => {
      try {
        const result = await Room.search(keyword, offset);
        return result.data;
      } catch (error) {
        console.log(error);
      }
    },

    [ROOM_GET_FEATURED]: async ({ commit }, offset) => {
      try {
        const result = await Room.getFeatured(offset);
        return result.data;
      } catch (error) {
        console.log(error);
      }
    },

    [ROOM_GET_INFORMATION]: async ({ commit }, roomId) => {
      try {
        const result = await Room.getInformation(roomId);
        const information = result.data;
        return information ? information : {};
      } catch (error) {
        console.log(error);
      }
    },
  },
};
