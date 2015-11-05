// Display the word the user clicked on and play 
// corresponding sound.
function affichageMot(id,category){
  $("#text_results").text(id);
  $("#audioPlayer").attr("src", "../sons/sons" + category + "/" + id + ".mp3");
}