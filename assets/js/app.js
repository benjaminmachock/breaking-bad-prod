$(document).ready(function () {
  //for randomChar section, create event listener for button, create a function that will handle our ajax call(similar to fetch api),

  //FUNCTIONS

  //function will handle user retrieving a randomCharacter from API and displaying in a card with information
  var getRandomChar = function () {
    $("#display-char").empty();

    var requestURL = "https://www.breakingbadapi.com/api/character/random";

    //AJAX call
    $.ajax({
      url: requestURL,
      method: "GET",
    }).then(function (data) {
      //dynamically create HTML

      //selected div where dynamic HTML will be placed
      //VARIABLE DECLARATIONS
      var char = $("#display-char");
      var charName = $("<h1>");
      var charOccupation = $("<h3>");
      var charImage = $("<img>");
      var charStatus = $("<h3>");

      //assign text to elements
      charName.text("Name: " + data[0].name);
      charOccupation.text("Occupation: " + data[0].occupation[0]);
      charStatus.text("Status: " + data[0].status);

      charImage.addClass("char-image");
      charImage.attr("src", data[0].img);

      //append elements
      char.append(charName);
      char.append(charOccupation);
      char.append(charStatus);
      char.append(charImage);
    });
  };

  //function will handle user retrieving allCharacters from API and display in cards with some information
  var getAllChars = function () {
    var requestURL = "https://www.breakingbadapi.com/api/characters";

    //API call to endpoint for all characters
    $.ajax({
      url: requestURL,
      method: "GET",
    }).then(function (data) {
      //dynamically create HTML via bootstrap cards
      var cardDiv = $("#cards");

      //for loop
      for (var i = 0; i < data.length; i++) {
        //VARIABLE DECLARATIONS
        var outerDiv = $("<div>", { class: "col-md-4 test" });
        var newDiv = $("<div>", { class: "card mb-3 shadow-sm" });
        var cardsDiv = $("<div>", { class: "card border-success mb-3" });
        var cardImage = $("<img>", { class: "card-img-top" });
        var cardBody = $("<div>", { class: "card-body" });
        var cardTitle = $("<h5>", { class: "card-title" });
        var cardText = $("<p>", { class: "card-text" });
        var cardBtn = $("<button>", { class: "btn btn-primary" });

        cardImage.attr("src", data[i].img);

        cardTitle.text(data[i].name);
        cardText.text(data[i].occupation[0]);
        cardBtn.text("View Character");

        cardDiv.append(outerDiv);
        outerDiv.append(newDiv);
        newDiv.append(cardsDiv);
        cardsDiv.append(cardImage);
        cardsDiv.append(cardBody);
        cardBody.append(cardTitle);
        cardBody.append(cardText);
        cardBody.append(cardBtn);
      }
    });
  };

  //EVENT LISTENERS
  $("#random-char").on("click", getRandomChar);

  $("#all-chars").on("click", getAllChars);
});
