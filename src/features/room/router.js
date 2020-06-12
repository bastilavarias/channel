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
  "/information/:roomId",
  passport.authenticate("jwt", { session: false }),
  roomController.getInformation
);

router.get(
  "/search/:keyword/:offset",
  passport.authenticate("jwt", { session: false }),
  roomController.search
);

module.exports = router;
