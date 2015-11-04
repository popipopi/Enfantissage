var score = 0;
var total = 0;
  
$(document).ready(function(){
  randomLetter();
});

$(document).on('pagecreate','#resultat', function() {
  var result = score/total * 100;
  $("#score").text("Score: " + result + " %");
});

function checkLetter(document, id) {
  total ++;
  if ($("#lettreMaj").text() == id) {
    score ++;
    generateResults(document, true);
  } else {
    generateResults(document, false);
  }
    
  if (total >= 10) {
    var users = JSON.parse(localStorage.getItem("users"));
    var user = users[localStorage.getItem("selected")];
    if (score > user[3]) {
      user[3] = score * 10;
      users[localStorage.getItem("selected")] = user;
      localStorage.setItem("users", JSON.stringify(users));
    }
    $.mobile.changePage( "resultat.html", { transition: "slideup", changeHash: false });
  }
  
  randomLetter();
};

function randomLetter() {
  var lettres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var rand_letter = lettres.charAt(Math.floor(Math.random() * lettres.length));
  $("#lettreMaj").text(rand_letter);
};

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

