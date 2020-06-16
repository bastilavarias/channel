const chatModel = require("./model");
const utilityService = require("../utility/service");
const roomModel = require("../room/model");

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
    const roomMembers = await roomModel.getMembers(chatDetails.room.id);
    roomMembers.map(async (member) => {
      await chatModel.addRecent({
        accountId: member.id,
        chatId: chatDetails.id,
        roomId: chatDetails.room.id,
      });
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

  fetch: async (roomId, offset) => await chatModel.fetch(roomId, offset),
};

module.exports = chatService;
