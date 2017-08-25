var friendsData = require("../data/friends.js");

// ROUTING

module.exports = function(app) {
  // API GET Requests

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests

  app.post("/api/friends", function(req, res) {
    var bestFit=0;
    var bestIndex;
    for(i=0;i<friendsData.length;i++){
      var fit = 0;
      for(j=0;j<friendsData[i].scores.length;j++){
        fit += (Math.abs(friendsData[i].scores[j] - req.body.scores[j]));
      }
      if(i==0){
        bestFit = fit;
        bestIndex = 0;
      }
      else if(fit < bestFit){
          bestFit = fit;
          bestIndex = i;
      }
    }
    friendsData.push(req.body);
    res.send({name: friendsData[bestIndex].name, photo: friendsData[bestIndex].photo});
  });

};
