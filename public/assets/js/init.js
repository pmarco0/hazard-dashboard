

$(document).ready(function() {
	for(i = 0; i<9;i++){
		$('#progress').append('<li id="layer'+(i+1)+'" class="ball"></li>');
	}
	var modalClass = "modal-primary";
	var modalTitle = "Attendi...";
	var modalText = "Caricamento in Corso";
	$('#modal-buttons').empty();
	$('#modal-buttons').append('<button type="button" id="start-game-button" disabled=true class="btn btn-default" data-dismiss="modal"><i class="fa fa-spinner fa-spin fa-2x"></i></button>');
	$('#myModal').removeClass();
	$('#myModal').addClass('modal fade '+modalClass);
	$('#modal-message-title').html(modalTitle)
	$('#modal-message-text').html(modalText);
	$('#myModal').modal("show");
});

function nextTurn(){
	var turn = parseInt($('#turnTitle').attr('turn'));
	turn=turn+1;
	$('#turnTitle').attr('turn',turn);
	$('#turnTitle').html("Turno "+turn);
	addLog('INFO','Inizia il turno '+turn)
}

function gameStart(){
	$('#start-game-button').attr('disabled',false);
	$('#start-game-button').empty();
	$('#start-game-button').html("OK");
	var modalTitle = "Inizia il Gioco";
	var modalText = "Premi OK per iniziare la partita";
	$('#modal-message-title').html(modalTitle)
	$('#modal-message-text').html(modalText);
	addLog('INFO',"Inizia il gioco");
	nextTurn();
}

function gameOver(){
	addLog('DANGER','Game Over');
	var modalClass = "modal-danger";
	var modalTitle = "Game Over";
	var modalText = "La malattia ha preso il sopravvento";
	$('#modal-buttons').empty();
	$('#modal-buttons').append('<button type="button" class="btn btn-default" data-dismiss="modal" onclick="location.reload();">Ricomincia</button>');
	$('#myModal').removeClass();
	$('#myModal').addClass('modal fade '+modalClass);
	$('#modal-message-title').html(modalTitle)
	$('#modal-message-text').html(modalText);
	$('#myModal').modal("show");
}

function setProgress(value){
	$('#progressinf').removeClass('progress-bar-success');
	$('#progressinf').removeClass('progress-bar-warning');
	$('#progressinf').removeClass('progress-bar-danger');
	if(value < 30) {
		var progressClass = 'progress-bar-success';
	}else if (value >= 30 && value <= 60){
		var progressClass = 'progress-bar-warning';
	}else{
		var progressClass = 'progress-bar-danger';
	}
	$('#progressinf').attr('aria-valuenow', value).css('width',value+'%');
	$('#progressinf').addClass(progressClass);
	$('#progressinf').html(value+'%');
}


function setLevel(value){
	var current = parseInt($('#progress').attr('current'));
	if(value > 0){
		if(current == 9) return;
		var currentLevelType = Math.ceil((current+1)/3);
		if(currentLevelType ==1 || current == 0){
			var levelClass = 'ball-ok';
		}else if (currentLevelType ==2) {
			var levelClass = 'ball-warning';
		}else {
			var levelClass = 'ball-danger';
		}
		$('#layer'+(current+1)).addClass(levelClass);
		current = current +1;
		$('#progress').attr('current',current);
	}else{
		if(current == 0) return;
		var currentLevelType = Math.ceil((current)/3);
		if(currentLevelType ==1 || current == 0){
			var levelClass = 'ball-ok';
		}else if (currentLevelType ==2) {
			var levelClass = 'ball-warning';
		}else {
			var levelClass = 'ball-danger';
		}
		$('#layer'+(current)).removeClass(levelClass);
		current = current-1;
		$('#progress').attr('current',current);
	}
}



function addLog(type,text){
	var d = new Date();
	var time = d.getHours() + ":" + d.getMinutes();
	var timestamp = d.getTime();
	switch(type.toUpperCase()){
		case "DANGER":
			var class1 = "fa fa-exclamation-triangle";
			var color="#DE2203";
			$("#log-area").prepend("<p id='"+timestamp+"'><font class=\"text-muted\">["+time+"] (Turno "+$('#turnTitle').attr('turn')+"): </font><i class='"+class1+"' style='color:"+color+";' aria-hidden='true'></i> "+text+"</p><hr class='style3'/>");
			break;
		case "INFO":
			var class1 = "fa fa-flag";
			var color  = "#337AB7";
			$("#log-area").prepend("<p id='"+timestamp+"'><font class=\"text-muted\">["+time+"] (Turno "+$('#turnTitle').attr('turn')+"): </font><i class='"+class1+"' style='color:"+color+";' aria-hidden='true'></i> "+text+"</p><hr class='style3'/>");
		break;
		case "WARNING":
			var class1 = "fa fa-exclamation";
			var color='#FEA500';
			$("#log-area").prepend("<p id='"+timestamp+"'><font class=\"text-muted\">["+time+"] (Turno "+$('#turnTitle').attr('turn')+"): </font><i class='"+class1+"' style='color:"+color+";' aria-hidden='true'></i> "+text+"</p><hr class='style3'/>");
			break;
	}
	
	/*Blink new log*/
	$('#'+timestamp).css('background-color',color);
	$('#'+timestamp).fadeTo(300, 0.3, function() { 
		$(this).fadeTo(500, 1.0); 
		$('#'+timestamp).css('background-color','transparent');
	});
	
}

/*IMPOSTO I SOCKET*/
var socket = io.connect();

socket.on('setProgress', function(data) {
	setProgress(data.value);
});

socket.on('increaseLevel', function(data) {
	setLevel(1);
});

socket.on('decreaseLevel', function(data) {
	setLevel(-1);
});

socket.on('chat', function(data){
	addLog(data.type,data.message);
});

socket.on('gamestart', function(data){
	gameStart();
});

socket.on('gameover', function(data){
	gameOver();
});
