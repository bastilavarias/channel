const accountController = {
  login: (req, res) => {
    const code = req.body.code;
    console.log(code);
  },
};

module.exports = accountController;
