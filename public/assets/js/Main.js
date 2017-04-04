window.$ = window.jQuery   = require('jquery');
var Raphael = require('raphael');
require('jquery-mousewheel');
var io = require('./lib/socket.io.min.js');
var l = require('./lang/Lang.js');
var config = require('./Config.js');
var lang = l[config['LANGUAGE']];
var ModalDialog =require('./utils/ModalDialog.js');
var Utils = require('./utils/Utils.js');
var MapUtils = require('./utils/MapUtils.js');
var Dashboard = require('./Dashboard.js');
var ParserXML = require('./lib/xml2json.min.js');
var GameState = require('./utils/GameState.js');

/**
 * Classe principale dell'applicazione
 * WARN: Non utilizzare JQuery nel costruttore
 */
class HazardDashboard {


	/**
	 * Inizializza le classi e imposta i socket in ascolto
	 * @return NA
	 */
	constructor() {
		
		String.prototype.capitalizeFirstLetter = function() {
    		return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
		}

		Number.prototype.between = function(a,b){
    		return (a < b ? this[0] >= a && this[0] <= b : this[0] >= b && this[0] <= a);
		}


		this.areas = {};
		this.plots = {};
		this.links = {};
		// Inizializzazione variabili di gioco
		this.cards = {};
		this.endGame = {};
        this.groups = {};
		this.locale = {};
		this.locations = {}; 
		this.resources = {};
		this.setup = {};
		this.strongholdinfos = {};
		this.turns = {};


		this.hazard = new Dashboard();
		this.parsing = new ParserXML();
		this.gameState = GameState;
		this.utils = new Utils();

		var self = this;
		var socket = io.connect();


        socket.on('update',function(data){
			self.handleState(data);
		});

        socket.on('popupMessage',function(data){
			
		});

        socket.on('closePopup',function(data){
			self.hazard.hideModal();
		});

        socket.on('chooseProductionCard',function(data){
 		
		});

		socket.on('init',function(data){
			self.gameStart();
		});

		socket.on('parsingXML',function(data){
			self.parseXML();	// DA RIVEDERE
		});

		socket.on('connection_error', function(){
			console.log("Waiting for connection ...");
		});


		socket.emit('init_dashboard');

	}

	/**
	 * Avvia il gioco eliminando la finestra modal
	 * @return NA
	 */
	gameStart(){
		this.hazard.hideModal(3000);
		this.hazard.updateTurn();
		this.hazard.addLog('INFO',lang['gamestartstext']);
		this.parseXML();
	}

	/**
	 * Avvisa che la partita è conclusa con un modal
	 * @return NA
	 */
	gameOver(){
		this.hazard.addLog('DANGER',lang['gameover']);
		this.hazard.showModal(lang['gameover'],lang['gameovertext'],'modal-danger');
	}


	/**
	 * Esegue il parsing del file XML di configurazione
	 * @return {NA}
	 */
	parseXML(path){
		var self = this;
		// Load the xml file using ajax 
		$.ajax({
			type: "GET",
			url: 'test.xml',
			dataType: "text",
			success: function(xml){
		// Parsing
		var json = self.parsing.xml_str2json( xml )
		console.log(json);
		
		//ciclo le l'xml di setup gioco
		self.cards = json.xml.game.cards;					

		self.endGame = json.xml.game.endGame;					
		self.groups = json.xml.game.groups;
		self.locale = json.xml.game.locale
		self.locations = json.xml.game.map.area.location;
		for(var j = 0; j < self.locations.length; j++) {
			   self.areas[self.locations[j].name] = {};
			    self.areas[self.locations[j].name].emergencies = {};
			   self.areas[self.locations[j].name].value = 1;

			   self.plots[self.locations[j].name+'-plot'] = {};
			   self.plots[self.locations[j].name+'-plot'].type = config['DEFAULT_PLOT_TYPE'];
			   self.plots[self.locations[j].name+'-plot'].size = config['DEFAULT_PLOT_SIZE'];
			   self.plots[self.locations[j].name+'-plot'].latitude = self.locations[j].latitude;
			   self.plots[self.locations[j].name+'-plot'].longitude = self.locations[j].longitude;

			   for(var em in json.xml.game.emergencies.emergency) self.createEmergency(self.locations[j].name,em.name,0);

			   self.plots[self.locations[j].name+'-plot'].tooltip = {};
			   self.plots[self.locations[j].name+'-plot'].tooltip.content = self.utils.__buildTooltip(self.locations[j].name, self.locations[j].emergencies); //CREAZIONE TOOLTIPS
			   self.plots[self.locations[j].name+'-plot'].tooltip.persistent = true;
			   self.plots[self.locations[j].name+'-plot'].text = self.locations[j].name;

	   		 for(var i = 0; i<self.locations[j].neighborhood.neighbor.length;i++){
		       var neigh = self.locations[j].neighborhood.neighbor[i];
		       var link = (neigh < self.locations[j].name) ? neigh+'-'+ self.locations[j].name : self.locations[j].name+'-'+neigh;
		       if( typeof(self.links[link]) == 'undefined') {
		       	self.links[link] = {};
		        self.links[link].factor = config['DEFAULT_PLOT_FACTOR'];
		        self.links[link].between = [link.split('-')[0]+'-plot',link.split('-')[1]+'-plot'];
		        self.links[link].attrs = {};
		        self.links[link].attrs['default-stroke'] = config['DEFAULT_PLOT_STROKE'];
				}
				self.resources = json.xml.game.resources;
				self.setup = json.xml.game.setup;
				self.strongholdinfos = json.xml.game.strongholdinfos;
				self.turns = json.xml.game.turns;
			}
  		}



			},
			error: function (exception) {
				console.log('Exeption:'+exception);
			}
		});
	}


