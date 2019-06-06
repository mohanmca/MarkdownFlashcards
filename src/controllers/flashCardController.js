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
        console.log("Question Writing into a file =======================> " + JSON.stringify(req.params))
            // Data which will write in a file. 
        let data = JSON.stringify(req.params.question) + ",";
        console.log(req.params.filename);
        // Write data in 'questionlist.txt' . 
        fs.appendFileSync('./questionlist.txt', data, (err) => {
            // In case of a error throw err. 
            if (err) throw err;
        })
        res.redirect('/flash/' + req.params.filename + '/submitFeedback');
        res.end()
    }

    function fileStringRemover(req, res) {
        var data = fs.readFileSync('./questionlist.txt', 'utf-8');
        console.log("Question removed from file ======================>" + req.params.question)
        var removedQuestion = JSON.stringify(req.params.question);
        var updatedFile = data.replace(new RegExp(removedQuestion, 'g'), '');
        fs.writeFileSync('./questionlist.txt', updatedFile, 'utf-8');
        res.redirect('/flash/' + req.params.filename + '/submitFeedback');
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

    function filesdata() {
        var files = fs.readdirSync(process.cwd());
        console.log("Current directory " + process.cwd())
        console.log(files);
        return files;
    }

    function submitFeedback(req, res) {
        let { markDown } = {...req.params }
        if (!markDown) {
            res.redirect('/flash/homepage');
        }
        console.log('submitFeedback ********************** Params ' + JSON.stringify(req.params, 2, null));
        var fileName = req.params.markDown;
        const { previousQuestions } = req.query;
        const flashCard = getFlashCard(markDown, previousQuestions);
        const questionList = fileReading();
        res.render("showCard", {
            nav,
            flashCard,
            title: "Select Answer",
            fileContent: questionList,
            fileName,
            folderfiles: filesdata()
        });
    }

    return { getQuestion, submitFeedback, fileWrite, fileStringRemover };
}
module.exports = flashCardControllers;