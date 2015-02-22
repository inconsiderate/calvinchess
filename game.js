// window.Chess = {};
// function Board() {
//   this.pieces = [];
// }

// Board.prototype.addPiece = function(piece, coordinate) {

// };

window.onload = function() {
    window.game = new Phaser.Game(800, 800, Phaser.AUTO, '', { preload: preload, create: create, render: render, update: update});
    
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
 
        var bQueen = new Queen(game, 'black',3, 0, 'bQueen');
        var bKing = new King(game, 'black', 4, 0, 'bKing');
        var b1Rook = new Rook(game, 'black',7,0,'bRook');
        var b2Rook = new Rook(game, 'black',0,0, 'bRook');
        var b1Bishop = new Bishop(game, 'black', 2,0, 'bBishop');
        var b2Bishop = new Bishop(game, 'black', 6,0, 'bBishop');
        var b1Knight = new Knight(game, 'black', 1, 0, 'bKnight');
        var b2Knight = new Knight(game, 'black', 5, 0, 'bKnight');
        var b1Pawn = new Pawn(game, 'black', 0, 1, 'bPawn');
        var b2Pawn = new Pawn(game, 'black', 1, 1, 'bPawn');
        var b3Pawn = new Pawn(game, 'black', 2, 1, 'bPawn');
        var b4Pawn = new Pawn(game, 'black', 3, 1, 'bPawn');
        var b5Pawn = new Pawn(game, 'black', 4, 1, 'bPawn');
        var b6Pawn = new Pawn(game, 'black', 5, 1, 'bPawn');
        var b7Pawn = new Pawn(game, 'black', 6, 1, 'bPawn');
        var b8Pawn = new Pawn(game, 'black', 7, 1, 'bPawn');
        
        // Generate WHITE starting pieces
        var wQueen = new Queen(game, 'white', 3, 7, 'wQueen');
        var wKing = new King(game, 'white',4, 7, 'wKing');
        var w1Rook = new Rook(game, 'white', 7, 7, 'wRook');
        var w2Rook = new Rook(game, 'white',0, 7, 'wRook');
        var w1Bishop = new Bishop(game, 'white', 2, 7, 'wBishop');
        var w2Bishop = new Bishop(game, 'white', 6, 7, 'wBishop');
        var w1Knight = new Knight(game, 'white', 1, 7, 'wKnight');
        var w2Knight = new Knight(game, 'white', 5, 7, 'wKnight');

        var w1Pawn = new Pawn(game, 'white', 0, 6, 'wPawn');
        var w2Pawn = new Pawn(game, 'white', 1, 6, 'wPawn');
        var w3Pawn = new Pawn(game, 'white', 2, 6, 'wPawn');
        var w4Pawn = new Pawn(game, 'white', 3, 6, 'wPawn');
        var w5Pawn = new Pawn(game, 'white', 4, 6, 'wPawn');
        var w6Pawn = new Pawn(game, 'white', 5, 6, 'wPawn');
        var w7Pawn = new Pawn(game, 'white', 6, 6, 'wPawn');
        var w8Pawn = new Pawn(game, 'white', 7, 6, 'wPawn');

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
    }

    function render() {
      game.debug.text('Tile X: ' + currentTile.x + 'Y: ' + currentTile.y, 5, 5);
    }
};