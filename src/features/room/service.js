const adorableIOService = require("../adorable-io/service");
const roomModel = require("./model");
const utilityService = require("../utility/service");
const chatService = require("../chat/service");
const helperService = require("../helper/service");

const roomService = {
  create: async ({ name, description, type, password, accountId }) => {
    const roomDetails = {
      id: utilityService.uuid(),
      name: name.trim(),
      nameSlug: name.toLowerCase().trim(),
      description: description.trim(),
      type,
      password: "",
      avatarUrl: adorableIOService.generateAvatarUrl(),
      accountId,
      createdAt: utilityService.timestamp(),
    };
    if (type === "private") {
      roomDetails.password = await helperService.hashPassword(password);
    }
    const createdRoomId = await roomModel.create(roomDetails);
    await roomService.addMember(createdRoomId, accountId);
    const gotRawAccountInformation = await helperService.getSingle(
      "account",
      "id",
      accountId,
      ["name"]
    );
    const firstChatDetails = {
      roomId: createdRoomId,
      accountId,
      message: `${gotRawAccountInformation.name} created this group.`,
      type: "system",
    };
    await chatService.save(firstChatDetails);
    return {
      error: {},
      id: createdRoomId,
    };
  },

  addMember: async (createdRoomId, accountId) =>
    await roomModel.addMember(createdRoomId, accountId),

  search: async (keyword, offset) =>
    await roomModel.search(keyword.trim().toLowerCase(), offset),

  getFeatured: async (offset) => await roomModel.getFeatured(offset),

  getInformation: async (roomId) => await roomModel.getInformation(roomId),

  getMembers: async (roomId) => {
    const members = await roomModel.getMembers(roomId);
    return {
      members,
    };
  },

  getJoined: async (accountId) => {
    const rooms = await roomModel.getJoined(accountId);
    return {
      rooms,
    };
  },

  join: async ({ roomId, accountId, password }) => {
    const error = {};
    const gotRawRoomInformation = await helperService.getSingle(
      "room",
      "id",
      roomId,
      ["type, password"]
    );
    const type = gotRawRoomInformation.type;
    let isAuthenticated = false;
    if (type === "private") {
      isAuthenticated = await helperService.hashPassword(
        password,
        gotRawRoomInformation.password
      );
    }
    if (type === "private" && !isAuthenticated) {
      error.password = "Password do not match.";
      return {
        isAuthenticated: false,
        error,
      };
    }
    await roomService.addMember(roomId, accountId);
    return {
      isAuthenticated: true,
      error,
    };
  },
};

module.exports = roomService;
