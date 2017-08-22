var Twitter= require('twitter');
var spotify = require('spotify');
var request = require('request');
var inquirer = require('inquirer');

var keys= require("./keys.js")

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var client2 = new spotify({
  id: keys.spotifyKeys.id,
  secret: keys.spotifyKeys.secret
});

inquirer.prompt([
  {
    type: "list",
    name: "doWhat",
    message: "What would you like to do?",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
  }
]).then(function(user) {

  if (user.doWhat === "my-tweets") {

    var params = {
      q: 'pow_red_rabbit',
      count: 20
    };

    client.get('search/tweets', params, gotData);
    function gotData(err, data, response) {
      var tweets = data.statuses;
      for (var i = 0; i < tweets.length; i++){
        console.log("Ian's tweets: "+ tweets[i].text + "\nCreated on: " + tweets[i].created_at);
        }
      };
    }
  if (user.doWhat === "spotify-this-song"){
    inquirer.prompt([
      {
        type: "input",
        name: "songName",
        message: "What song would you like me to check out?"
      }
    ]).then(function(user) {

      client2.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

      console.log(data);
      });
    })


    }

});
