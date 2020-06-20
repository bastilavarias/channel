const environment = process.env.ENVIRONMENT || "production";
console.log(environment);
const config = require("../../knexfile")[environment];
module.exports = require("knex")(config);
