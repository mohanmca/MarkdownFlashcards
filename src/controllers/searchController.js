const debug = require("debug")("app:searchControllers");

const searchResults = [
  {
    _id: "Mohan",
    text: "Mohan",
    result: "Mohan"
  },
  {
    _id: "Mohan",
    text: "Mohan2",
    result: "Mohan2"
  }
];

function searchControllers(searchervice, nav) {
  function getIndex(req, res) {
    debug("Mongodb Connection would be established!");
    res.render("searchListView", {
      nav,
      searchResults,
      title: "Searchengine"
    });
  }


  return { getIndex };
}
module.exports = searchControllers;
