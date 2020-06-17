const axios = require("axios");

const githubService = {
  getToken: async (code) => {
    const url = "https://github.com/login/oauth/access_token";
    const result = await axios.post(url, {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    });
    const rawToken = result.data;
    return githubService.formatRawToken(rawToken);
  },

  formatRawToken: (rawToken) => {
    const tokenPartsArray = rawToken.split(/[=&]/);
    return tokenPartsArray[1];
  },

  getAuthenticatedUser: async (token) => {
    const url = "https://api.github.com/user";
    axios.defaults.headers.common["Authorization"] = `token ${token}`;
    const result = await axios.get(url);
    return result.data;
  },

  getUser: async (username, token) => {
    const url = `https://api.github.com/users/${username}`;
    axios.defaults.headers.common["Authorization"] = `token ${token}`;
    const result = await axios.get(url);
    return result.data;
  },

  getUserRepositories: async (username, token) => {
    const url = `https://api.github.com/users/${username}/repos`;
    axios.defaults.headers.common["Authorization"] = `token ${token}`;
    const result = await axios.get(url);
    const gotGithubRepositories = result.data ? result.data : [];
    return gotGithubRepositories.map((repository) => {
      return {
        name: repository.name ? repository.name : "",
        description: repository.description ? repository.description : "",
        githubUrl: repository.html_url ? repository.html_url : "",
        stars: repository.stargazers_count
          ? parseInt(repository.stargazers_count)
          : 0,
        createdAt: repository.created_at ? repository.created_at : "",
      };
    });
  },

  getUserFollowing: async (username, token) => {
    const url = `https://api.github.com/users/${username}/following`;
    axios.defaults.headers.common["Authorization"] = `token ${token}`;
    const result = await axios.get(url);
    const gotGithubFollowings = result.data ? result.data : [];
    return await Promise.all(
      gotGithubFollowings.map(async (account) => {
        const gotGithubUser = await githubService.getUser(account.login, token);
        return {
          name: gotGithubUser.name ? gotGithubUser.name : "",
          username: gotGithubUser.login ? gotGithubUser.login : "",
          avatarUrl: gotGithubUser.avatar_url ? gotGithubUser.avatar_url : "",
          websiteUrl: gotGithubUser.blog ? gotGithubUser.blog : "",
          githubUrl: gotGithubUser.html_url ? gotGithubUser.html_url : "",
        };
      })
    );
  },

  getUserFollowers: async (username, token) => {
    const url = `https://api.github.com/users/${username}/followers`;
    axios.defaults.headers.common["Authorization"] = `token ${token}`;
    const result = await axios.get(url);
    const gotGithubFollowers = result.data ? result.data : [];
    return await Promise.all(
      gotGithubFollowers.map(async (account) => {
        const gotGithubUser = await githubService.getUser(account.login, token);
        return {
          name: gotGithubUser.name ? gotGithubUser.name : "",
          username: gotGithubUser.login ? gotGithubUser.login : "",
          avatarUrl: gotGithubUser.avatar_url ? gotGithubUser.avatar_url : "",
          websiteUrl: gotGithubUser.blog ? gotGithubUser.blog : "",
          githubUrl: gotGithubUser.html_url ? gotGithubUser.html_url : "",
        };
      })
    );
  },
};

module.exports = githubService;
