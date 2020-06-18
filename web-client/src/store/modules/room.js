import { Room } from "../../common/apiService";
import {
  ROOM_CREATE,
  ROOM_DESTROY,
  ROOM_GET_FEATURED,
  ROOM_GET_INFORMATION,
  ROOM_JOIN,
  ROOM_LEAVE,
  ROOM_SEARCH,
  SOCKET_ROOM_MEMBERS,
} from "../types/room";

export default {
  state: {
    members: [],
  },

  mutations: {
    [SOCKET_ROOM_MEMBERS]: (state, members) => {
      state.members = members;
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

    [ROOM_JOIN]: async ({ commit }, { roomId, password }) => {
      try {
        const result = await Room.join(roomId, password);
        return result.data;
      } catch (error) {
        console.log(error);
      }
    },

    [ROOM_LEAVE]: async ({ commit }, roomId) => {
      try {
        const result = await Room.leave(roomId);
        const { isLeft } = result.data;
        return isLeft;
      } catch (error) {
        console.log(error);
      }
    },

    [ROOM_DESTROY]: async ({ commit }, roomId) => {
      try {
        const result = await Room.destroy(roomId);
        const { isDestroyed } = result.data;
        return isDestroyed;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
