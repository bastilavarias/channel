const knex = require("../../db/knex");
const bcrypt = require("bcryptjs");

const helperService = {
  getSingle: async (tableName, columnName, columnValue, targetColumns) => {
    return await knex
      .select(targetColumns)
      .from(tableName)
      .where(columnName, columnValue)
      .then((result) => {
        if (result.length === 0) return {};
        return result[0];
      });
  },

  hashPassword: async (plainTextPassword) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    return await bcrypt.hash(plainTextPassword, salt);
  },

  compareHashPassword: async (hashedPassword, plainTextPassword) => {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  },
};

module.exports = helperService;
