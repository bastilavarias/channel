const chatModel = require("./model");
const utilityService = require("../utility/service");

const chatService = {
  save: async ({ roomId, accountId, message, type }) => {
    const createdAt = utilityService.timestamp();
    const chatDetails = await chatModel.save({
      roomId,
      accountId,
      message,
      type,
      createdAt,
    });
    return {
      details: chatDetails,
    };
  },

  getRecent: async (accountId) => {
    const chats = await chatModel.getRecent(accountId);
    return {
      chats,
    };
  },
};

module.exports = chatService;
