"use strict";

/*var defaultSize = 3; //Dimensione indicatore città
var plotType = "rounded"; //Tipo indicatore città
var defaultStroke = 1; //Spessore linea di collegamento
var defaultFactor = -0.15; //Curvatura linea di collegamento [- verso l'alto, + verso il basso]
*/

module.exports = {
	//Gioco
	'MAX_LEVEL' : 9,
	'LANGUAGE' : 'it', //ISO 639-2 https://www.loc.gov/standards/iso639-2/php/code_list.php

	//Mappa - Area
	'DEFAULT_AREA_STROKE' : "#7C7C7C", //Colore confini
	'DEFAULT_AREA_STROKE_WIDTH' : 0.2, //Spessore confini

	//Mappa - Plot
	'DEFAULT_PLOT_SIZE' : 3, //Dimensione indicatore città
	'DEFAULT_PLOT_TYPE' : "rounded", //Tipo indicatore città
	'DEFAULT_PLOT_STROKE' : 1,//Spessore linea di collegamento
	'DEFAULT_PLOT_FACTOR' : -0.15,//Curvatura linea di collegamento [- verso l'alto, + verso il basso]
	'DEFAULT_PLOT_ICON' : './assets/img/icon.png',
	'DEFAULT_PLOT_ICON_WIDTH' : 8,
	'DEFAULT_PLOT_ICON_HEIGHT' : 8,

	//Modal
	'MODAL_ID' : '#myModal',
	'MODAL_TITLE_ID' : '#modal-message-title',
	'MODAL_TEXT_ID' : '#modal-message-text',
	'MODAL_BUTTONS_ID' : '#modal-buttons',
	'MODAL_CLASS' : 'modal-primary',

	//IDs
	'PROGRESS_BAR_ID' : '#progressinf',
	'PROGRESS_BALLS_ID' : '#progress',
	'LOG_AREA_ID' : '#log-area',
	'MAP_CONTAINER': '.map-container',
	'TURN_LOCATION' : '#turnTitle',

	//Altro
	'PROGRESS_BALLS_STEP' : 1,
}