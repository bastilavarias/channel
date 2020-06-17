const profileService = require("./service");

const profileController = {
  getBasicInformation: async (req, res) => {
    try {
      const username = req.params.username;
      const result = await profileService.getBasicInformation(username);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

module.exports = profileController;
