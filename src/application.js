const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const application = express();
const server = http.createServer(application);
const io = socketio(server);
const api = require("./api");

application.use("/api", api);

module.exports = server;
