const log = require("./debugger");
const fs = require("fs");
const qs = require("./mdQuestionService");
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();

console.log("Current directory " + process.cwd());

//const mdFile = process.cwd() + "/Java9_to_11FlashCards.md";
var zip = require("lodash/fp/zip");

function getAst(markdown) {
    const mdFile = process.cwd() + `/${markdown}.md`;
    const mdContent = fs.readFileSync(mdFile).toString();
    return md.parse(mdContent, {});
}

let rendererOption2 = {
    html: true,
    xhtmlOut: false,
    breaks: false,
    langPrefix: "language-",
    linkify: false,
    typographer: false,
    quotes: "“”‘’",
    highlight: function( /*str, lang*/ ) {
        return "";
    }
};

let rendererOption = {
    html: true,
    xhtmlOut: true,
    breaks: false,
    langPrefix: "language-",
    linkify: false,
    typographer: false,
    quotes: "“”‘’",
    highlight: function( /*str, lang*/ ) {
        return "";
    }
};

function removePre(content) {
    content = content.replace("<pre>", "");
    content = content.replace("</pre>", "");
    return content;
}

//let answer = md.renderer.render(qs.getAnswerContentAt(1, ast), rendererOption);
//console.log("PreRemoved  "  + removePre(answer));

function flashCardService() {
    function getQuestionLength(markdown) {
        return qs.parseQuestionIndices(getAst(markdown)).length;
    }

    function getQuestionAt(markdown, i) {
        let question = qs.parseQuestionAt(i, getAst(markdown));
        console.log(JSON.stringify(question, null, 2));
        return question;
    }

    function getAnswerAt(markdown, i) {
        let answerContent = qs.getAnswerContentAt(i, getAst(markdown));

        let answer = md.renderer.render(answerContent, rendererOption);
        // answer = removePre(answer)

        // console.log(answer);
        return answer;
    }

    return { getQuestionAt, getAnswerAt, getQuestionLength };
}

if (typeof require != undefined && require.main == module) {
    console.log("Current working directory " + process.cwd());
    let testEntity = flashCardService();
    console.log("Number of questions! : " + testEntity.getQuestionLength('Body_Language'));
    Array.from(Array(testEntity.getQuestionLength('Body_Language')).keys()).map(i => {
        console.log(i + "\t\t" + testEntity.getQuestionAt('Body_Language', i) + "\n");
        console.log(i + "Answer :=> " + testEntity.getAnswerAt('Body_Language', i) + "\n");
    });
}

module.exports = flashCardService();

//log(zip([1,2,3],[3,2,1]))

//log(ast)
//log(mdContent);
//log(qs.parseQuestions(mdContent));
//log(qs.parseQuestionAt(1));
//log();
//let questionIndices = qs.parseQuestionIndices(ast);
//log(questionIndices);
//let question = qs.parseQuestionAt(questions[questions.length-1], ast);
//log(question);
//let answerEndIdices = qs.parseAnswerEndIndices(ast);
//log(answerEndIdices)

//log(zip(questionIndices,answerEndIdices))

// let answerContentIndices = zip(questionIndices,answerEndIdices).map(elements => [ elements[0]+1,  elements[1]-1 - elements[0]+1 ])
// log(answerContentIndices)

// let answer = qs.parseContentRange(answerContentIndices[5][0], answerContentIndices[5][1], ast)
// log(md.renderer.render(answer, rendererOption))

// log("------------")
// answer = qs.parseContentRange(answerContentIndices[1][0], answerContentIndices[1][1], ast)
// log(md.renderer.render(qs.getAnswerContentAt(1, ast), rendererOption))

// log("------------")
// answer = qs.parseContentRange(answerContentIndices[0][0], answerContentIndices[0][1], ast)
// log(md.renderer.render(qs.getAnswerContentAt(5, ast), rendererOption))

// log("------------")
// log(qs.parseQuestionAt(0, ast))
// answer = qs.parseContentRange(answerContentIndices[0][0], answerContentIndices[0][1], ast)
// log(md.renderer.render(qs.getAnswerContentAt(0, ast), rendererOption))

//answer.forEach(ast => log(ast.content))

/*
 * Read file content
 * Print number of questions
 * print first question and it's answer
 * print last question and it's answer
 * print all questions
 * print all answers
 */