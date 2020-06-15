const express = require("express");
const application = express();
const account = require("./features/account/router");
const room = require("./features/room/router");
const chat = require("./features/chat/router");

application.use("/account", account);
application.use("/room", room);
application.use("/chat", chat);

module.exports = application;
