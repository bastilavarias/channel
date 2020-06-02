const knex = require("../../db/knex");

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
};

module.exports = helperService;