    /*__parseJson(xml){
		// Parsing
		var json = this.parsing.xml_str2json( xml )
		console.log(json);
		
		//ciclo le l'xml di setup gioco
		this.cards = json.xml.game.cards;					

		this.endGame = json.xml.game.endGame;					
		this.groups = json.xml.game.groups;
		this.locale = json.xml.game.locale
		this.locations = json.xml.game.map.area.location;
		for(var j = 0; j < this.locations.length; j++) {
			   this.areas[this.locations[j].name].value = 1;
			   this.plots[this.locations[j].name+'-plot'].type = config['DEFAULT_PLOT_TYPE'];
			   this.plots[this.locations[j].name+'-plot'].size = config['DEFAULT_PLOT_SIZE'];
			   this.plots[this.locations[j].name+'-plot'].latitude = this.locations[j].latitude;
			   this.plots[this.locations[j].name+'-plot'].longitude = this.locations[j].longitude;

			   for(var em in json.xml.game.emergencies.emergency) createEmergency(this.locations[j].name,em.name,0);

			   this.plots[this.locations[j].name+'-plot'].tooltip.content = this.utils.__buildTooltip(this.locations[j].name, this.locations[j].emergencies); //CREAZIONE TOOLTIPS
			   this.plots[this.locations[j].name+'-plot'].tooltip.persistent = true;
			   this.plots[this.locations[j].name+'-plot'].tooltip.text = this.locations[j].name;
  		}

		 for(var i = 0; i<this.locations[j].neighborhood;i++){
		       var neigh = this.locations[j].neighborhood[i];
		       var link = (neigh < this.locations[j].name) ? neigh+'-'+ this.locations[j].name : this.locations[j].name+'-'+neigh;
		       if( typeof(this.links[link]) == 'undefined') {
		        this.links[link].factor = config['DEFAULT_PLOT_FACTOR'];
		        this.links[link].between = [link.split('-')[0]+'-plot',link.split('-')[1]+'-plot'];
		        this.links[link].attrs['default-stroke'] = config['DEFAULT_PLOT_STROKE'];
				}
				this.resources = json.xml.game.resources;
				this.setup = json.xml.game.setup;
				this.strongholdinfos = json.xml.game.strongholdinfos;
				this.turns = json.xml.game.turns;
		}
	}*/

    createEmergency(locationID,emergency,level){
    	this.areas[locationID].emergencies[emergency] =  level;
    	//this.hazard.updateEmergenciesTooltip(locationID,this.area[locationID].emergencies,level)
    }

    eliminateEmergency(locationID,area) {
    	this.areas[locationID].emergencies[emergency] = -1;
    	this.hazard.updateEmergenciesTooltip(locationID,this.area[locationID].emergencies)
    }

    modificateEmergency(locationID,emergency,level){
    	this.areas[locationID].emergencies[emergency] = level;
    	this.hazard.updateEmergenciesTooltip(locationID,this.area[locationID].emergencies)
    }


