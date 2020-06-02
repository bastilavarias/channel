const roomService = require("./service");

const roomController = {
  create: async (req, res) => {
    try {
      const name = req.body.name;
      const description = req.body.description;
      const type = req.body.type;
      const password = req.body.password;
      const result = await roomService.create({
        name,
        description,
        type,
        password,
        accountId: req.user.id,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  search: async (req, res) => {
    try {
      const keyword = req.params.keyword;
      const lastItemId = parseInt(req.params.lastItemId);
      const result = await roomService.search(keyword, lastItemId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

module.exports = roomController;
