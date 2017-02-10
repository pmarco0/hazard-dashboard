function increaseProgress(value){
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


function increaseLevel(){
	var current = parseInt($('#progress').attr('current'));
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
}

$(document).ready(function() {
	for(i = 0; i<9;i++){
		$('#progress').append('<li id="layer'+(i+1)+'" class="ball"></li>');
	}
	test();
});

function addLog(type,text){
	var d = new Date();
	var time = d.getHours() + ":" + d.getMinutes();
	switch(type){
		case "DANGER":
			var class1 = "fa fa-exclamation-triangle";
			var color="#DE2203";
			break;
		case "INFO":
			var class1 = "fa fa-flag";
			var color  = "#337AB7";
		break;
		case "WARNING":
			var class1 = "fa fa-exclamation";
			var color='#FEA500';
			break;
	}
	$("#log-area").prepend("<p><font class=\"text-muted\">["+time+"] (Turno 1): </font><i class='"+class1+"' style='color:"+color+";' aria-hidden='true'></i> "+text+"</p><hr class='style3'/>");
}

/* TEST, DA RIMUOVERE*/
function test(){
	 setTimeout(function(){ 
		increaseProgress(70);
	 },500);
	 	 setTimeout(function(){ 
		increaseLevel();
	 },500);
	 	 setTimeout(function(){ 
		increaseLevel();
	 },500);
	 setTimeout(function(){ 
		increaseLevel();
	 },500);
	setTimeout(function(){ 
		increaseLevel();
	 },500);
	 setTimeout(function(){ 
		increaseLevel();
	 },500);
	 setTimeout(function(){ 
		increaseLevel();
	 },500);
	 setTimeout(function(){ 
		increaseLevel();
	 },500);
	 	addLog("INFO","Inizia il turno 1");
		addLog("DANGER","Prova Prova Prova Prova Prova Prova Prova Prova ");
		addLog("WARNING","Prova Prova Prova Prova Prova Prova Prova Prova ");
				addLog("DANGER","Prova Prova Prova Prova Prova Prova Prova Prova ");


}