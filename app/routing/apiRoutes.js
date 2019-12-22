var path = require("path");
var friends = require("../data/friends");

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });
  app.post("/api/friends", function (req, res) {
    var userInput = req.body;
    var userResponse = userInput.scores

    var matchName = "";
    var matchImage = "";
    var totalDifference = 100;

    console.log(userInput);

    for (var i = 0; i < friends.length; i++) {
      var diff = 0;
      for (var j = 0; j < userResponse.length; j++) {
        diff += Math.abs(friends[i].scores[j] - userResponse);
      }
      if (diff < totalDifference) {
        totalDifference = diff;
        matchName = friends[i].name;
        matchImage = friends[i].photo;
      }
    }
    var match = {
      name: matchName,
      photo: matchImage
    }
    console.log(match);
    res.json(match);
    friends.push(userInput);
  });
}