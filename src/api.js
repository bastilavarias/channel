const express = require("express");
const application = express();
const account = require("./features/account/router");
const room = require("./features/room/router");

application.use("/account", account);
application.use("/room", room);

module.exports = application;
