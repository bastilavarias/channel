const githubService = require("../github/service");
const helperService = require("../helper/service");
const accountModel = require("./model");
const utilityService = require("../utility/service");
const jsonWebToken = require("jsonwebtoken");

const accountService = {
  login: async (code) => {
    const gotGithubToken = await githubService.getToken(code);
    const {
      id,
      login,
      node_id,
      name,
      avatar_url,
    } = await githubService.getAuthenticatedUser(gotGithubToken);
    const gotRawAccount = await helperService.getSingle(
      "account",
      "username",
      login,
      ["*"]
    );
    const isGotAccountEmpty = Object.keys(gotRawAccount).length === 0;
    if (isGotAccountEmpty) {
      await accountModel.save({
        id,
        username: login,
        nodeId: node_id,
        name,
        avatarUrl: avatar_url,
        createdAt: utilityService.timestamp(),
      });
    }
    const tokenCredentials = {
      id,
      username: login,
      nodeId: node_id,
      name,
      avatarUrl: avatar_url,
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
};

module.exports = accountService;
