var score = 0;
var total = 0;
var lettres = "abcdefghijklmnopqrstuvwxyz";
var i = 0;
  
$(document).ready(function(){
  lettres = sort(lettres);
  randomLetter();
});

$(document).on('pagecreate','#resultat', function() {
  var result = score/total * 100;
  $("#score").text("Score: " + result + " %");
});

function checkLetter(document, id) {
  total ++;
  if ($("#lettreCurs").attr("val") == id) {
    score ++;
    generateResults(document, true);
  } else {
    generateResults(document, false);
  }
    
  if (total >= 10) {
    var users = JSON.parse(localStorage.getItem("users"));
    var user = users[localStorage.getItem("selected")];
    if (score > user[4]) {
      user[4] = score * 10;
      users[localStorage.getItem("selected")] = user;
      localStorage.setItem("users", JSON.stringify(users));
    }
    $.mobile.changePage( "resultat.html", { transition: "slideup", changeHash: false });
  }
  
  randomLetter();
};

// Sort randomly the letters of the string put as
// parameter.
function sort(lettres) {
  var sorted_word = "";
  
  while (lettres) {
    var rand_letter = lettres.charAt(Math.floor(Math.random() * lettres.length));
    sorted_word += rand_letter;
    lettres = lettres.replace(rand_letter, '');
  }
  
  return sorted_word;
}

function randomLetter() {
  $("#lettreCurs").attr("src", "../images/lettresCursives/" + lettres[i] + "Cursif.png");
  $("#lettreCurs").attr("val", lettres[i]);
  ++i;
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

function Score() {
  var result = score/total * 100;
  var h1 = document.createElement('h1');
  var text = document.createTextNode("Score: " + result + " %");
  h1.appendChild(text);
  document.getElementById("resultat").appendChild(h1);
};
