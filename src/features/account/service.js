const githubService = require("../github/service");
const helperService = require("../helper/service");
const accountModel = require("./model");
const utilityService = require("../utility/service");
const jsonWebToken = require("jsonwebtoken");

const accountService = {
  login: async (code) => {
    const gotGithubToken = await githubService.getToken(code);
    const gotGithubAuthenticatedUser = await githubService.getAuthenticatedUser(
      gotGithubToken
    );
    const getSingleAccountParams = {
      tableName: "account",
      columnName: "username",
      columnValue: gotGithubAuthenticatedUser.login,
      targetColumns: ["*"],
    };
    const gotSingleAccount = await helperService.getSingle(
      getSingleAccountParams
    );
    const isGotAccountEmpty = Object.keys(gotSingleAccount).length === 0;
    if (isGotAccountEmpty) {
      await accountModel.save({
        id: gotGithubAuthenticatedUser.id,
        username: gotGithubAuthenticatedUser.login,
        nodeId: gotGithubAuthenticatedUser.node_id,
        name: gotGithubAuthenticatedUser.name
          ? gotGithubAuthenticatedUser.name
          : gotGithubAuthenticatedUser.login,
        avatarUrl: gotGithubAuthenticatedUser.avatar_url,
        createdAt: utilityService.timestamp(),
      });
    }
    const tokenCredentials = {
      id: gotGithubAuthenticatedUser.id,
      username: gotGithubAuthenticatedUser.login,
      nodeId: gotGithubAuthenticatedUser.node_id,
      name: gotGithubAuthenticatedUser.name,
      avatarUrl: gotGithubAuthenticatedUser.avatar_url,
      githubToken: gotGithubToken,
    };
    const jsonToken = jsonWebToken.sign(
      tokenCredentials,
      process.env.AUTH_SECRET_KEY
    );
    return {
      token: `Bearer ${jsonToken}`,
    };
  },

  checkCurrent: async (id, githubToken) => {
    const getSingleAccountParams = {
      tableName: "account",
      columnName: "id",
      columnValue: id,
      targetColumns: ["id", "name", "username", "avatar_url as avatarUrl"],
    };
    const gotSingleAccount = await helperService.getSingle(
      getSingleAccountParams
    );
    const tokenCredentials = {
      ...gotSingleAccount,
      githubToken,
    };
    const jsonToken = jsonWebToken.sign(
      tokenCredentials,
      process.env.AUTH_SECRET_KEY
    );
    return {
      token: `Bearer ${jsonToken}`,
    };
  },
};

module.exports = accountService;
