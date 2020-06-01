const express = require("express");
const application = express();
const account = require("./features/account/router");

application.use("/account", account);

module.exports = application;
