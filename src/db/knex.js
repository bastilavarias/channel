const environment = process.env.ENVIRONMENT || "production";
const config = require("../../knexfile")[environment];
module.exports = require("knex")(config);
