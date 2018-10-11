//hide spotify keys
require("dotenv").config();

//variables
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");
var spotify = new Spotify(keys.spotify);
var appReturn = process.argv[2];
var fs = require("fs");



// commands

switch (appReturn) {
    case "concert-this":
        var bandTitle = process.argv[3];
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
    default: console.log("See 'README.md' for instructions");
};

function concertThis() {

    request("https://rest.bandsintown.com/artists/" + bandTitle + "/events?app_id=codingbootcamp", function (error, response, body) {

        var concertJSON = JSON.parse(body);
        for (i = 0; i < 5; i++) {
            var dTime = concertJSON[i].datetime;
            var month = dTime.substring(5, 7);
            var year = dTime.substring(0, 4);
            var day = dTime.substring(8, 10);
            var dateForm = month + "/" + day + "/" + year

            console.log("Date: " + dateForm);
            console.log("Name: " + concertJSON[i].venue.name);
            console.log("City: " + concertJSON[i].venue.city);
            console.log("State: " + concertJSON[i].venue.region);
            console.log("Country: " + concertJSON[i].venue.country);
            console.log("\n---------------------------------------------------\n");

        }

    });
}


function spotifyThisSong() {
    spotify.search({ type: 'track', query: songTitle }, function (err, data) {
        if (err) {
             console.log('Error: ' + err);
             return;
        }

        var artistsArray = data.tracks.items[0].album.artists;
        var artistsNames = [];

        for (var i = 0; i < artistsArray.length; i++) {
            artistsNames.push(artistsArray[i].name);
        }
        var artists = artistsNames.join(", ");
        console.log("\nArtist(s): " + artists);
        console.log("Song: " + data.tracks.items[0].name)
        console.log("Spotify Preview URL: " + data.tracks.items[0].preview_url)
        console.log("Album Name: " + data.tracks.items[0].album.name + "\n");
    });

}

function movieThis() {
    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle + "&y=&plot=short&tomatoes=true&r=json";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            var movie = JSON.parse(body);
            console.log("\nMovie Title: " + movie.Title);
            console.log("Release Year: " + movie.Year);
            console.log("IMDB: " + movie.imdbRating);
            console.log("Rotten Tomatoes: " + movie.Ratings[2].Value);
            console.log("Country: " + movie.Country);
            console.log("Language: " + movie.Language);
            console.log("Plot: " + movie.Plot);
            console.log("Actors: " + movie.Actors);
            
        
        }
    });
}


function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        } else {


            var randomArray = data.split(",");


            console.log(randomArray);

            // Take the first item and have it run the function that is written
            // Take the second item and run it throught the first function

        }
    })
};
