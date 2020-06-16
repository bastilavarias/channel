const adorableIOService = require("../adorable-io/service");
const roomModel = require("./model");
const utilityService = require("../utility/service");
const chatModel = require("../chat/model");
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
      createdAt: utilityService.timestamp(),
    };
    const savedFirstChatDetails = await chatModel.save(firstChatDetails);
    const gotRoomMembers = await roomModel.getMembers(createdRoomId);
    gotRoomMembers.map(async (member) => {
      await chatModel.addRecent({
        accountId: member.id,
        chatId: savedFirstChatDetails.id,
        roomId: createdRoomId,
      });
    });
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

  join: async ({ roomId, accountId, password }) => {
    const error = {};
    const gotRawRoomInformation = await helperService.getSingle(
      "room",
      "id",
      roomId,
      ["*"]
    );
    const type = gotRawRoomInformation.type;
    let isAuthenticated = false;
    if (type === "private") {
      const hashedPassword = gotRawRoomInformation.password;
      isAuthenticated = await helperService.compareHashPassword(
        password,
        hashedPassword
      );
      console.log(isAuthenticated);
    }
    if (type === "private" && !isAuthenticated) {
      error.password = "Password do not match.";
      return {
        isAuthenticated: false,
        error,
        room: {},
      };
    }
    await roomService.addMember(roomId, accountId);
    return {
      isAuthenticated: true,
      error,
      room: {
        id: gotRawRoomInformation.id,
      },
    };
  },

  sendJoinMessage: async (roomId, accountId) => {
    const gotRawAccountInformation = await helperService.getSingle(
      "account",
      "id",
      accountId,
      ["name"]
    );
    const chatDetails = {
      roomId,
      accountId,
      message: `${gotRawAccountInformation.name} joined this group.`,
      type: "system",
      createdAt: utilityService.timestamp(),
    };
    const savedChatDetails = await chatModel.save(chatDetails);
    const gotRoomMembers = await roomModel.getMembers(savedChatDetails.room.id);
    gotRoomMembers.map(async (member) => {
      await chatModel.addRecent({
        accountId: member.id,
        chatId: savedChatDetails.id,
        roomId: savedChatDetails.room.id,
      });
    });
    return {
      details: savedChatDetails,
    };
  },
};

module.exports = roomService;
