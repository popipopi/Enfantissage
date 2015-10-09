function affichageMot(document,id){
  var element = document.getElementById("text_results");
  element.parentNode.removeChild(element);
  
  var tr = document.createElement('tr');
  tr.id="text_results";
  
  var text = document.createTextNode(id);
  tr.appendChild(text);
  
  document.getElementById("result").appendChild(tr);
}