const express = require("express");
const router = express.Router();
const profileController = require("./controller");
const passport = require("passport");

router.get(
  "/basic-information/:username",
  passport.authenticate("jwt", { session: false }),
  profileController.getBasicInformation
);

module.exports = router;
