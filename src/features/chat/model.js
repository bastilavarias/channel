const knex = require("../../db/knex");

const chatModel = {
  tableName: "chat",

  save: async ({ roomId, accountId, message, type, createdAt }) => {
    return await knex(chatModel.tableName)
      .insert({
        message,
        type,
        account_id: accountId,
        room_id: roomId,
        created_at: createdAt,
      })
      .returning([
        "id",
        "message",
        "type",
        "account_id",
        "room_id",
        "created_at",
      ])
      .then((result) => {
        const rawInformation = result[0];
        const chat = {};
        chat.id = rawInformation.id;
        chat.message = rawInformation.message;
        chat.type = rawInformation.type;
        chat.createdAt = rawInformation.created_at;
        return chat;
      });
  },
};

module.exports = chatModel;
