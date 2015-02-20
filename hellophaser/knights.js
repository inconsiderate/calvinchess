function makeKnight(color, x, y){
  function knightMove(item, pointer){
    if((Math.abs(item.originX - item.x) === 200 && Math.abs(item.originY - item.y) === 100 )|| (Math.abs(item.originX - item.x) === 100 && Math.abs(item.originY - item.y) === 200)){
      item.originX = item.x;
      item.originY = item.y;
    }else{
      game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    }
  }

	if (color == "white") {
		knight = game.add.sprite(x, y, 'wknight');
  } else {
  	knight = game.add.sprite(x,y, 'bknight');
  }
  knight.inputEnabled = true;
  knight.input.enableDrag();
  knight.input.enableSnap(100, 100, false, true, 5, 5);
  knight.events.onDragStop.add(knightMove ,knight);
  knight.originX = knight.x;
  knight.originY = knight.y;
  return knight
}

