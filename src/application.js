require("dotenv").config();

const express = require("express");
const application = express();
const bodyParser = require("body-parser");
const api = require("./api");
const passport = require("passport");
const jwtPassport = require("./passport");
const http = require("http");
const cors = require("cors");

application.use(cors());
const serverInstance = http.createServer(application);
const io = require("socket.io").listen(serverInstance);

io.on("connection", (socket) => {
  require("./features/room/socket")(io, socket);
  require("./features/chat/socket")(io, socket);
});

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false }));
application.use("/api", api);
application.use(passport.initialize());
jwtPassport(passport);

if (process.env.NODE_ENV === "production") {
  application.use(express.static(__dirname + "/public/"));
  application.get(/.*/, (req, res) =>
    res.sendFile(__dirname + "/public/index.html")
  );
}

module.exports = { serverInstance };
