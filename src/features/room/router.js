const express = require("express");
const router = express.Router();
const roomController = require("./controller");
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  roomController.create
);

module.exports = router;
