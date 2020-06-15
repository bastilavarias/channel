const express = require("express");
const router = express.Router();
const chatController = require("./controller");
const passport = require("passport");

router.get(
  "/:roomId/:offset",
  passport.authenticate("jwt", { session: false }),
  chatController.fetch
);

module.exports = router;
