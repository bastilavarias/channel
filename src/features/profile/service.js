const helperService = require("../helper/service");
const githubService = require("../github/service");

const profileService = {
  getBasicInformation: async (username) => {
    const getSingleAccountParams = {
      tableName: "account",
      columnName: "username",
      columnValue: username,
      targetColumns: ["id", "name", "username", "avatar_url as avatarUrl"],
    };
    const gotSingleAccount = await helperService.getSingle(
      getSingleAccountParams
    );
    return {
      information: gotSingleAccount,
    };
  },

  getGithubInformation: async (username, githubToken) => {
    const information = {};
    const gotGithubUser = await githubService.getUser(username, githubToken);
    const gotGithubRepositories = await githubService.getUserRepositories(
      username,
      githubToken
    );
    const gotGithubFollowers = await githubService.getUserFollowers(
      username,
      githubToken
    );
    const gotGithubFollowing = await githubService.getUserFollowing(
      username,
      githubToken
    );
    information.githubUrl = gotGithubUser.html_url
      ? gotGithubUser.html_url
      : "";
    information.websiteUrl = gotGithubUser.blog ? gotGithubUser.blog : "";
    information.bio = gotGithubUser.bio ? gotGithubUser.bio : "";
    information.email = gotGithubUser.email ? gotGithubUser.email : "";
    information.twitterUsername = gotGithubUser.twitter_username
      ? gotGithubUser.twitter_username
      : "";
    information.repositories = gotGithubRepositories
      ? gotGithubRepositories
      : [];
    information.followers = gotGithubFollowers ? gotGithubFollowers : [];
    information.following = gotGithubFollowing ? gotGithubFollowing : [];
    return {
      information,
    };
  },
};

module.exports = profileService;
