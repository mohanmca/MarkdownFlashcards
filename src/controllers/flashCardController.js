const debug = require("debug")("app:flashCardControllers");
//const { MongoClient, ObjectId } = require('mongodb');

function flashCardControllers(flashCardService, nav) {
  function getFlashCard(priorQuestions) {
    console.log(
      " priorQuestions " +
        priorQuestions +
        " length " +
        flashCardService.getQuestionLength()
    );
    let qIndex = Math.floor(
      Math.random() * flashCardService.getQuestionLength()
    );
    console.log(" qIndex " + qIndex);
    const question = flashCardService.getQuestionAt(qIndex);
    const answer = flashCardService.getAnswerAt(qIndex);
    let attemptedQuestions = [];
    if (Array.isArray(priorQuestions)) {
      attemptedQuestions = priorQuestions;
    } else {
      attemptedQuestions.push(priorQuestions);
    }
    attemptedQuestions.push(qIndex);

    const flashCard = { question, answer, attemptedQuestions };
    return flashCard;
  }

  function getQuestion(req, res) {
    let flashCard = getFlashCard();
    debug("flashCard!" + JSON.stringify(flashCard, null, 2));
    res.render("showCard", {
      nav,
      flashCard,
      title: "Select Answer"
    });
  }

  function submitFeedback(req, res) {
    const { attemptedQuestions } = req.query;
    console.log("Prior attemptedQuestions question! " + attemptedQuestions);
    const flashCard = getFlashCard(attemptedQuestions);
    debug("flashCard!" + JSON.stringify(flashCard, null, 2));
    res.render("showCard", {
      nav,
      flashCard,
      title: "Select Answer"
    });
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect("/");
    }
  }

  return { middleware, getQuestion, submitFeedback };
}
module.exports = flashCardControllers;
