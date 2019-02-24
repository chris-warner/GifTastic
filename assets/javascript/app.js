var apiKey = "&api_key=JqrEkMGSAzAKM3HxZtFci1lQzrkd5Db3";
var buttonCategories = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "tuttle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capbara", "teacup pig", "serval", "salamander", "frog"];
var dynamicButtons = [];
var searchTerm;
var custom_searchTerm;
var custom_buttonCategories = [];

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
            populateImages(custom_searchTerm);
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
        }).then(function(response) {
            console.log(response);
            for (var g = 0; g < response.data.length; g++) {
                console.log(response.data[g]);
                var width = getRandomSize(200, 400);
                var height = getRandomSize(200, 400);
                gifurl = response.data[g].images.fixed_height.url;
                var gif = $("<img>").attr("src", gifurl);
                $("#gif-div").hide(); //Prepare for animation!
                $("#gif-div").append(gif); // Load Gifs
                $("#gif-div").fadeIn("fast", function() {});
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