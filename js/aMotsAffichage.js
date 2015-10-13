function affichageMot(id,category){
  $("#text_results").text(id);
  $("#audioPlayer").attr("src", "../sons/sons" + category + "/" + id + ".mp3");
}