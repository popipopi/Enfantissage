var score = 0;
// The current score of the player.
var total = 0;
// The number of letters the player have seen.

// When the document is ready, we generate a random sound.
$(document).ready(function(){
  randomSon();
});

// When we create the result page, we define in it
// the score of the player.
$(document).on('pagecreate','#resultat', function() {
  var result = score/total * 100;
  $("#score").text("Score: " + result + " %");
});

// This method check that the button pressed by the
// player correspond to the sound played.
// If he's right, we display a green tick and increase
// score. Otherwise, we just display a red tick.
// Then, if we haven't shown 10 letters, we generate
// a random new letter. If we have, we put the result
// into the current user if there is one and the score is 
// greater than the previous one. Then, we redirect him
// to the result page.
function checkLetter(document, id) {
  total ++;
  if ($("#audioPlayer").attr("val") == id) {
    score ++;
    generateResults(document, true);
  } else {
    generateResults(document, false);
  }
  
  if (total >= 10) {
    var users = JSON.parse(localStorage.getItem("users"));
    var user = users[localStorage.getItem("selected")];
    if (score > user[2]) {
      user[2] = score * 10;
      users[localStorage.getItem("selected")] = user;
      localStorage.setItem("users", JSON.stringify(users));
    }
    $.mobile.changePage( "resultat.html", { transition: "slideup", changeHash: false });
  } else {
    randomSon();
  }
};

// Create a random sound.
// Select a random letter from the alphabet and then set the
// source of the sound based on this letter.
function randomSon() {
  var lettres = "abcdefghijklmnopqrstuvwxyz";
  var rand_letter = lettres.charAt(Math.floor(Math.random() * lettres.length));
  $("#audioPlayer").attr("src", "../sons/sonsLettres/" + rand_letter + "Son.mp3");
  $("#audioPlayer").attr("val", rand_letter);
};

// This methos generate the results after the user click on one
// of the letter button.
// The results are stock in a table, so each time we have a 
// result, we just create a new td, choose the color of the font
// based on the result, then append it to the table.
function generateResults(document, result) {
  var td = document.createElement('td');
  var font = document.createElement('font');
  var text;
  if (result) {
    text = document.createTextNode("✔");
    font.setAttribute("color", "green");
  } else {
    text = document.createTextNode("✘");
    font.setAttribute("color", "red");
  }
  font.appendChild(text);
  document.getElementById("results").appendChild(td);
  td.appendChild(font);
};


// We have to cheat on this method as the html5 method play().
// Basically, we get the src of the image and then we reset it.
// Then, it forces the autoplay of the sound.
function jouerSon() {
  var src = $('#audioPlayer').attr('src');
  $('#audioPlayer').attr('src', src);
}