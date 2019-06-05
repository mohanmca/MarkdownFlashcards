const fs = require('fs')
    // var RegEx = require("regex");

var data = fs.readFileSync('C:/git/Flashcard-V3/MarkdownFlashcards/questionlist1.txt', 'utf-8');
var str = "steps to configure project";
var ip = '\"' + str + '\"';

var newValue = data.replace(new RegExp(ip, 'g'), '');
fs.writeFileSync('C:/git/Flashcard-V3/MarkdownFlashcards/questionlist1.txt', newValue, 'utf-8');