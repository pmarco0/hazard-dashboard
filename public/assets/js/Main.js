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
var ParserXML = require('./utils/ParserXML.js');
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

		this.hazard = new Dashboard();
		this.gameState = GameState;
		var self = this;
		var socket = io.connect();


        socket.on('update',function(data){
			self.handleState(data);
		});

        socket.on('popupMessage',function(data){
		
		});

        socket.on('closePopup',function(data){
		
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

	}

	/**
	 * Avvia il gioco eliminando la finestra modal
	 * @return NA
	 */
	gameStart(){
		this.hazard.hideModal(3000);
		this.hazard.updateTurn();
		this.hazard.addLog('INFO',lang['gamestartstext']);
		this.hazard.test();
	}

	/**
	 * Avvisa che la partita è conclusa con un modal
	 * @return NA
	 */
	gameOver(){
		this.hazard.addLog('DANGER',lang['gameover']);
		this.hazard.showModal(lang['gameover'],lang['gameovertext'],'modal-danger');
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
	                        createEmergency(loc[j].locationID, loc[j].emergencyLevels[k].emergency, loc[j].emergencyLevels[k].level);
	                        this.hazard.addLog("INFO", logString);
	                    } else if (loc[j].emergencyLevels[k].level == 0) {
	                        /*La malattia è stata curata, quindi va eliminata dalla mappa tramite eliminateEmergency(LOCATIONID,NOMEEMERGENZA) */
	                        eliminateEmergency(loc[j].locationID, loc[j].emergencyLevels[k].emergency);
	                        this.hazard.addLog("INFO", logString);
	                    } else {
	                        /*Il livello malattia è stato modificato tramite modificateEmergencyLevel(LOCATIONID,NOMEEMERGENZA,LIVELLOEMERGENZA) */
	                        modificateEmergencyLevel(loc[j].locationID, loc[j].emergencyLevels[k].emergency, loc[j].emergencyLevels[k].level);
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


	/**
	* Richiama il parser XML, inizializza la configurazione e la classe delle aree
	*/
	parseXML(file){
		// Parsing
		// Popola config
		// es. config['MAX_LEVEL'] = ... quello che trovi dal file XML
		// var parser = new ParserXML(file);
	}
}

var main = new HazardDashboard();

module.exports = main;







