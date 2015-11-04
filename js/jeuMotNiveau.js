var correctCards = 0;
var selection = [];
var count = -1;

$(document).ready(function(){
  init();
});

$(document).on('pagecreate','#resultat', function() {
  $("#score").text("Bravo !!!");
});

function init() {
  var images = ["banane", "bleu", "cerises", "chat", "chien", "fraise", "jaune", "lapin", "marron", "poire", "pomme", "poule", "raisin", "rose", "rouge", "tortue", "vert"];  
  for (var i = 0; i < 3; ++i) {
    var randomNumber = Math.floor(Math.random() * images.length);
    selection.push(images[randomNumber]);
    images.splice($.inArray(images[randomNumber], images), 1 );
  }

  nextWord();
}

function nextWord() {
  // Reset the game
  correctCards = 0;
  $('#cardPile').html('');
  $('#cardSlots').html('');
  
  count ++;
  $('#arrowImage').hide();
  var sorted_word = sort(selection[count]);
  
  $("#randomImage").attr("src", "../images/jeuMot/" + selection[count] + ".png");

  for (var i = 0; i < sorted_word.length; ++i) {
    $('<div>' + sorted_word[i] + '</div>').data('lettre', sorted_word[i]).attr('id', 'card' + sorted_word[i]).appendTo('#cardPile').draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    });
  }

  // Create the card slots
  for (var i = 1; i <= selection[count].length; ++i) {
    if ($.mobile.activePage.attr('id') == "jeuMotNiveau1") {
        $('<div>' + selection[count][i-1] + '</div>').data('lettre', selection[count][i-1]).appendTo('#cardSlots').droppable( {
	  accept: '#cardPile div',
	  hoverClass: 'hovered',
	  drop: handleCardDrop
	});
    } else if ($.mobile.activePage.attr('id') == "jeuMotNiveau2") {
      if (i < 4 && i <= selection[count].length / 2) {
        $('<div>' + selection[count][i-1] + '</div>').data('lettre', selection[count][i-1]).appendTo('#cardSlots').droppable( {
	  accept: '#cardPile div',
	  hoverClass: 'hovered',
	  drop: handleCardDrop
	});
      } else {
         $('<div>' + '&nbsp;' + '</div>').data('lettre', selection[count][i-1]).appendTo('#cardSlots').droppable( {
	  accept: '#cardPile div',
	  hoverClass: 'hovered',
	  drop: handleCardDrop
	});
      }
    } else {
        $('<div>' + '&nbsp;' + '</div>').data('lettre', selection[count][i-1]).appendTo('#cardSlots').droppable( {
	  accept: '#cardPile div',
	  hoverClass: 'hovered',
	  drop: handleCardDrop
	});
    }
  }
}

// Sort randomly the letters of the string put as
// parameter.
function sort(lettres) {
  var sorted_word = "";
  
  while (lettres) {
    var rand_letter = lettres.charAt(Math.floor(Math.random() * lettres.length));
    sorted_word += rand_letter;
    lettres = lettres.replace(rand_letter, '');
  }
  
  return sorted_word;
}

function handleCardDrop(event, ui) {
  var slotNumber = $(this).data('lettre');
  var cardNumber = ui.draggable.data('lettre');

  // If the card was dropped to the correct slot,
  // change the card colour, position it directly
  // on top of the slot, and prevent it being dragged
  // again

  if (slotNumber == cardNumber) {
    ui.draggable.addClass('correct');
    ui.draggable.draggable('disable');
    $(this).droppable('disable');
    ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' });
    ui.draggable.draggable('option', 'revert', false);
    correctCards++;
  } 
  
  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go

  if (correctCards == selection[count].length) {
    if (count < selection.length - 1) {
      $('#arrowImage').show();
    } else {
      $.mobile.changePage( "resultat.html", { transition: "slideup", changeHash: false });
    }
  }
}