/* eslint-disable prefer-destructuring */

const express = require("express");
const flashCardService = require("../services/flashCardService");
const flashCardController = require("../controllers/flashCardController.js");

function router(nav) {
  const flashCardRouter = express.Router();
  const { submitFeedback } = flashCardController(
    flashCardService,
    nav
  );

  flashCardRouter.route("/:markDown/").get(submitFeedback);
  flashCardRouter.route("/:markDown/submitFeedback").all(submitFeedback);

  return flashCardRouter;
}

module.exports = router;