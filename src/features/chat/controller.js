const chatService = require("./service");

const chatController = {
  save: async ({ roomId, accountId, message, type }) => {
    let chatDetails = {};
    try {
      const result = await chatService.save({
        roomId,
        accountId,
        message,
        type,
      });
      chatDetails = result.details;
    } catch (error) {
      console.log(error);
    }
    return chatDetails;
  },

  getRecent: async (accountId) => {
    let chats = [];
    try {
      const result = await chatService.getRecent(accountId);
      chats = result.chats;
    } catch (error) {
      console.log(error);
    }
    return chats;
  },
};

module.exports = chatController;
