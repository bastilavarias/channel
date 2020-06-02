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
    return result.data;
  },

  getUserFollowing: async (username, token) => {
    const url = `https://api.github.com/users/${username}/following`;
    axios.defaults.headers.common["Authorization"] = `token ${token}`;
    const result = await axios.get(url);
    return result.data;
  },

  getUserFollowers: async (username, token) => {
    const url = `https://api.github.com/users/${username}/followers`;
    axios.defaults.headers.common["Authorization"] = `token ${token}`;
    const result = await axios.get(url);
    return result.data;
  },
};

module.exports = githubService;
