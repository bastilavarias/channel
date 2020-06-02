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
};

module.exports = roomModel;
