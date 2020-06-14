const adorableIOService = require("../adorable-io/service");
const roomModel = require("./model");
const utilityService = require("../utility/service");
const chatService = require("../chat/service");
const helperService = require("../helper/service");

const roomService = {
  create: async ({ name, description, type, password, accountId }) => {
    const id = utilityService.uuid();
    const avatarUrl = adorableIOService.generateAvatarUrl();
    const createdAt = utilityService.timestamp();
    const nameSlug = name.toLowerCase().trim();
    const createdRoomId = await roomModel.create({
      id,
      name,
      nameSlug,
      description,
      type,
      password,
      avatarUrl,
      accountId,
      createdAt,
    });
    await roomService.addMember(createdRoomId, accountId);
    const gotRawAccount = await helperService.getSingle(
      "account",
      "id",
      accountId,
      ["name"]
    );
    const firstChatDetails = {
      roomId: createdRoomId,
      accountId,
      message: `${gotRawAccount.name} created this group.`,
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
};

module.exports = roomService;
