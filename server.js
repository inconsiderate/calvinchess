var WebSocketServer = require('ws').Server 
	, wss = new WebSocketServer({port: 8080});

	console.log('Server started on 8080');

	var king = {x:0, y:9};

	wss.on('connection', function(ws) {
		ws.on('message', function(message) {
			king.x = incomingMsg.x;
			king.y = incomingMsg.y;
			for(var i in wss.clients) {
				wss.clients[i].send(JSON.stringify(king);
			}
		});
				ws.send(JSON.stringify(king));
	})