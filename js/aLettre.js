function displayLetter(letter){
  
  //Display the corresponding letter in uppercase
  $("#result-majuscule").text(letter.toUpperCase());
  
  //Display the image of the corresponding letter in cursive
  $("#result-cursive").attr("src","../images/lettresCursives/"+ letter + "Cursif.png");
  $("#result-cursive").attr("style","display:initial");
  
  //Play the pronunciation of the corresponding letter 
  $("#audioPlayer").attr("src", "../sons/" + letter + "Son.mp3");
  
}