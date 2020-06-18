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
      console.log(error);
      res.status(400).json(error);
    }
  },

  search: async (req, res) => {
    try {
      const keyword = req.params.keyword;
      const offset = parseInt(req.params.offset);
      const result = await roomService.search(keyword, offset);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  getFeatured: async (req, res) => {
    try {
      const offset = parseInt(req.params.offset);
      const result = await roomService.getFeatured(offset);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  getInformation: async (req, res) => {
    try {
      const roomId = req.params.roomId;
      const result = await roomService.getInformation(roomId);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  getMembers: async (roomId) => {
    let members = [];
    try {
      const result = await roomService.getMembers(roomId);
      members = result.members;
    } catch (error) {
      console.log(error);
    }
    return members;
  },

  join: async (req, res) => {
    try {
      const roomId = req.body.roomId;
      const password = req.body.password;
      const result = await roomService.join({
        roomId,
        password,
        accountId: req.user.id,
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  sendJoinChat: async (roomId, accountId) => {
    let details = {};
    try {
      const result = await roomService.sendJoinChat(roomId, accountId);
      details = result.details;
    } catch (error) {
      console.log(error);
    }
    return details;
  },
};

module.exports = roomController;
