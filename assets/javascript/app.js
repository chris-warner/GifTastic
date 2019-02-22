var apiKey = "&api_key=JqrEkMGSAzAKM3HxZtFci1lQzrkd5Db3";
var buttonCategories = ["cats", "dogs", "funny", "trending"];
var dynamicButtons = [];
var searchTerm;

$(document).ready(function() {

    //1.Populate buttons!
    populateButtons(buttonCategories);

    function populateButtons(inputarray) {
        for (var i = 0; i < inputarray.length; i++) {
            $("#button-div").append("<button id =" + "'" + "btn" + i + "'" + ">" + buttonCategories[i] + "</button>");
            dynamicButtons.push("btn" + i);
        }
        //2.Log the button names fot testing.
        for (var b = 0; b < dynamicButtons.length; b++) {
            console.log(dynamicButtons[b]);
        }
    }
    $('button').click(function() {
        searchTerm = $(this).text();
        populateImages(searchTerm);
    });

    function populateImages(queryString) {
        //Take the input string and search giffy for related gifs.
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryString + apiKey;
        var gifurl;

        alert(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            for (var g = 0; g < response.data.length; g++) {
                console.log(response.data[g]);
                gifurl = response.data[g].images.fixed_height.url;
                var gif = $("<img>").attr("src", gifurl);
                $("#gif-div").append(gif);
            }
        });
        $("#gif-div").append(gif);
    }
});