	handleState(data) {

	    var diff = this.gameState.setState(data);
	    if(diff.length == 0) return;

	    var status = data.gameState.currentState;
	    var success = data.success;
	    var logString = data.logString;

	    for (var i = 0; i < diff.length; i++) {
	        if (diff['currentState'] == 'GAME_ACTIVE') {

	        } else if (diff['currentState'] == 'GAME_VICTORY') {
	            /* Conclude il gioco con la vittoria dei giocatori */
	            this.gameVictory();
	            this.hazard.addLog("DANGER", logString);
	        } else if (diff['currentState'] == 'GAME_LOSS'){
	            this.gameOver(); 
	            this.hazard.addLog("DANGER", logString);
	        }
	        if (diff['locations']) {
	            var loc = diff['locations'];
	            for (var j = 0; j < loc.length; j++) {
	                for (var k = 0; k < loc[j].emergencyLevels.length; k++) {
	                    if (loc[j].emergencyLevels[k].level == 1) {
	                        /*Crea una nuova malattia nella nazione tramite createEmergency(LOCATIONID,NOMEEMERGENZA,LIVELLOEMERGENZA) */
	                        this.createEmergency(loc[j].locationID, loc[j].emergencyLevels[k].emergency, loc[j].emergencyLevels[k].level);
	                        this.hazard.addLog("INFO", logString);
	                    } else if (loc[j].emergencyLevels[k].level == 0) {
	                        /*La malattia è stata curata, quindi va eliminata dalla mappa tramite eliminateEmergency(LOCATIONID,NOMEEMERGENZA) */
	                        this.eliminateEmergency(loc[j].locationID, loc[j].emergencyLevels[k].emergency);
	                        this.hazard.addLog("INFO", logString);
	                    } else {
	                        /*Il livello malattia è stato modificato tramite modificateEmergencyLevel(LOCATIONID,NOMEEMERGENZA,LIVELLOEMERGENZA) */
	                        this.modificateEmergencyLevel(loc[j].locationID, loc[j].emergencyLevels[k].emergency, loc[j].emergencyLevels[k].level);
	                        this.hazard.addLog("INFO", logString);
	                    }
	                }
	            }
	        }

	        if (diff['pawns']) {
	            var pawns = diff['pawns'];
	            for (var j = 0; j < pawns.length; j++) {
	                /* Muove la pedina tramite movePawns(IDPEDINA,LOCAZIONESUCCESSIVA) */
	                movePawns(pawns[j].pawnID, pawns[j].location);
	                this.hazard.addLog("INFO", logString);
	            }
	        }

	        if (diff['blockades']) {}
	        if (diff['emergencies']) {}
	        if (diff['maxEmergencyLevel']) {}
	        if (diff['numOfProductionCards']) {}

	        if (diff['type'] == 'ActionTurn') {
	            /*COMUNICA CHE INIZIA IL TURNO AZIONE*/
	            let l = lang['currentlyPlaying'] + lang['actionGroup'];
	            this.hazard.addLog("INFO", logString);
	            updateTurn(lang['actionGroup']);

	        } else if (diff['type'] == 'EmergencyTurn') {
	            /*COMUNICA CHE INIZIA IL TURNO EMERGENZA*/
	            let l = lang['currentlyPlaying'] + lang['emergencyGroup'];
	            this.hazard.addLog("INFO", l);
	            updateTurn(lang['emergencyGroup']);

	        } else if (diff['type'] == 'EventTurn') {
	            /*COMUNICA CHE INIZIA IL TURNO EVENTI*/
	            let l = lang['currentlyPlaying'] + lang['eventGroup'];
	            this.hazard.addLog("INFO", l);
	            updateTurn(lang['eventGroup']);

	        } else if (diff['type'] == 'ProductionGroup') {
	            /*COMUNICA CHE INIZIA IL TURNO PRODUZIONE*/
	            let l = lang['currentlyPlaying'] + lang['productionGroup'];
	            this.hazard.addLog("INFO", l);
	            updateTurn(lang['productionGroup']);
	        }
	        if (diff['group']) {
	            var group = diff['group'];
	            for (var j = 0; j < group.resources; j++) {
	                /* Cambia le risorse presenti nella schermata del giocatore  tramite changeResources(risorsa,numero)*/
	                this.hazard.changeResources(group.resources[j].resource, group.resources[j].quantity);
	                this.hazard.addLog("INFO", logString);
	            }
	        }
	        /* Se non è stato possibile compiere l'azione, verrà visualizzato un messaggio di errore */
	        if (data.success == false) {
	            this.hazard.addLog("DANGER", logString);
	        }

	    }

	}

}

var main = new HazardDashboard();

module.exports = main;







