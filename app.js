var express = require('express');
var app = express();
var server = require('http').createServer(app);  
var path = require('path');
var io = require('socket.io')(server);

app.use(express.static(__dirname +'/public'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});


/*
	Richiesta POST, incrementa il contatore di :value
	e.g. POST 127.0.0.1:3000/cont/50
*/
app.post('/cont/:value', function (req,res){
	var value = req.params.value;
	if(isNaN(value)){
		res.status(400).send('Value NaN');
	}else{
		if(value < 0) value = 0;
		if(value > 100) value = 100;
		console.log('Progress: '+value+'%');
		io.emit('setProgress',{'value':value});
		res.status(200).send();
	}
});

/*
	Richiesta POST, incrementa il livello contagiosità
	e.g. POST 127.0.0.1:3000/level/increase
*/
app.post('/level/increase', function(req,res){
	console.log("Increase Level Request");
	io.emit('increaseLevel');
	res.status(200).send();
});

/*
	Richiesta POST, decrementa il livello contagiosità
	e.g. POST 127.0.0.1:3000/level/decrease
*/
app.post('/level/decrease', function(req,res){
	console.log("Decrease Level Request");
	io.emit('decreaseLevel');
	res.status(200).send();
});


/*
	Richiesta POST, scrive nel log
	:type => {'danger','info','warning'}
	:message => Messaggio da scrivere
	e.g. POST 127.0.0.1:3000/danger/Attenzione Messaggio di Errore
*/
app.post('/chat/:type/:message', function(req,res){
	var type = req.params.type;
	var message = req.params.message;
	io.emit('chat', {'type':type,'message':message});
	res.status(200).send();
});


/*
	Richiesta POST, avvia o conclude il gioco
	:type => 'start' per avviare, 'over' per concludere
	e.g. POST 127.0.0.1:3000/game/start
*/
app.post('/game/:type', function(req,res){
	var type = req.params.type;
	switch(type){
		case "start":
			io.emit('gamestart');
		break;
		case "over":
			io.emit('gameover');
		break;
	}

	res.status(200).send();
});

server.listen(3000);
io.listen(server);