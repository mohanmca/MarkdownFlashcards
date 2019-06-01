/* eslint-disable prefer-destructuring */

const express = require("express");
const flashCardService = require("../services/flashCardService");
const flashCardController = require("../controllers/flashCardController.js");
const filesController = require("../controllers/filesController");

function router(nav) {
    const flashCardRouter = express.Router();
    const { submitFeedback } = flashCardController(
        flashCardService,
        nav
    );
    const { getFile } = filesController(
        nav
    );
    flashCardRouter.route("/homepage").get(getFile);
    flashCardRouter.route("/:markDown/").get(submitFeedback);
    flashCardRouter.route("/:markDown/submitFeedback").all(submitFeedback);

    return flashCardRouter;
}

module.exports = router;