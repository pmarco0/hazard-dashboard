var l = require('../lang/Lang.js');
var config = require('../Config.js');
var lang = l[config['LANGUAGE']];

/**
 * Finestra modale
 */
class ModalDialog {
	constructor(){
		this.visible = false;
	}

	/**
	 * Imposto il modal
	 * @param  {String} modalClass [Classe del modal], Ref: https://www.w3schools.com/bootstrap/bootstrap_modal.asp
	 * @return NA
	 */
	setup(modalClass = config['MODAL_CLASS']) {
		$(config['MODAL_BUTTONS_ID']).empty();
		$(config['MODAL_BUTTONS_ID']).append('<button type="button" id="start-game-button" disabled=true class="btn btn-default" data-dismiss="modal"><i class="fa fa-spinner fa-spin fa-2x"></i></button>');
		$(config['MODAL_ID']).removeClass();
		$(config['MODAL_ID']).addClass('modal fade '+modalClass);
	}

	/**
	 * Imposto intestazione del modal
	 * @param {String} title [Testo di intestazione]
	 */
	setTitle(title) {
		$(config['MODAL_TITLE_ID']).html(title)
	}

	/**
	 * Imposto il contenuto del modal (Testo)
	 *
	 */
	setContent(content){
		$(config['MODAL_TEXT_ID']).html(content);
	}

	/**
	 * Imposto il contenuto del modal (Carte)
	 * @param {Object} cards [Oggetto contenente le carte]
	 */
	setContentCards(cards){
		/*
			var html;
			html = <div>
			for(carte){
				html += '<img src="link da carte' id="nome-carta"+i/>';
			}
			html = </div>

			$(config['MODA_TEXT_ID']).append(html);
		*/
	}

	/**
	 * Seleziono la carta scelta
	 * @param {int} id [Carta selezionata]
	 */
	 selectCard(id){
	 	/*
			$('#nome-carta').anima();
	 	*/
	 }

	show() {
		$(config['MODAL_ID']).modal("show");
		this.visible = true;
	}

	hide() {
		$(config['MODAL_ID']).modal("hide");
		this.visible = false;
	}

	isVisible(){
		return this.visible;
	}
}

module.exports = ModalDialog;