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
                const adminInformation = {};
                adminInformation.id = result2[0].id;
                adminInformation.name = result2[0].name;
                adminInformation.avatarUrl = result2[0].avatar_url;
                return adminInformation;
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
            const adminInformation = {};
            adminInformation.id = result2[0].id;
            adminInformation.name = result2[0].name;
            adminInformation.avatarUrl = result2[0].avatar_url;
            return adminInformation;
          });
        return room;
      });
  },
};

module.exports = roomModel;
