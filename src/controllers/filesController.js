const debug = require("debug")("app:searchControllers");

const fs = require("fs");

function fileControllers(nav) {
    function filesdata() {
        var files = fs.readdirSync(process.cwd());
        console.log("Current directory " + process.cwd())
        console.log(files);
        return files;
    }

    function getFile(req, res) {
        debug("Files searching");
        //console.log("========================>" + req.query.files)
        const files = filesdata();
        res.render("homepage", {
            nav,
            // flashCard,
            title: "show Card",
            folderfiles: files
        });
    }

    function writeFile(req, res) {
        console.log("write files method ========================>" + req.query.files)

        var filename = req.query.files;

        fs.writeFile('filename.txt', filename,
            function(err) {
                if (err) throw err;
                console.log("Data is written to file successfully.")
            });
        res.end();
    }


    return { getFile, writeFile };
}
module.exports = fileControllers;