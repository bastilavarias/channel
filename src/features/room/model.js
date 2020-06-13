const knex = require("../../db/knex");

const roomModel = {
  tableName: "room",

  create: async ({
    id,
    name,
    description,
    type,
    password,
    avatarUrl,
    accountId,
    createdAt,
  }) => {
    return await knex(roomModel.tableName)
      .insert({
        id,
        name,
        description,
        type,
        password,
        avatar_url: avatarUrl,
        account_id: accountId,
        created_at: createdAt,
      })
      .returning("id")
      .then((result) => result[0]);
  },

  addMember: async (roomId, accountId) => {
    return await knex(`${roomModel.tableName}_member`).insert({
      room_id: roomId,
      account_id: accountId,
    });
  },

  search: async (keyword, offset) => {
    return await knex(roomModel.tableName)
      .select(["id", "name", "type", "avatar_url", "account_id"])
      .where("name", "like", `%${keyword}%`)
      .offset(offset)
      .limit(20)
      .orderBy("name", "asc")
      .then(async (result) => {
        return Promise.all(
          result.map(async (rawInformation) => {
            const room = {};
            room.id = rawInformation.id;
            room.name = rawInformation.name;
            room.type = rawInformation.type;
            room.avatarUrl = rawInformation.avatar_url;
            room.admin = await knex("account")
              .select(["id", "name", "avatar_url"])
              .where("id", rawInformation.account_id)
              .then((result2) => {
                const admin = {};
                admin.id = result2[0].id;
                admin.name = result2[0].name;
                admin.avatarUrl = result2[0].avatar_url;
                return admin;
              });
            room.members = await knex("room_member")
              .count("id")
              .where("room_id", rawInformation.id)
              .then((result3) =>
                result3[0].count ? parseInt(result3[0].count) : 0
              );
            return room;
          })
        );
      });
  },

  getInformation: async (roomId) => {
    return await knex(roomModel.tableName)
      .select(["id", "name", "description", "type", "avatar_url", "account_id"])
      .where("id", roomId)
      .then(async (result) => {
        const rawInformation = result[0];
        const room = {};
        room.id = rawInformation.id;
        room.name = rawInformation.name;
        room.description = rawInformation.description;
        room.type = rawInformation.type;
        room.avatarUrl = rawInformation.avatar_url;
        room.admin = await knex("account")
          .select(["id", "name", "avatar_url"])
          .where("id", rawInformation.account_id)
          .then((result2) => {
            const admin = {};
            admin.id = result2[0].id;
            admin.name = result2[0].name;
            admin.avatarUrl = result2[0].avatar_url;
            return admin;
          });
        return room;
      });
  },

  getMembers: async (roomId) => {
    return await knex(`${roomModel.tableName}_member`)
      .select("account_id")
      .where("room_id", roomId)
      .then(async (result) => {
        return Promise.all(
          result.map(async (rawInformation) => {
            return await knex("account")
              .select(["id", "username", "name", "avatar_url"])
              .where("id", rawInformation.account_id)
              .then((result2) => {
                const account = {};
                account.id = result2[0].id;
                account.username = result2[0].username;
                account.name = result2[0].name;
                account.avatarUrl = result2[0].avatar_url;
                return account;
              });
          })
        );
      });
  },

  getJoined: async (accountId) => {
    return await knex(`${roomModel.tableName}_member`)
      .select(["account_id", "room_id"])
      .where("account_id", accountId)
      .then((result) => {
        return Promise.all(
          result.map(async (rawInformation) => {
            const rooms = await knex("room")
              .select(["id", "name", "avatar_url"])
              .where("id", rawInformation.room_id)
              .then(async (result2) => {
                const room = {};
                room.id = result2[0].id;
                room.name = result2[0].name;
                room.avatarUrl = result2[0].avatar_url;
                room.recentChat = await knex("chat")
                  .select(["account_id", "message", "type", "created_at"])
                  .where("room_id", room.id)
                  .orderBy("created_at", "desc")
                  .then(async (result3) => {
                    const chat = {};
                    chat.message = result3[0].message;
                    chat.type = result3[0].type;
                    chat.createdAt = result3[0].created_at;
                    chat.account = await knex("account")
                      .select(["name"])
                      .where("id", result3[0].account_id)
                      .then((result4) => {
                        const account = {};
                        account.name = result4[0].name;
                        return account;
                      });
                    return chat;
                  });
                return room;
              });
            return rooms;
          })
        );
      });
  },
};

module.exports = roomModel;
