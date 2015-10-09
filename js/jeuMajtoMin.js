var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var score = 0;
var total = 0;
  
function checkLetter(document, id) {
  total ++;
  if ($("#lettreMaj").text() == id) {
    score ++;
    generateResults(document, true);
  } else {
    generateResults(document, false);
  }
  var element = document.getElementById("lettreMaj");
  element.parentNode.removeChild(element);
  randomLetter(document);
  
  if (total >= 10) {
    $("#transition").click();
  }
};

function randomLetter(document) {
  var rand_letter = letters.charAt(Math.floor(Math.random() * letters.length));
  var h1 = document.createElement('h1');
  h1.id = "lettreMaj";
  var text = document.createTextNode(rand_letter);
  h1.appendChild(text);
  document.getElementById("lettreMajDiv").appendChild(h1);
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