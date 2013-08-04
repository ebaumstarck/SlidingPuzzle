
var
  //number of slices of the picture
  numSlices = 36,
  //row or columns of the picture n * n 
  rows = Math.floor(Math.sqrt(numSlices)),
  cols = Math.floor(numSlices / rows);
numSlices = rows * cols;
// size of the slice
var pieceSize = Math.round(500 / rows);

// the origin of the puzzle
var origin = {
  left: 100,
  top: 100
};
// the position of the last piece in indices
var blankPiece = {
  x: -1,
  y: -1
};

// for a piece get its grid index
function getPieceIndex(piece) {
  var offset = piece.offset();
  var y = Math.floor((offset.top - origin.top) / pieceSize);
  var x = Math.floor((offset.left - origin.left) / pieceSize);
  return {
    x: x,
    y: y
  }
}

// whether two pieces are next to each other
// indices1 - has '{ x: number, y: number }'
// indices2 - has '{ x: number, y: number }'
function isNextTo(indices1, indices2) {
  if (indices1.x == indices2.x && Math.abs(indices1.y - indices2.y) == 1) {
    return true;
  }
  if (indices1.y == indices2.y && Math.abs(indices1.x - indices2.x) == 1) {
    return true;
  }
  return false;
}

var animating = 0;
// swap two pieces' positions
function swap(piece1, piece2, animate) {
  var offset1 = piece1.offset();
  var offset2 = piece2.offset();
  if (animate) {
    animating = 2;
    piece1.animate(offset2, undefined, undefined, function() {
      --animating;
    });
    piece2.animate(offset1, undefined, undefined, function() {
      --animating;
    });
  } else {
    piece1.offset(offset2);
    piece2.offset(offset1);
  }
}

// shuffle the blank piece
function shuffle(blankPiece, nSteps) {
  while (nSteps) {
    var blankIndices = getPieceIndex(blankPiece);
    // get all possible moves
    var moves = [];
    // move right
    if (blankIndices.x < cols - 1) {
      moves.push({
        x: blankIndices.x + 1,
        y: blankIndices.y
      });
    }
    // move left
    if (blankIndices.x > 0) {
      moves.push({
        x: blankIndices.x - 1,
        y: blankIndices.y
      });
    }
    // move up
    if (blankIndices.y < rows - 1) {
      moves.push({
        x: blankIndices.x,
        y: blankIndices.y + 1
      });
    }
    // move down
    if (blankIndices.y > 0) {
      moves.push({
        x: blankIndices.x,
        y: blankIndices.y - 1
      });
    }

    // pick a random move
    var move = moves[Math.floor(moves.length * Math.random())];
    var piece = document.elementFromPoint(
        move.x * pieceSize + origin.left,
        move.y * pieceSize + origin.top);
    swap(blankPiece, $(piece), false);
    --nSteps;
  }
}


// when the page is ready
$(document).ready(function() {
  //automatically create div based on the random number
  for(var i = 0 ; i < numSlices; i++){
    var topPos = Math.floor(i / rows) * pieceSize;
    var leftPos = Math.floor(i % rows) * pieceSize;
    var classes = "puzzle-piece";
    if (i == numSlices - 1) {
      classes += " puzzle-blankPiece";
    }
    $("#puzzle").append(
        '<div class="' + classes + '" '
        + 'style = "top:' + (origin.top + topPos) + 'px; '
        + 'left:' + (origin.left + leftPos) + 'px; '
        + 'background-position: -' + leftPos + 'px -' + topPos +'px;"></div>');
  }
  var blankPiece = $(".puzzle-piece.puzzle-blankPiece");
  shuffle(blankPiece, numSlices * numSlices);
  
  $('.puzzle-piece').width(pieceSize - 2).height(pieceSize - 2).
      click(function() {
        if (animating > 0) {
          return;
        }
        // check whether the piece is next to the blank piece
        var indices = getPieceIndex($(this));
        var blankIndices = getPieceIndex(blankPiece);
        if (isNextTo(indices, blankIndices)) {
          swap($(this), blankPiece, true);
        }
      });

  $("body").append('<img src="img/pic1.jpg" class="thumbnail"></img>')


  // $('.puzzle-blankPiece').width(size).height(size);
  // // jquery drag slices of picture
  // $(function() {
  //   $( ".puzzle-piece" ).draggable();
  // });
});