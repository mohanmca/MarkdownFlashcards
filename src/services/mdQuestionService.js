const  log = require('./debugger');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
var zip = require('lodash/fp/zip')

function parseQuestions(ast) {
  // const ast = md.parse(content);
  //log(ast);
  return ast[i + 2].content;
}


function parseQuestionIndices(ast) {
  // eslint-disable-next-line no-plusplus
  let result = []
  for (let i = 0; i < ast.length; i++) {
    if (isQuestion(ast[i])) {
      result.push(i + 1) ;
    }
  }
  return result;
}

function isQuestion(node) {
  return  node.markup && node.markup === '##' && node.type === "heading_open";
}

function parseQuestionIndex(ast) {
 // eslint-disable-next-line no-plusplus
  for (let i = 0; i < ast.length; i++) {
    if (isQuestion(ast[i])) {
      return i + 1;
    }
  }
  return -1;
}

function parseAnswerEndIndices(ast) {
  let result = []
  ast.forEach((t,i) => {if(t.type === "hr"){ result.push(i) }})
  return result;
}

function parseQuestionAt(i, ast) {
  let astIndexForQuestion = parseQuestionIndices(ast)[i]
  
  if(ast[astIndexForQuestion] && ast[astIndexForQuestion]['content']){
    return ast[astIndexForQuestion].content
  }
  return "Invalid Index for question"
}

function parseAnswerAt(i, ast) {
  if(ast[i + 2] && ast[i + 2]['content']){
    return ast[i + 2].content
  }
  return "Invalid Index for Answer"
}

function parseContentRange(startAt, range, ast) {
  return ast.slice(startAt+1, startAt+range-1);
}

function getAnswerContentAt(i, ast) {
  let questionIndices = parseQuestionIndices(ast);
  let answerEndIdices = parseAnswerEndIndices(ast);
  let answerContentIndices = zip(questionIndices,answerEndIdices).map(elements => [ elements[0]+1,  elements[1]-1 - elements[0]+1 ])
  let questionStart = answerContentIndices[i][0];
  let answerRange = answerContentIndices[i][1];
  return parseContentRange(questionStart, answerRange, ast);
}

module.exports = {
  parseQuestionIndex,
  parseQuestionAt,
  parseAnswerAt,
  parseQuestions,
  parseQuestionIndices,
  parseAnswerEndIndices,
  parseContentRange,
  getAnswerContentAt
};
