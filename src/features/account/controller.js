const accountService = require("./service");

const accountController = {
  login: async (req, res) => {
    try {
      const code = req.body.code;
      const gotAccount = await accountService.login(code);
      res.status(200).json(gotAccount);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

module.exports = accountController;
