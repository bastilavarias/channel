const knex = require("../../db/knex");

const accountModel = {
  tableName: "account",

  save: async ({ id, username, nodeId, name, avatarUrl, createdAt }) => {
    return await knex(accountModel.tableName).insert({
      id,
      username,
      name,
      node_id: nodeId,
      avatar_url: avatarUrl,
      created_at: createdAt,
    });
  },
};

module.exports = accountModel;
