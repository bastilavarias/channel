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
          result.map(async (room) => {
            const roomInformation = {};
            roomInformation.id = room.id;
            roomInformation.name = room.name;
            roomInformation.type = room.type;
            roomInformation.avatarUrl = room.avatar_url;
            roomInformation.admin = await knex("account")
              .select(["id", "username", "avatar_url"])
              .where("id", room.account_id)
              .then((result2) => {
                const adminInformation = {};
                adminInformation.id = result2[0].id;
                adminInformation.username = result2[0].username;
                adminInformation.avatarUrl = result2[0].avatar_url;
                return adminInformation;
              });
            return roomInformation;
          })
        );
      });
  },
};

module.exports = roomModel;
