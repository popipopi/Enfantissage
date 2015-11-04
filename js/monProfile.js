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
		var img = $('<img>');
		img.attr('id', i);
		img.attr('class', 'imagesSelection');
		img.attr('onclick', "onChoixProfile(this.id)");
		img.attr('src', "../" + users[i][1]);
		img.appendTo('#choixProfile');
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
	var new_user = [$('#name').val(), "images/homepage/defaultProfile.jpg", "00", "00", "00"	];
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