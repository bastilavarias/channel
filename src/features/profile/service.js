const helperService = require("../helper/service");

const profileService = {
  getInformation: async (username) => {
    const getRawAccountParams = {
      tableName: "account",
      columnName: "username",
      columnValue: username,
      targetColumns: ["id", "name", "username", "avatar_url as avatarUrl"],
    };
    const gotRawAccount = await helperService.getSingle(getRawAccountParams);
  },
};
