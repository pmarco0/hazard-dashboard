var l = require('./lang/Lang.js');
var config = require('./Config.js');
var lang = l[config['LANGUAGE']];
var ModalDialog = require('./utils/ModalDialog.js');
var MapUtils = require('./utils/MapUtils.js');
var Utils = require('./utils/Utils.js');

/**
 * Classe responsabile delle modifiche grafiche alla dashboard.
 */
class Dashboard {
	/**
	 * Costruttore. Inizializzo le variabili, imposto gli indicatori di contagio e mostro il modal in attesa dell'avvio dal server.
	 * @return NA
	 */
	constructor() {
		this.modal = new ModalDialog();
		this.map = new MapUtils();
		this.utils = new Utils();
		var self = this;

		$(document).ready(function() {
			for(var i = 0; i<config['MAX_LEVEL'];i++){
				$(config['PROGRESS_BALLS_ID']).append('<li id="layer'+(i+1)+'" class="ball"></li>');
			}
			self.showModal(lang['gamestart'],lang['oktostart']);
		});
	}


	/*TEST DA RIMUOVERE*/

	testBasic () {
		this.setProgress(30);
		this.setLevel(+1);
		this.changeResources('gatti',100);
		this.updateTurn('Mario');
	}
	test() {
	   var self = this;
	   var updatedOptions = {'areas': {}, 'plots': {}};
	   var vars = [];
	   vars['Risorsa 1'] = 50;
	   vars['Risorsa 2'] = 40;
	   console.log(self.utils.__buildTooltip('Canada',vars));
	   updatedOptions.areas['America2'] = {
	   		value: 3,
	   };
	   	 updatedOptions.plots['canada'] = {
		 	type: 'image',
		 	url : './assets/img/icon.png',
		 	width: 8,
		 	height: 8,
		 				latitude: 70,
				longitude: 50,
		 	tooltip : self.utils.__buildTooltip('Canada',vars),
		 }
	   this.map.UpdateMap(updatedOptions,{},{});
	   this.map.MovePlayer('canada','usa');
	}


	/**
	 * Aggiorna il tooltip in caso di eliminazione o modifica di una emergenza
	 * @param  {String} area      [ID Univoco dell'area]
	 * @param  {Object} emergency [Emergenze dell'area]
	 * @return {NA}
	 */
	updateEmergenciesTooltip(area,emergency){
		var updatedOptions = {'areas' : {}};
		updatedOptions.areas[area].tooltip = this.utils.__buildTooltip(area,emergency);
		this.map.UpdateMap(updatedOptions,{},{});
	}


	/**
	 * Imposta il valore della progress bar
	 * @param {int} value "Valore della progress bar [0-100]"
	 */
	setProgress(value){
		$(config['PROGRESS_BAR_ID']).removeClass('progress-bar-success');
		$(config['PROGRESS_BAR_ID']).removeClass('progress-bar-warning');
		$(config['PROGRESS_BAR_ID']).removeClass('progress-bar-danger');
		if(value < 30) {
			var progressClass = 'progress-bar-success';
		}else if (value >= 30 && value <= 60){
			var progressClass = 'progress-bar-warning';
		}else{
			var progressClass = 'progress-bar-danger';
		}
		$(config['PROGRESS_BAR_ID']).attr('aria-valuenow', value).css('width',value+'%');
		$(config['PROGRESS_BAR_ID']).addClass(progressClass);
		$(config['PROGRESS_BAR_ID']).html(value+'%');
	}

