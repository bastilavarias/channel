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
    const getSingleAccountParams = {
      tableName: "account",
      columnName: "id",
      columnValue: accountId,
      targetColumns: ["name"],
    };
    const gotSingleAccount = await helperService.getSingle(
      getSingleAccountParams
    );
    const firstChatDetails = {
      roomId: createdRoomId,
      accountId,
      message: `${gotSingleAccount.name} created this group.`,
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
    const getSingleRoomParams = {
      tableName: "room",
      columnName: "id",
      columnValue: roomId,
      targetColumns: ["id", "password", "type"],
    };
    const gotSingleRoom = await helperService.getSingle(getSingleRoomParams);
    const type = gotSingleRoom.type;
    let isAuthenticated = false;
    if (type === "private") {
      const hashedPassword = gotSingleRoom.password;
      isAuthenticated = await helperService.compareHashPassword(
        password,
        hashedPassword
      );
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
        id: gotSingleRoom.id,
      },
    };
  },

  sendBotChat: async ({ roomId, accountId, operationType }) => {
    const getSingleAccountParams = {
      tableName: "account",
      columnName: "id",
      columnValue: accountId,
      targetColumns: ["name"],
    };
    const gotSingleAccount = await helperService.getSingle(
      getSingleAccountParams
    );
    const operation = operationType === "join" ? "joined" : "leave";
    const chatDetails = {
      roomId,
      accountId,
      message: `${gotSingleAccount.name} ${operation} this group.`,
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

  leave: async (roomId, accountId) => {
    await chatModel.deleteRecent(roomId, accountId);
    await roomModel.removeMember(roomId, accountId);
    return {
      isLeft: true,
    };
  },
};

module.exports = roomService;
