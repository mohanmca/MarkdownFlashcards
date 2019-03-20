/* eslint-disable prefer-destructuring */

const express = require("express");
const flashCardService = require("../services/flashCardService");
const flashCardController = require("../controllers/flashCardController.js");

function router(nav) {
  const flashCardRouter = express.Router();
  const { submitFeedback, middleware } = flashCardController(
    flashCardService,
    nav
  );

  flashCardRouter.use(middleware);
  flashCardRouter.route("/").get(submitFeedback);
  flashCardRouter.route("/submitFeedback").all(submitFeedback);

  return flashCardRouter;
}

module.exports = router;