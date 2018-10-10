//hide spotify keys
require("dotenv").config();

//Variables
var keys = require("./keys.js");
var Spotify= require("node-spotify-api");
var request = require("request");
var spotify = new Spotify(keys.spotify);
var liriReturn = process.argv[2];
var fs = require("fs");



// commands

switch (liriReturn) {
    case "concert-this":
    var songTitle = process.argv[3];
        concertThis();
        break;

    case "spotify-this-song":
        var songTitle = process.argv[3];
        spotifyThisSong();
        break;

    case "movie-this":
    var movieTitle = process.argv[3];
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
    
    default: console.log("\n" + "type any command after 'node liri.js': " + "\n" +
    "concert-this" + "\n" + "spotifyThisSong 'any song title' " + "\n" +
    "movie-this 'any movie title' " + "\n" +
    "Use quotes for mutliword titles");
    };

    function concertThis() {

        // use request to  Display name of venue, location, and MM/DD/YYYY

        request("https://rest.bandsintown.com/artists/" + songTitle + "/events?app_id=codingbootcamp", function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
          });
    }


    function spotifyThisSong() {

       
         
        spotify.search({ type: 'track', query: songTitle}, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
         
          var artistsArray = data.tracks.items[0].album.artists;

          // Array to hold artist names, when more than one artist exists for a song.
          var artistsNames = [];
  
          // Pushes artists for track to array.
          for (var i = 0; i < artistsArray.length; i++) {
              artistsNames.push(artistsArray[i].name);
          }
  
          // Converts artists array to string, and makes it pretty.
          var artists = artistsNames.join(", ");
  
          // Prints the artist(s), track name, preview url, and album name.
          console.log("\nArtist(s): " + artists);
          console.log("Song: " + data.tracks.items[0].name)
          console.log("Spotify Preview URL: " + data.tracks.items[0].preview_url)
          console.log("Album Name: " + data.tracks.items[0].album.name + "\n" );
      });
      
  }

  function movieThis() {
      var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle + "&y=&plot=short&tomatoes=true&r=json";

  request(queryUrl, function(error, response, body) {
    // If the request is successful...
    if (!error && response.statusCode === 200) {
      
      // Parses the body of the site and recovers movie info.
      var movie = JSON.parse(body);

      // Prints out movie info.
      console.log("\nMovie Title: " + movie.Title);
      console.log("Release Year: " + movie.Year);
      console.log("IMDB Rating: " + movie.imdbRating);
      console.log("Country Produced In: " + movie.Country);
      console.log("Language: " + movie.Language);
      console.log("Plot: " + movie.Plot);
      console.log("Actors: " + movie.Actors);

      // Had to set to array value, as there seems to be a bug in API response,
      // that always returns N/A for movie.tomatoRating.
      console.log("Rotten Tomatoes Rating: " + movie.Ratings[2].Value);
      console.log("Rotten Tomatoes URL: " + movie.tomatoURL + "\n");
    }
  });
}


function doWhatItSays() {

	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			logOutput.error(err);
		} else {

			// Creates array with data.
			var randomArray = data.split(",");

			// Sets action to first item in array.
			var one = randomArray[0];

			// Sets optional third argument to second item in array.
			var two = randomArray[1];

			console.log(randomArray)
		}
	})};
