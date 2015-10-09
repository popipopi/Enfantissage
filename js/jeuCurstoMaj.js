var score = 0;
var total = 0;
  
function checkLetter(document, id) {
  total ++;
  if ($("#lettreCurs").attr("val") == id) {
    score ++;
    generateResults(document, true);
  } else {
    generateResults(document, false);
  }
  var element = document.getElementById("lettreCurs");
  element.parentNode.removeChild(element);
  randomLetter(document);
  
  if (total >= 10) {
    $.mobile.changePage( "resultat.html", { transition: "slideup", changeHash: false });
  }
};

function randomLetter(document) {
  var lettres = "abcdefghijklmnopqrstuvwxyz";
  var rand_letter = lettres.charAt(Math.floor(Math.random() * lettres.length));
  var img = document.createElement('img');
  img.id = "lettreCurs";
  var path = "../images/lettresCursives/" + rand_letter + "Cursif.png";
  img.setAttribute("src", path);
  img.setAttribute("val", rand_letter);
  document.getElementById("lettreCursDiv").appendChild(img);
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
