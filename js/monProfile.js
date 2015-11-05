$(document).ready(function() {
	var users = JSON.parse(localStorage.getItem("users"));
	if (users.length == 0) {
		// If there is no profil:
		$('#progression').css('display', 'none');
		$('#deconnection').css('display', 'none');
		$('#changerProfile').css('display', 'none');
	} else if (localStorage.getItem("selected") == -1) {
		// If no profil is selected:
		$('#progression').css('display', 'none');
		$('#deconnection').css('display', 'none');
		$('#changerProfile').text("Choisir profile");
	} else {
		// If a profil is selected:
		$('#nouveauProfile').css('display', 'none');
		$('#changerProfile').text("Changer profile");
	}

	prepareChoixProfile(users);
});

// We prepare the div that will contain the existing profils.
function prepareChoixProfile(users) {
	for (var i = 0; i < users.length; ++i) {
		var div = $('<div>');
		div.attr('class', 'image');
		div.attr('id', i);
		div.attr('style', 'background-image: url(../' + users[i][1] + ')');
		div.attr('onclick', "onChoixProfile(this.id)");
		div.appendTo('#choixProfile');
		var h2 = $('<h2>');
		h2.appendTo(div);
		var span = $('<span>');
		span.text(users[i][0]);
		span.appendTo(h2);
	}
}

// Selection the profil on which the user has clicked and then
// redirect him to the index.
function onChoixProfile(id) {
	localStorage.setItem("selected", id);
	location = "../index.html";
}

// Display the div containing the creation form and hide 
// other div.
function onNouveauProfile() {
	$('#menuProfile').css('display', 'none');
	$('#creationProfile').css('display', 'block');
}

// Create a new profil and redirect to the index.
function onCreerProfile() {
	var users = JSON.parse(localStorage.getItem("users"));
	// The new user has 5 parameters.
	// The first one is its name, the second one the path of its picture,
	// and the last three are the best results in three games.
	var new_user = [$('#name').val(), "images/photos/defaultProfile.jpg", "00", "00", "00"	];
	users.push(new_user);
	localStorage.setItem("users", JSON.stringify(users));
	localStorage.setItem("selected", users.length - 1);
	location = "../index.html";
}

// We deselect the current user. Then, we reload the page.
function onDeconnection() {
	localStorage.setItem("selected", - 1);
	location.reload();
}

// When the player click on change profil, 
// we display the concern div and hide the others.
function onChangerProfile() {
	$('#menuProfile').css('display', 'none');
	$('#choixProfile').css('display', 'block');
}

// Due to a lack of time, this functionnality is not
// operationnal.
function onPrendrePhoto() {
	navigator.camera.getPicture(function(imageURI) {

	    // imageURI is the URL of the image that we can use for
	    // an <img> element or backgroundImage.

	  }, function(err) {

	    // Ruh-roh, something bad happened

	  }, cameraOptions);
}