require("dotenv").config();

const express = require("express");
const application = express();
const bodyParser = require("body-parser");
const api = require("./api");
const passport = require("passport");
const jwtPassport = require("./passport");
const http = require("http");
const cors = require("cors");

const serverInstance = http.createServer(application);
const io = require("socket.io").listen(serverInstance);

io.on("connection", (socket) => {
  require("./features/room/socket")(io, socket);
});

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false }));
application.use("/api", api);
application.use(passport.initialize());
jwtPassport(passport);

module.exports = { serverInstance };
