const roomModel = require("./model");

const roomMemberService = {
  create: async (roomId, accountId) =>
    await roomModel.create(roomId, accountId),
};
module.exports = roomMemberService;
