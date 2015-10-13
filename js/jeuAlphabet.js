var correctCards = 0;
var lettres = "abcdefghijklmnopqrstuvwxyz";
  
$(document).ready(function(){
  init();
});

$(document).on('pagecreate','#resultat', function() {
  $("#score").text("Bravo !!!");
});

function init() {
  lettres = "abcdefghijklmnopqrstuvwxyz";
  lettres = selectLettres(lettres);

  // Reset the game
  correctCards = 0;
  $('#cardPile').html('');
  $('#cardSlots').html('');

  // Create the pile of shuffled cards
  var sorted_lettres = sort(lettres);

  for (var i = 0; i < sorted_lettres.length; ++i) {
    $('<div>' + sorted_lettres[i] + '</div>').data('lettre', sorted_lettres[i]).attr('id', 'card' + sorted_lettres[i]).appendTo('#cardPile').draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    });
  }

  // Create the card slots
  for (var i = 1; i <= lettres.length; ++i) {
    $('<div>' + '&nbsp;' + '</div>').data('lettre', lettres[i-1]).appendTo('#cardSlots').droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    });
  }
}

// Select 7 following letters in the alphabet.
function selectLettres(lettres) {
  var selection = "";
  var rand_letter = 0;
  do {
    rand_letter = Math.floor(Math.random() * lettres.length);
  } while (rand_letter > lettres.length - 7);
    
  selection = lettres.substring(rand_letter, rand_letter + 7);
  return selection;
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

  if (correctCards == lettres.length) {
    $.mobile.changePage( "resultat.html", { transition: "slideup", changeHash: false });
  }
}