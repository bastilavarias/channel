const express = require("express");
const router = express.Router();
const accountController = require("./controller");
const passport = require("passport");

router.post("/login", accountController.login);

router.get(
  "/check-current",
  passport.authenticate("jwt", { session: false }),
  accountController.checkCurrent
);

module.exports = router;
