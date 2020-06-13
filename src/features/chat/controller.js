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
};

module.exports = chatController;
