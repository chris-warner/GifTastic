var apiKey = "&api_key=JqrEkMGSAzAKM3HxZtFci1lQzrkd5Db3";
var buttonCategories = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "tuttle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capbara", "teacup pig", "serval", "salamander", "frog"];
var dynamicButtons = [];
var searchTerm;
var custom_searchTerm;
var custom_buttonCategories = [];
var gTable = document.getElementById("gif-table");

$(document).ready(function() {

    //1.Populate buttons!
    populateButtons(buttonCategories);

    function populateButtons(inputarray) {
        //Generate buttons for each item in my array of search terms.
        for (var i = 0; i < inputarray.length; i++) {
            $("#button-div").append("<button id =" + "'" + "btn" + i + "'" + ">" + buttonCategories[i] + "</button>");
            dynamicButtons.push("btn" + i);
        }
        //2.Log the button names fot testing.
        for (var b = 0; b < dynamicButtons.length; b++) {
            console.log(dynamicButtons[b]);
        }
    }
    //if a button is clicked we want to pull up related gifs.
    $('#button-div').on('click', 'button', function() {
        cleargifs();
        if ($(this).text() != "Submit") {
            searchTerm = $(this).text();
            populateImages(searchTerm);
        } else if ($(this).text() != "Submit") {
            cleargifs();
        }
        if ($(this).text() === "Submit") {
            custom_searchTerm = $("#animal-text").val().trim();
            var test = $("<button>" + custom_searchTerm + "</button>");
            $("#button-div").append(test);
            dynamicButtons.push(test);
        }
    });
    //If a gif is clicked, we want to freeze it.
    $('#gif-div').on('click', 'img', function() {
        //Retrieve  the clicked gif's give source url.
        var gifSrc = $(this).attr("src");
        //check to see if the gif is playing, store play state using a custom class.
        //Stop the gif.
        if ($(this).hasClass('playing')) {
            $(this).attr('src', gifSrc.replace(/\.gif/i, "_s.gif"));
            $(this).removeClass('playing');
        }
        //Play the gif.
        else {
            $(this).addClass('playing');
            $(this).addClass('child');
            $(this).attr('src', gifSrc.replace(/\_s.gif/i, ".gif"));
        }
    });


    function populateImages(queryString) {
        //Take the input string and search giffy for related gifs.
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryString + apiKey;
        var gifurl;
        //alert(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(gif_responce) {
            console.log(gif_responce);
            for (var g = 0; g < gif_responce.data.length; g++) {
                console.log(gif_responce.data[g]);
                gifurl = gif_responce.data[g].images.fixed_height.url;
                //var rating = respone.data[g].rating;
                var p = $("<p>").text("Rating: " + gif_responce.data[g].rating);
                //  p.addClass("animal-info");
                var gif = $("<img>").attr("src", gifurl);
                //  $(gif).attr('figcaption').text("Rating: " + gif_responce.data[g].rating);
                var pghtml = ("<figure>" + "<img src=" + "'" + gifurl + "'" + ">" + "</img>" + "<figcaption> " + "Rating: " + gif_responce.data[g].rating + "</figcaption>" + "</figure>");
                //                alert(p);
                $(gif).addClass('playing'); //Gif is initially playing. Store that as a class.
                // Gifcontainer.append(p);
                //  Gifcontainer.append(gif);
                // $("#gif-div").hide(); //Prepare for animation!
                //   $(gif).hide();
                //  $("#gif-div").append(p); //append rating
                $("#gif-div").append(pghtml);
                // $("#gif-div").append(Gifcontainer);
                //  $(gif).fadeIn("slow", function() {}); //fade in the div.
            }
        });
    }

    function cleargifs() {
        $("#gif-div").empty();
    }


    function getRandomSize(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }


});