const adorableIOService = require("../adorable-io/service");
const roomModel = require("./model");
const utilityService = require("../utility/service");

const roomService = {
  create: async ({ name, description, type, password, accountId }) => {
    const id = utilityService.uuid();
    const avatarUrl = adorableIOService.generateAvatarUrl();
    const createdAt = utilityService.timestamp();
    const createdRoomId = await roomModel.create({
      id,
      name,
      description,
      type,
      password,
      avatarUrl,
      accountId,
      createdAt,
    });
    await roomService.addMember(createdRoomId, accountId);
    return {
      error: {},
      id: createdRoomId,
    };
  },

  addMember: async (createdRoomId, accountId) =>
    await roomModel.addMember(createdRoomId, accountId),

  search: async (keyword, offset) => await roomModel.search(keyword, offset),

  getInformation: async (roomId) => await roomModel.getInformation(roomId),

  getMembers: async (roomId) => {
    const members = await roomModel.getMembers(roomId);
    return {
      members,
    };
  },
};

module.exports = roomService;
