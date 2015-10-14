function displayLetter(letter){
  
  $("#result-majuscule").text(letter.toUpperCase());
  $("#result-cursive").attr("src","../images/lettresCursives/"+ letter + "Cursif.png");
  $("#audioPlayer").attr("src", "../sons/" + letter + "Son.mp3");
  
}