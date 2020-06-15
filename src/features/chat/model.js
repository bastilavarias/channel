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
      .then(async (result) => {
        const rawInformation = result[0];
        const chat = {};
        chat.id = rawInformation.id;
        chat.message = rawInformation.message;
        chat.type = rawInformation.type;
        chat.createdAt = rawInformation.created_at;
        chat.sender = await knex("account")
          .select(["id", "username", "name", "avatar_url"])
          .where("id", rawInformation.account_id)
          .then((result2) => {
            const sender = {};
            sender.id = result2[0].id;
            sender.username = result2[0].username;
            sender.name = result2[0].name;
            sender.avatarUrl = result2[0].avatar_url;
            return sender;
          });
        chat.room = await knex("room")
          .select("id", "name")
          .where("id", rawInformation.room_id)
          .then((result3) => {
            const room = {};
            room.id = result3[0].id;
            room.name = result3[0].name;
            return room;
          });
        return chat;
      });
  },

  getRecent: (accountId) => {},
};

module.exports = chatModel;
