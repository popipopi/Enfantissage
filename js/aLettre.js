function displayLetter(letter){
  $("#result-majuscule").
  $("#result-cursive").text(letter.toUpperCase());
  $("#audioPlayer").attr("src", "../sons/" + letter + "Son.mp3");
}