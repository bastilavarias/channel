const express = require("express");
const router = express.Router();
const roomController = require("./controller");
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  roomController.create
);

router.get(
  "/:keyword/:lastItemId",
  passport.authenticate("jwt", { session: false }),
  roomController.search
);

module.exports = router;
