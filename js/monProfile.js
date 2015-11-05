$(document).ready(function() {
	var users = JSON.parse(localStorage.getItem("users"));
	if (users.length == 0) {
		// Si aucun profile n'est créé pour le moment
		$('#progression').css('display', 'none');
		$('#deconnection').css('display', 'none');
		$('#changerProfile').css('display', 'none');
	} else if (localStorage.getItem("selected") == -1) {
		// Si aucun profile n'est sélectionner.
		$('#progression').css('display', 'none');
		$('#deconnection').css('display', 'none');
		$('#changerProfile').text("Choisir profile");
	} else {
		// Si un profil est déjà sélectionné.
		$('#nouveauProfile').css('display', 'none');
		$('#changerProfile').text("Changer profile");
	}

	prepareChoixProfile(users);
});

// On prépare la div qui va contenir l'ensemble des profils.
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

// Sélectionne le profil sur lequel l'utilisateur à quitter
// et fais une redirection sur la page d'accueil.
function onChoixProfile(id) {
	localStorage.setItem("selected", id);
	location = "../index.html";
}

// Affiche la div contenant le formulaire de création et
// cache la div contenant le menu du profil.
function onNouveauProfile() {
	$('#menuProfile').css('display', 'none');
	$('#creationProfile').css('display', 'block');
}

// 
function onCreerProfile() {
	var users = JSON.parse(localStorage.getItem("users"));
	// Le nouvel utilisateur possède en clé son nom et les 
	// trois paramètres suivants sont ses meilleurs résultats.
	var new_user = [$('#name').val(), "images/photos/defaultProfile.jpg", "00", "00", "00"	];
	users.push(new_user);
	localStorage.setItem("users", JSON.stringify(users));
	localStorage.setItem("selected", users.length - 1);
	location = "../index.html";
}

function onDeconnection() {
	// On déselectionne l'utilisateur sélectionné.
	localStorage.setItem("selected", - 1);
	location.reload();
}

function onChangerProfile() {
	$('#menuProfile').css('display', 'none');
	$('#choixProfile').css('display', 'block');
}

function onPrendrePhoto() {
	navigator.camera.getPicture(function(imageURI) {

	    // imageURI is the URL of the image that we can use for
	    // an <img> element or backgroundImage.

	  }, function(err) {

	    // Ruh-roh, something bad happened

	  }, cameraOptions);
}