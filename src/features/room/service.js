const adorableIOService = require("../adorable-io/service");
const roomModel = require("./model");
const utilityService = require("../utility/service");
const roomMemberService = require("../room-member/service");
const { emitAccountRooms } = require("./socket");

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
    await roomMemberService.create(createdRoomId, accountId);
    return {
      error: {},
      id: createdRoomId,
    };
  },

  search: async (keyword, offset) => await roomModel.search(keyword, offset),

  getInformation: async (roomId) => await roomModel.getInformation(roomId),
};

module.exports = roomService;
