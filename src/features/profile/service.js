const helperService = require("../helper/service");

const profileService = {
  getInformation: async (username) => {
    const getSingleAccountParams = {
      tableName: "account",
      columnName: "username",
      columnValue: username,
      targetColumns: ["id", "name", "username", "avatar_url as avatarUrl"],
    };
    const gotSingleAccount = await helperService.getSingle(
      getSingleAccountParams
    );
  },
};
