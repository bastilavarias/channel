const knex = require("../../db/knex");

const roomModel = {
  tableName: "room",

  create: async ({
    id,
    name,
    nameSlug,
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
        name_slug: nameSlug,
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
      .where("name_slug", "like", `%${keyword}%`)
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

  getFeatured: async (offset) => {
    return await knex(`${roomModel.tableName}_member as rm`)
      .join(`${roomModel.tableName} as r`, "rm.room_id", "=", "r.id")
      .join("chat as c", "rm.room_id", "=", "c.room_id")
      .select([
        {
          relevance: knex.raw(
            "(coalesce(count(rm.account_id), 0) + coalesce(count(c.id), 0))"
          ),
        },
        "r.id",
        "r.name",
        "r.type",
        "r.avatar_url",
        "r.account_id",
      ])
      .offset(offset)
      .orderBy("relevance", "desc")
      .groupBy("r.id")
      .limit(20)
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
    return await knex
      .raw(
        `select c.room_id, c.account_id as account_id, c.message, c.type, c.created_at from chat c  where c.id in (select max(c2.id) from room_member as rm2 join chat as c2 on rm2.room_id = c2.room_id where rm2.account_id = ? group by c2.room_id) order by c.created_at desc;`,
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
};

module.exports = roomModel;