	/**
	 * Imposta il livello di contagio, assegna un colore e visualizza il tutto.
	 * I sottogruppi di diverso colore sono calcolati in automatico.
	 * @param {int} value [Valore positivo indica un aumento, negativo una diminuzione. Per aumentare o diminuire di più di uno step chiamare più volte la funzione]
	 */
	setLevel(value){
		var current = parseInt($(config['PROGRESS_BALLS_ID']).attr('current'));
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
			$(config['PROGRESS_BALLS_ID']).attr('current',current);
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
			$(config['PROGRESS_BALLS_ID']).attr('current',current);
		}
	}


	/**
	 * Modifica le risorse visualizzate per l'area corrente
	 * @param  {String} resource [Identificatore univoco della risorsa]
	 * @param  {String} quantity [Quantità della risorsa]
	 * @return NA       
	 */
    changeResources(resource,quantity){
    	var item = $(config['RESOURCES_LOCATION']).find('#'+resource);
    	if(item.length) {
    		item.html(quantity);
    	}else {
    		$(config['RESOURCES_LOCATION']).append('<li><i class="'+config['RESOURCES_ICON']+'" id="'+resource+'" aria-hidden="true" title="'+resource.capitalizeFirstLetter()+'"></i>'+resource.capitalizeFirstLetter()+' : '+quantity+'</li>');
    	}
    }


	/**
	 * Scrive un log
	 * @param {String} type [Tipo di messaggio da mostrare, uno tra {DANGER, INFO, WARNING}]
	 * @param {String} text [Testo del messaggio da mostrare]
	 */
	
	addLog(type,text){
		var d = new Date();
		var time = d.getHours() + ":" + d.getMinutes();
		var timestamp = d.getTime();
		switch(type.toUpperCase()){
			case "DANGER":
				var class1 = "fa fa-exclamation-triangle";
				var color="#DE2203";
				$(config['LOG_AREA_ID']).prepend("<p id='"+timestamp+"'><font class=\"text-muted\">["+time+"] ("+lang['turn']+" "+$('#turnTitle').attr('turn')+"): </font><i class='"+class1+"' style='color:"+color+";' aria-hidden='true'></i> "+text+"</p><hr class='style3'/>");
				break;
			case "INFO":
				var class1 = "fa fa-flag";
				var color  = "#337AB7";
				$(config['LOG_AREA_ID']).prepend("<p id='"+timestamp+"'><font class=\"text-muted\">["+time+"] ("+lang['turn']+" "+$('#turnTitle').attr('turn')+"): </font><i class='"+class1+"' style='color:"+color+";' aria-hidden='true'></i> "+text+"</p><hr class='style3'/>");
			break;
			case "WARNING":
				var class1 = "fa fa-exclamation";
				var color='#FEA500';
				$(config['LOG_AREA_ID']).prepend("<p id='"+timestamp+"'><font class=\"text-muted\">["+time+"] ("+lang['turn']+" "+$('#turnTitle').attr('turn')+"): </font><i class='"+class1+"' style='color:"+color+";' aria-hidden='true'></i> "+text+"</p><hr class='style3'/>");
				break;
		}
		
		/*Blink new log*/
		$('#'+timestamp).css('background-color',color);
		$('#'+timestamp).fadeTo(300, 0.3, function() { 
			$(this).fadeTo(500, 1.0); 
			$('#'+timestamp).css('background-color','transparent');
		});
		
	}

	/**
	 * Passa al turno successivo, aumenta il numero visualizzato
	 * @param {String} [who] [Nome del gruppo]
	 * @return NA
	 */
	updateTurn(who = null) {
		var turn = parseInt($(config['TURN_LOCATION']).attr('turn'));
		turn=turn+1;
		$(config['TURN_LOCATION']).attr('turn',turn);
		$(config['TURN_LOCATION']).html(lang['turn']+" "+turn);
		this.addLog('INFO',lang['turn_start'] +' '+turn)
		if(who) $(config['TURN_GROUP_LOCATION']).html(who);
	}

	/**
	 * Mostra il modal, se è necessario modificarne il contenuto senza eliminarlo utilizzare updateModal(). Un solo modal alla volta è permesso.
	 * TODO: Permettere la visualizzazione di un contenuto più significativo del semplice testo 
	 * @param  {String} title   [Intestazione del modal]
	 * @param  {String} content [Contenuto del modal]
	 * @param  {String} clazz   [Classe css del modal, di default è utilizzato modal-primary]
	 * @return NA
	 */
	showModal(title,content,clazz) {
		if(this.modal.isVisible()) modal.hide();

		this.modal.setup(clazz);
		this.modal.setTitle(title);
		this.modal.setContent(content);
		this.modal.show();
	}

	/**
	 * Nascondi il modal dopo {time} millisecondi
	 * @param  {int} time [Tempo in millisecondi prima che il modal venga nascosto] 
	 * @return NA
	 */
	hideModal(time = 5000) {
		var self = this;
		setTimeout(
			function(){
				self.modal.hide();
			},time);
	}


	/**
	 * Blocca un collegamento (tratteggio)
	 * @param {String} link [ID Univoco del collegamento]
	 * @param {Boolean} enabled [True se il link è attraversabile, false altrimenti]
	 * @param {Integer} time [Tempo in millisecondi prima che il link venga ricreato, default: 500]
	 */
	CloseLink(link,enabled=true,time = 500){
		var linkedPlots = link.split('.');
		var strokeStyle = enabled ? '-' : '--';
		var self = this;

		this.RemoveLink(link);

		setTimeout(
			function(){
				this.AddLink(linkedPlots[0],linkedPlots[1],strokeStyle);
			},time);
	}

}

module.exports = Dashboard;