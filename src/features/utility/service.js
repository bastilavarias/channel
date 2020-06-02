const { uuid } = require("uuidv4");

const utilityService = {
  timestamp: () => new Date().toISOString(),

  uuid: () => uuid(),
};

module.exports = utilityService;
