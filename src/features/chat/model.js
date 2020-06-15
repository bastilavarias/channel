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
          .select(["id", "username", "name", "avatar_url as avatarUrl"])
          .where("id", rawInformation.account_id)
          .then((result2) => result2[0]);
        chat.room = await knex("room")
          .select("id", "name")
          .where("id", rawInformation.room_id)
          .then((result3) => result3[0]);
        return chat;
      });
  },

  getRecent: async (accountId) => {
    return await knex
      .raw(
        `select c.room_id, c.account_id, c.message, c.type, c.created_at from chat c  where c.id in (select max(c2.id) from room_member as rm2 join chat as c2 on rm2.room_id = c2.room_id where rm2.account_id = ? group by c2.room_id) order by c.created_at desc;`,
        [accountId]
      )
      .then(async (result) => {
        return await Promise.all(
          result.rows.map(async (rawInformation) => {
            const chat = {};
            chat.message = rawInformation.message;
            chat.type = rawInformation.type;
            chat.createdAt = rawInformation.created_at;
            chat.room = await knex("room")
              .select(["id", "name", "avatar_url as avatarUrl"])
              .where("id", rawInformation.room_id)
              .then((result2) => result2[0]);
            chat.account = await knex("account")
              .select(["name"])
              .where("id", rawInformation.account_id)
              .then((result3) => result3[0]);
            return chat;
          })
        );
      });
  },

  fetch: async (roomId, offset) => {
    return await knex(chatModel.tableName)
      .select(["id", "message", "type", "account_id", "room_id", "created_at"])
      .where("room_id", roomId)
      .limit(20)
      .orderBy("created_at", "asc")
      .then(async (result) => {
        return await Promise.all(
          result.map(async (rawInformation) => {
            const chat = {};
            chat.id = rawInformation.id;
            chat.message = rawInformation.message;
            chat.type = rawInformation.type;
            chat.createdAt = rawInformation.created_at;
            chat.sender = await knex("account")
              .select(["id", "username", "name", "avatar_url as avatarUrl"])
              .where("id", rawInformation.account_id)
              .then((result2) => result2[0]);
            chat.room = await knex("room")
              .select("id", "name")
              .where("id", rawInformation.room_id)
              .then((result3) => result3[0]);
            return chat;
          })
        );
      });
  },
};

module.exports = chatModel;
