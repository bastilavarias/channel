const express = require("express");
const router = express.Router();
const profileController = require("./controller");
const passport = require("passport");

router.get(
  "/basic-information/:username",
  passport.authenticate("jwt", { session: false }),
  profileController.getBasicInformation
);

router.get(
  "/github-information/:username",
  passport.authenticate("jwt", { session: false }),
  profileController.getGithubInformation
);

module.exports = router;
