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
      name: name.toLowerCase().trim(),
      description: description.toLowerCase().trim(),
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

  search: async (keyword, offset) => await roomModel.search(keyword, offset),
};

module.exports = roomService;
