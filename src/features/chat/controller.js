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

  readRecent: async ({ chatId, accountId, roomId }) => {
    try {
      await chatService.readRecent({ chatId, accountId, roomId });
    } catch (error) {
      throw new Error(error);
    }
  },

  fetch: async (req, res) => {
    try {
      const roomId = req.params.roomId;
      const offset = parseInt(req.params.offset);
      const result = await chatService.fetch(roomId, offset);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

module.exports = chatController;
