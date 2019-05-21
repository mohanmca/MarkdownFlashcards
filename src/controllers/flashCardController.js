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
    const previousQuestions = !!priorQuestions ?  priorQuestions + "," + qIndex : qIndex+"";

    const flashCard = { question, answer, previousQuestions, qIndex, size: flashCardService.getQuestionLength() };
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
    const { previousQuestions } = req.query;
    const flashCard = getFlashCard(previousQuestions);
    // debug("flashCard!" + JSON.stringify(flashCard, null, 2));
    res.render("showCard", {
      nav,
      flashCard,
      title: "Select Answer"
    });
  }

  return { getQuestion, submitFeedback };
}
module.exports = flashCardControllers;
