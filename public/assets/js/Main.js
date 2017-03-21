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
		this.hazard = new Dashboard();
		var self = this;
		var socket = io.connect();

		socket.on('setProgress', function(data) {
			self.hazard.setProgress(data.value);
		});

		socket.on('increaseLevel', function(data) {
			self.hazard.setLevel(config['PROGRESS_BALL_STEP']);
		});

		socket.on('decreaseLevel', function(data) {
			self.hazard.setLevel(-config['PROGRESS_BALL_STEP']);
		});

		socket.on('chat', function(data){
			self.hazard.addLog(data.type,data.message);
		});

		socket.on('gamestart', function(data){
			self.gameStart();
		});

		socket.on('gameover', function(data){
			self.gameOver();
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


}

var main = new HazardDashboard();

module.exports = main;







