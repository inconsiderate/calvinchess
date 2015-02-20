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

        // Generate BLACK starting pieces
        var b1Queen = makeQueen('black', 305, 5);
        var b1King = makeKing('black', 405, 5);
        var b1Rook = makeRook('black', 705, 5);
        var b2Rook = makeRook('black', 5, 5);
        var b1Bishop = makeBishop('black', 205, 5);
        var b2Bishop = makeBishop('black', 605, 5);
        var b1Knight = makeKnight('black', 105, 5);
        var b2Knight = makeKnight('black', 505, 5);
        var b1Pawn = makePawn('black', 5, 105);
        var b2Pawn = makePawn('black', 105, 105);
        var b3Pawn = makePawn('black', 205, 105);
        var b4Pawn = makePawn('black', 305, 105);
        var b5Pawn = makePawn('black', 405, 105);
        var b6Pawn = makePawn('black', 505, 105);
        var b7Pawn = makePawn('black', 605, 105);
        var b8Pawn = makePawn('black', 705, 105);
        // Generate WHITE starting pieces
        var w1Queen = makeQueen('white', 305, 705);
        var w1King = makeKing('white', 405, 705);
        var w1Rook = makeRook('white', 705, 705);
        var w2Rook = makeRook('white', 5, 705);
        var w1Bishop = makeBishop('white', 205, 705);
        var w2Bishop = makeBishop('white', 605, 705);
        var w1Knight = makeKnight('white', 105, 705);
        var w2Knight = makeKnight('white', 505, 705);
        var w1Pawn = makePawn('white', 5, 605);
        var w2Pawn = makePawn('white', 105, 605);
        var w3Pawn = makePawn('white', 205, 605);
        var w4Pawn = makePawn('white', 305, 605);
        var w5Pawn = makePawn('white', 405, 605);
        var w6Pawn = makePawn('white', 505, 605);
        var w7Pawn = makePawn('white', 605, 605);
        var w8Pawn = makePawn('white', 705, 605);
        // add all starting BLACK pieces to allPieces.group
        var blackArray = [b1Queen, b1King, b1Rook, b2Rook, b1Bishop, b2Bishop, b1Knight, b2Knight, b1Pawn, b2Pawn, b3Pawn, b4Pawn, b5Pawn, b6Pawn, b7Pawn, b8Pawn];
        allPieces.addMultiple(blackArray);

        // add all starting WHITE pieces to allPieces.group
        var whiteArray = [w1Queen, w1King, w1Rook, w2Rook, w1Bishop, w2Bishop, w1Knight, w2Knight, w1Pawn, w2Pawn, w3Pawn, w4Pawn, w5Pawn, w6Pawn, w7Pawn, w8Pawn];
        allPieces.addMultiple(whiteArray);

        allPieces.setAll('height', 90);
        allPieces.setAll('width', 90);

        // Set F keypress to go Full Screen
        var fullScreenKey = this.input.keyboard.addKey(Phaser.Keyboard.F);
        fullScreenKey.onDown.add(gofull, this);

        // code to create client for multiplayer
        // this.client = new Client();
        // this.client.openConnection();
        // textTest = game.add.text(0, 800, "Started", {font: "14px Arial", fill: "#ff0044"});
        // w1King.events.onDragStop.add(kingDragged, this)
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

      // game.physics.arcade.collide(allPieces, killProcess);

    }

    function render() {
      game.debug.text('Tile X: ' + currentTile.x + 'Y: ' + currentTile.y, 5, 5);
    }
};