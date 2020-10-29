$(document).ready(function () {
  //user selects a characer from a list and information is displayed to user

  //FUNCTIONS
  var getRandomChar = function () {
    var requestURL = "https://www.breakingbadapi.com/api/character/random";
    //ajax call to retrive random character
    $("#display-char").empty();

    $.ajax({
      url: requestURL,
      method: "GET",
    }).then(function (data) {
      //dynamically create elements based on data
      var char = $("#display-char");
      var charName = $("<h1>");
      var charOccupation = $("<h2>");
      var charImage = $("<img>");
      var charStatus = $("<h2>");
      console.log(data);

      charName.text("Name: " + data[0].name);
      charOccupation.text("Occupation: " + data[0].occupation[0]);
      charStatus.text("Status: " + data[0].status);

      charImage.addClass("char-image");
      charImage.attr("src", data[0].img);

      char.append(charName);
      char.append(charOccupation);
      char.append(charStatus);
      char.append(charImage);
    });
  };

  var allChars = function () {
    //fetch all chars and dynamically create cards for each char in the array
    var requestURL = "https://www.breakingbadapi.com/api/characters";

    $.ajax({
      url: requestURL,
      method: "GET",
    }).then(function (data) {
      //dynamically create card elements for each member in the array
      var cardDiv = $("#cards");
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        //in for loop just test 2 cards for data pulled in
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

  var selectChar = function (event) {
    //user selects a character from a generated list of characters and the information is displayed in a card, they can then click on card and will be redirected to a page with all the char information
    alert("Time to Cook!!");
  };

  //EVENT HANDLERS

  //retrieve random character
  $("#random-char").on("click", getRandomChar);

  //retrieve all characters
  $("#all-chars").on("click", allChars);

  //retrieve one character
  $("#select-char").on("click", selectChar);
});
