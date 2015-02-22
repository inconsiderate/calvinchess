rookMove = function(item, pointer){
  if (item.originX != item.x && item.originY != item.y){
    game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    console.log("rook is moving back.");
  }
  else {
    item.originX = item.x;
    item.originY = item.y;
  }
}


kingMove = function(item, pointer){
	if (Math.abs(item.originX - item.x) > 100 || Math.abs(item.originY - item.y) > 100) {
		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
	} else {
		item.originX = item.x;
		item.originY = item.y;
	}
}
