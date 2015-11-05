// When the document is ready, we get the result from the
// current user and then we display them on the page.
$(document).ready(function() {
	var users = JSON.parse(localStorage.getItem("users"));
	var user = users[localStorage.getItem("selected")];
	$('#jeuSon').text(user[2] + " %");
	$('#jeuMin').text(user[3] + " %");
	$('#jeuCurs').text(user[4] + " %");

	changeColor(user[2], '#jeuSon');
	changeColor(user[3], '#jeuMin');
	changeColor(user[4], '#jeuCurs');
});

// Change the color of the score depending on its value.
function changeColor(score, id) {
	if (score > 60) {
		$(id).css('color', 'green');
	} else if (score < 40) {
		$(id).css('color', 'red');
	} else {
		$(id).css('color', 'black');
	}
}