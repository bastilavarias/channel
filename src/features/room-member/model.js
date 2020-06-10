const knex = require("../../db/knex");

const roomMemberModel = {
  tableName: "room_member",

  create: async (roomId, accountId) => {
    return await knex(roomMemberModel.tableName).insert({
      room_id: roomId,
      account_id: accountId,
    });
  },
};
module.exports = roomMemberModel;
