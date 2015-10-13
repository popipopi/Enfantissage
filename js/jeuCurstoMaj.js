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
  if ($("#lettreCurs").attr("val") == id) {
    score ++;
    generateResults(document, true);
  } else {
    generateResults(document, false);
  }
    
  if (total >= 10) {
    $.mobile.changePage( "resultat.html", { transition: "slideup", changeHash: false });
  }
  
  randomLetter();
};

function randomLetter() {
  var lettres = "abcdefghijklmnopqrstuvwxyz";
  var rand_letter = lettres.charAt(Math.floor(Math.random() * lettres.length));
  $("#lettreCurs").attr("src", "../images/lettresCursives/" + rand_letter + "Cursif.png");
  $("#lettreCurs").attr("val", rand_letter);
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
