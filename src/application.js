require("dotenv").config();
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const application = express();
const server = http.createServer(application);
const io = socketio(server);
const bodyParser = require("body-parser");
const api = require("./api");
const passport = require("passport");
const jwtPassport = require("./passport");

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false }));
application.use("/api", api);
application.use(passport.initialize());
jwtPassport(passport);

module.exports = server;
