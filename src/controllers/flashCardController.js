const debug = require("debug")("app:flashCardControllers");
//const { MongoClient, ObjectId } = require('mongodb');

function flashCardControllers(flashCardService, nav) {
    function getRandomExcluding(max, exclude) {
        let qIndex = Math.floor(Math.random() * max);

        if (exclude.indexOf(qIndex) == -1) {
            return qIndex;
        }
        return getRandomExcluding(max, exclude);
    }

    function getFlashCard(markdown, priorQuestions) {
        console.log(
            " priorQuestions " +
            priorQuestions +
            " length " +
            flashCardService.getQuestionLength(markdown)
        );
        let exclude = !!priorQuestions ?
            priorQuestions.split(",").map(i => parseInt(i)) : [];

        let qIndex = getRandomExcluding(
            flashCardService.getQuestionLength(markdown),
            exclude
        );

        console.log(" qIndex " + qIndex);
        const question = flashCardService.getQuestionAt(markdown, qIndex);
        const answer = flashCardService.getAnswerAt(markdown, qIndex);
        let attemptedQuestions = [];
        const previousQuestions = !!priorQuestions ?
            priorQuestions + "," + qIndex :
            qIndex + "";

        const flashCard = {
            question,
            answer,
            previousQuestions,
            qIndex,
            size: flashCardService.getQuestionLength(markdown)
        };
        return flashCard;
    }

    function getQuestion(req, res) {
        let { markDown } = {...req.params }
        console.log('getQuestion ********************** Params ' + JSON.stringify(req.params, 2, null));
        let flashCard = getFlashCard(markDown);
        debug("flashCard!" + JSON.stringify(flashCard, null, 2));
        res.render("showFlashCard", {
            nav,
            flashCard,
            title: "Select Answer"
        });
    }

    function submitFeedback(req, res) {
        let { markDown } = {...req.params }
        console.log('submitFeedback ********************** Params ' + JSON.stringify(req.params, 2, null));
        const { previousQuestions } = req.query;
        const flashCard = getFlashCard(markDown, previousQuestions);
        // debug("flashCard!" + JSON.stringify(flashCard, null, 2));
        res.render("showFlashCard", {
            nav,
            flashCard,
            title: "Select Answer"
        });
    }

    return { getQuestion, submitFeedback };
}
module.exports = flashCardControllers;