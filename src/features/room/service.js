const adorableIOService = require("../adorable.io/service");
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
    return {
      error: {},
      id: createdRoomId,
    };
  },
};

module.exports = roomService;
