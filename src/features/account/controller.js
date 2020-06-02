const accountService = require("./service");

const accountController = {
  login: async (req, res) => {
    try {
      const code = req.body.code;
      const result = await accountService.login(code);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  checkCurrent: async (req, res) => {
    try {
      const account = req.user;
      const result = await accountService.checkCurrent(account);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

module.exports = accountController;
