// window.Chess = {};
// function Board() {
//   this.pieces = [];
// }

// Board.prototype.addPiece = function(piece, coordinate) {

// };

window.onload = function() {
    window.game = new Phaser.Game(800, 800, Phaser.AUTO, '', { preload: preload, create: create, render: render, update: update});
    //create instances of each white piece 
    var w1Rook = new Rook(game, 'white');
    var w2Rook = new Rook(game, 'white');
    var wQueen = new Queen(game, 'white');
    var wKing = new King(game, 'white');    // var w2Rook = new Piece(game, 'white');
    var w1Bishop = new Bishop(game, 'white');
    var w2Bishop = new Bishop(game, 'white');
    var w1Knight = new Knight(game, 'white');
    var w2Knight = new Knight(game, 'white');
    var w1Pawn = new Pawn(game, 'white');
    var w2Pawn = new Pawn(game, 'white');
    var w3Pawn = new Pawn(game, 'white');
    var w4Pawn = new Pawn(game, 'white');
    var w5Pawn = new Pawn(game, 'white');
    var w6Pawn = new Pawn(game, 'white');
    var w7Pawn = new Pawn(game, 'white');
    var w8Pawn = new Pawn(game, 'white');

    // create instances of each black piece
    var bQueen = new Queen(game, 'black');
    var bKing = new King(game, 'black');
    var b1Rook = new Rook(game, 'black');
    var b2Rook = new Rook(game, 'black');
    var b1Bishop = new Bishop(game, 'black');
    var b2Bishop = new Bishop(game, 'black');
    var b1Knight = new Knight(game, 'black');
    var b2Knight = new Knight(game, 'black');
    var b1Pawn = new Pawn(game, 'black');
    var b2Pawn = new Pawn(game, 'black');
    var b3Pawn = new Pawn(game, 'black');
    var b4Pawn = new Pawn(game, 'black');
    var b5Pawn = new Pawn(game, 'black');
    var b6Pawn = new Pawn(game, 'black');
    var b7Pawn = new Pawn(game, 'black');
    var b8Pawn = new Pawn(game, 'black');
    
    function preload () {
    
      game.load.image('background', '/images/chessboard.png');
      game.load.image('square', '/images/grid.jpeg');
      game.load.image('bQueen', '/images/blackqueen.png');
      game.load.image('bKing', '/images/blackking.png');
      game.load.image('bRook', '/images/blackrook.png');
      game.load.image('bBishop', '/images/blackbishop.png');
      game.load.image('bKnight', '/images/blackknight.png');
      game.load.image('bPawn', '/images/blackpawn.png');

      game.load.image('wQueen', '/images/whitequeen.png');
      game.load.image('wKing', '/images/whiteking.png');
      game.load.image('wRook', '/images/whiterook.png');
      game.load.image('wBishop', '/images/whitebishop.png');
      game.load.image('wKnight', '/images/whiteknight.png');
      game.load.image('wPawn', '/images/whitepawn.png');

  }
    var fullScreenKey
    var allPieces;
    var grid = [];
    var currentTile = new Phaser.Point();
    
    function create () {

      game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.physics.startSystem(Phaser.Physics.ARCADE);

        // Create GRID for units to move over.
        for (var y=0; y<8; y++) 
        {
          grid[y]= [];
          for (var x=0; x<8; x++){
            grid[y][x] = game.add.image(x * 100, y * 100, 'square');
          }
        }

        var background = game.add.image(0, 0, 'background');
        background.height = 800;
        background.width = 800;

        var allPieces = game.add.group();

        game.input.onDown.add(clickedBlock, this);

        bQueen.create(3, 0, 'bQueen');
        bKing.create(4, 0, 'bKing');
        b1Rook.create(7,0,'bRook');
        b2Rook.create(0,0, 'bRook');
        b1Bishop.create(2,0, 'bBishop');
        b1Bishop.create(6,0, 'bBishop');
        b1Knight.create(1,0, 'bKnight');
        b2Knight.create(5,0, 'bKnight');
        b1Pawn.create(0,1, 'bPawn');
        b2Pawn.create(1,1, 'bPawn');
        b3Pawn.create(2,1, 'bPawn');
        b4Pawn.create(3,1, 'bPawn');
        b5Pawn.create(4,1, 'bPawn');
        b6Pawn.create(5,1, 'bPawn');
        b7Pawn.create(6,1, 'bPawn');
        b8Pawn.create(7,1, 'bPawn');
        // Generate WHITE starting pieces
        wQueen.create(3, 7, 'wQueen');
        wKing.create(4, 7, 'wKing');
        w1Rook.create(7, 7, 'wRook');
        w2Rook.create(0, 7, 'wRook');
        w1Bishop.create(2, 7, 'wBishop');
        w2Bishop.create(6, 7, 'wBishop');
        w1Knight.create(1, 7, 'wKnight');
        w2Knight.create(5, 7, 'wKnight');
        w1Pawn.create(0, 6, 'wPawn');
        w2Pawn.create(1, 6, 'wPawn');
        w3Pawn.create(2, 6, 'wPawn');
        w4Pawn.create(3, 6, 'wPawn');
        w5Pawn.create(4, 6, 'wPawn');
        w6Pawn.create(5, 6, 'wPawn');
        w7Pawn.create(6, 6, 'wPawn');
        w8Pawn.create(7, 6, 'wPawn');

        // Set F keypress to go Full Screen
        var fullScreenKey = this.input.keyboard.addKey(Phaser.Keyboard.F);
        fullScreenKey.onDown.add(gofull, this);

    }

    function clickedBlock() {
      if (currentTile.x >= 0 && currentTile.x <= 8 && currentTile.y >= 0 && currentTile.y <= 8)
      {
        square = grid[currentTile.y][currentTile.x];
        square.alpha = 0.5;
      }
    }

    function gofull() {
      if (game.scale.isFullScreen)
      {
        game.scale.stopFullScreen();
      } else {
        game.scale.startFullScreen(false);
      }
    }

    function update(){
      currentTile.x = this.game.math.snapToFloor(game.input.x, 100)/100;
      currentTile.y = this.game.math.snapToFloor(game.input.y, 100)/100;
      // b1Rook.updateMove(rookMove);
      // bKing.sprite.events.onDragStop.add(this.kingMove, this.sprite);
      // bKing.updateMove(kingMove);
    }

    function render() {
      game.debug.text('Tile X: ' + currentTile.x + 'Y: ' + currentTile.y, 5, 5);
    }
};