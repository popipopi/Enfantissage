$(document).ready(function() {
	var users = JSON.parse(localStorage.getItem("users"));
	var user = users[localStorage.getItem("selected")];
	$('#jeuSon').text(user[2] + " %");
	$('#jeuMin').text(user[3] + " %");
	$('#jeuCurs').text(user[4] + " %");

	// On change ici la couleur du résultat en fonction de la note.
	changeColor(user[2], '#jeuSon');
	changeColor(user[3], '#jeuMin');
	changeColor(user[4], '#jeuCurs');
});

function changeColor(score, id) {
	if (score > 60) {
		$(id).css('color', 'green');
	} else if (score < 40) {
		$(id).css('color', 'red');
	} else {
		$(id).css('color', 'black');
	}
}