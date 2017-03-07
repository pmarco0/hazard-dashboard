window.$ = window.jQuery   = require('jquery');
var Raphael = require('raphael');
require('jquery-mousewheel');
var io = require('./socket.io.min.js');
var l = require('./lang.js');
var config = require('./config.js');
var lang = l.italian;

$(document).ready(function() {
	for(i = 0; i<config['MAX_LEVEL'];i++){
		$('#progress').append('<li id="layer'+(i+1)+'" class="ball"></li>');
	}
	
	var modalClass = "modal-primary";
	$('#modal-buttons').empty();
	$('#modal-buttons').append('<button type="button" id="start-game-button" disabled=true class="btn btn-default" data-dismiss="modal"><i class="fa fa-spinner fa-spin fa-2x"></i></button>');
	$('#myModal').removeClass();
	$('#myModal').addClass('modal fade '+modalClass);
	$('#modal-message-title').html(lang['wait'])
	$('#modal-message-text').html(lang['loading']);
	$('#myModal').modal("show");
});

function nextTurn(){
	var turn = parseInt($('#turnTitle').attr('turn'));
	turn=turn+1;
	$('#turnTitle').attr('turn',turn);
	$('#turnTitle').html(lang['turn']+" "+turn);
	addLog('INFO',lang['turn_start'] +' '+turn)
}

function gameStart(){
	$('#start-game-button').attr('disabled',false);
	$('#start-game-button').empty();
	$('#start-game-button').html("OK");
	$('#modal-message-title').html(lang['gamestart'])
	$('#modal-message-text').html(lang['oktostart']);
	addLog('INFO',lang['gamestartstext']);
	nextTurn();


	/*TEST DA RIMUOVERE*/

   var updatedOptions = {'areas': {}, 'plots': {}};
   var vars = [];
   vars['Risorsa 1'] = 50;
   vars['Risorsa 2'] = 40;
   console.log(buildTooltip('Canada',vars));
   updatedOptions.areas['America2'] = {
   		value: 3,
   };
   updatedOptions.plots['canada'] = {
   	   tooltip : buildTooltip('Canada',vars),
   }
   updateMap(updatedOptions,{},{});
}

function gameOver(){
	addLog('DANGER',lang['gameover']);
	var modalClass = "modal-danger";
	$('#modal-buttons').empty();
	$('#modal-buttons').append('<button type="button" class="btn btn-default" data-dismiss="modal" onclick="location.reload();">'+lang['restart']+'</button>');
	$('#myModal').removeClass();
	$('#myModal').addClass('modal fade '+modalClass);
	$('#modal-message-title').html(lang['gameover'])
	$('#modal-message-text').html(lang['gameovertext']);
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
		if(current == config['MAX_LEVEL']) return;
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
			$("#log-area").prepend("<p id='"+timestamp+"'><font class=\"text-muted\">["+time+"] ("+lang['turn']+" "+$('#turnTitle').attr('turn')+"): </font><i class='"+class1+"' style='color:"+color+";' aria-hidden='true'></i> "+text+"</p><hr class='style3'/>");
			break;
		case "INFO":
			var class1 = "fa fa-flag";
			var color  = "#337AB7";
			$("#log-area").prepend("<p id='"+timestamp+"'><font class=\"text-muted\">["+time+"] ("+lang['turn']+" "+$('#turnTitle').attr('turn')+"): </font><i class='"+class1+"' style='color:"+color+";' aria-hidden='true'></i> "+text+"</p><hr class='style3'/>");
		break;
		case "WARNING":
			var class1 = "fa fa-exclamation";
			var color='#FEA500';
			$("#log-area").prepend("<p id='"+timestamp+"'><font class=\"text-muted\">["+time+"] ("+lang['turn']+" "+$('#turnTitle').attr('turn')+"): </font><i class='"+class1+"' style='color:"+color+";' aria-hidden='true'></i> "+text+"</p><hr class='style3'/>");
			break;
	}
	
	/*Blink new log*/
	$('#'+timestamp).css('background-color',color);
	$('#'+timestamp).fadeTo(300, 0.3, function() { 
		$(this).fadeTo(500, 1.0); 
		$('#'+timestamp).css('background-color','transparent');
	});
	
}


function updateMap(updatedOptions,newPlots,deletedPlots){
    $(".map-container").trigger('update', [{
        mapOptions: updatedOptions, 
        newPlots: newPlots, 
        deletePlotKeys: deletedPlots,
        animDuration: 1000
    }]);
}

/*UTILS*/
function buildTooltip(name,vars){
	var content_text = '<span style=\"font-weight:bold;\">Zona :</span>' + name;
	for(var key in vars){
		content_text += '<span style=\"font-weight:bold;\">'+key+' :</span> '+vars[key]+'<br />';
	}
	var tooltip = {content: content_text}
	return tooltip;
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
