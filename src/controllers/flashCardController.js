const debug = require("debug")("app:flashCardControllers");
const fs = require('fs')
    //const { MongoClient, ObjectId } = require('mongodb');

function flashCardControllers(flashCardService, nav) {
    function getRandomExcluding(max, exclude) {
        let qIndex = Math.floor(Math.random() * max);

        if (exclude.indexOf(qIndex) == -1) { //-1 mean never occure
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
        console.log("exclude" + exclude)
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
            size: flashCardService.getQuestionLength(markdown),
            que: question,
            anw: answer
        };
        return flashCard;
    }

    function getQuestion(req, res) {
        let { markDown } = {...req.params }
        console.log('getQuestion ********************** Params ' + JSON.stringify(req.params, 2, null));
        let flashCard = getFlashCard(markDown);
        debug("flashCard!" + JSON.stringify(flashCard, null, 2));
        res.render("showCard", {
            nav,
            flashCard,
            title: "Select Answer"
        });
    }

    function fileWrite(req, res) {
        console.log("filewriting =================================> " + JSON.stringify(req.params))
            // Data which will write in a file. 
            //let data = "Learning how to write in a file."
        let data = JSON.stringify(req.params.question) + ",";

        // Write data in 'Output.txt' . 
        fs.appendFileSync('./questionlist.txt', data, (err) => {

            // In case of a error throw err. 
            if (err) throw err;
        })
        res.redirect('/flash/homepage');

        res.end()
    }

    function fileReading() {
        try {
            var questionlist = fs.readFileSync('./questionlist.txt', (err, data) => {
                if (err) throw err;
                console.log("file reading " + data);

            })
        } catch (err) {
            fs.createWriteStream('./questionlist.txt');
        }

        return questionlist;
    }

    function submitFeedback(req, res) {
        let { markDown } = {...req.params }
        if (!markDown) {
            res.redirect('/flash/homepage');
        }
        console.log('submitFeedback ********************** Params ' + JSON.stringify(req.params, 2, null));
        const { previousQuestions } = req.query;
        const flashCard = getFlashCard(markDown, previousQuestions);
        const questionList = fileReading();
        // console.log("out side " + questionList.toString())
        // debug("flashCard!" + JSON.stringify(flashCard, null, 2));
        res.render("showCard", {
            nav,
            flashCard,
            title: "Select Answer",
            fileContent: questionList
        });
    }

    return { getQuestion, submitFeedback, fileWrite };
}
module.exports = flashCardControllers;