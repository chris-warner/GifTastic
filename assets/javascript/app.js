var apiKey = 'JqrEkMGSAzAKM3HxZtFci1lQzrkd5Db3';
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
var buttonCategories = ["cats", "dogs", "funny", "trending"];
var dynamicButtons = [];
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(response) {
//     console.log(response);
// });

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
        alert($(this).text());
    });
});