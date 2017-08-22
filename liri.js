var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var inquirer = require('inquirer');

var keys = require("./keys.js")

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var spotify = new Spotify({
  id: keys.spotifyKeys.id,
  secret: keys.spotifyKeys.secret
});

inquirer.prompt([{
    type: "list",
    name: "doWhat",
    message: "What would you like to do?",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
  }]).then(function(user) {

      if (user.doWhat === "my-tweets") {

        var params = {
          q: 'pow_red_rabbit',
          count: 20
        };

        client.get('search/tweets', params, gotData);

        function gotData(err, data, response) {
          var tweets = data.statuses;
          for (var i = 0; i < tweets.length; i++) {
            console.log("Ian's tweets: " + tweets[i].text + "\nCreated on: " + tweets[i].created_at);
          }
        };
      }
      if (user.doWhat === "spotify-this-song") {
        inquirer.prompt([
          {
          type: "input",
          name: "songName",
          message: "What song would you like me to check out?"
        }]).then(function(user) {

          var songName = user.songName
          if ( songName === undefined){
            songName = "Whats my age again";
          }


          spotify
            .request("https://api.spotify.com/v1/search?query="+ songName +"&type=track&market=US&offset=0&limit=20")
              .then(function(data) {
                var songs= data.tracks.items;
                console.log(songs)
                for (var i = 0; i < songs.length; i++){
                  console.log("Artist(s): "+ + "\nNames: " +songs[i].name);
                }

              })
              .catch(function(err) {
                console.error('Error occurred: ' + err);
  });

          })
      };

    })
