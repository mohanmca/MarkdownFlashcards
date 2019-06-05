function showAnswer() {
    var ele = document.getElementById("answer");
    ele.classList.remove("hidden");
    ele.style.display = "block";
}

// function submitFeedback() {
//     document.getElementById("nextQuestion").submit();
// }

function myFunction() {
    var x = document.getElementById("opt").selectedIndex;
    var options = document.getElementsByTagName("option")[x].value;
    var fileName = options.slice(0, -3);
    // alert(url)
    location.href = "http://localhost:4000/flash/" + fileName + "/submitFeedback";
}
var listOfFiles = "<%=folderfiles%>"
console.log("files " + listOfFiles)
var splitArray = listOfFiles.split(",");
console.log("splitdata " + splitArray)
var filterMdFile = splitArray.filter(function(data) {
    if (data.endsWith(".md")) {
        return $('#opt').append('<option value = ' + data + '>' + data + '</option>')
    } else {
        return "";
    }
});
console.log("filterdata " + filterMdFile);