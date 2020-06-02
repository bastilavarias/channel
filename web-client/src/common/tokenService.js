import jwtDecoder from "jwt-decode";

const tokenKey = "id_token";

const tokenService = {
  save: (token) => {
    window.localStorage.setItem(tokenKey, token);
  },

  get: () => {
    return window.localStorage.getItem(tokenKey)
      ? window.localStorage.getItem(tokenKey)
      : null;
  },

  remove: () => {
    window.localStorage.removeItem(tokenKey);
  },

  getDecodedToken: () => {
    const token = tokenService.get();
    if (token) {
      return jwtDecoder(token);
    }
    return {};
  },
};

export default tokenService;
