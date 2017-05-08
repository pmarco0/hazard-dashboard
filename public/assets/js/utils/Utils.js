var l = require('../lang/Lang.js');
var config = require('../Config.js');
var lang = l[config['LANGUAGE']];

/**
 * Funzioni di supporto alla dashboard
 */

class Utils {
	/**
	 * Crea il tag contenente il testo da visualizzare in un tooltip sulla mappa
	 * @param  {String} name [Nome della zona per la quale si sta creando il tooltip]
	 * @param  {String []} vars [Array delle risorse, la chiave contiene il nome della risorsa e il campo contiene la quantità]
	 * @return NA
	 */
	__buildTooltip(name,vars){
		var content_text = '<span style=\"font-weight:bold;\">'+lang['zone']+'</span>' + name+'<br/>';

		for(var key in vars){
			if(vars[key] == -1) continue;
			var i = this.getIndexByValue(vars[key]);
			content_text += '<span style=\"font-weight:bold;\">'+key+' :</span><div style="width:1px;height:1px;border-radius:50%;background-color:'+config['LEGEND'][i].color+'"></div><br />';
		}
		//var tooltip = {content: content_text}
		return content_text;
	}

	/**
	 * Restituisce l'indice contenente la configurazione da considerare a partire dal dato livello dell'emergenza
	 * @param  {Number} value [Valore gravità dell'emergenza]
	 * @return {Number}       [Indice da utilizzare in config['LEGEND']]
	 */
	getIndexByValue(value){

		if(typeof(value) != 'number'){
			value = parseInt(value);
		}

		for(var i=0;i<config['LEGEND'].length;i++){
			if(value.inRange(
				this.getValues(config['LEGEND'][i].value,true)[0],
				this.getValues(config['LEGEND'][i].value,true)[1]))
			{
				return i;
			}
		}
		throw new Error(`
			Cant find correct index with value: ${value}
			Last index: ${i}
			First parameter for inRange: ${this.getValues(config['LEGEND'][i].value,true)[0]}
			Second parameter for inRange: ${this.getValues(config['LEGEND'][i].value,true)[1]}
			`);
	}

	/**
	 * Restituisce un array contenente i valori minimi e massimi di contagio per un determinato livello
	 * @param  {String} value [Stringa del tipo '1,2' nel formato 'ValoreMinimo,ValoreMassimo']
	 * @param  {Boolean} [numeric] [Se vero, l'array di Stringhe è convertito in array di Numeri]
	 * @return {Array}       [Array contenente i due valori min e max]
	 */
	getValues(value,numeric = false){
		let v = value.split(',');
		if(numeric){
			for(var i = 0;i<v.length;i++){
				v[i] = parseInt(v[i]);
			}
		}
		return v;
	}

	/**
	 * Crea l'identificatore univoco di un link a partire dagli identificatori delle aree collegate
	 * @param  {String} a [Identificatore univoco della prima area]
	 * @param  {String} b [Identificatore univoco della seconda area]
	 * @return {String}   [Identificatore univoco del link tra `a` e `b`, posizionati in ordine alfabetico e separati da `-`, Es: `canada-usa`]
	 */
	getLinkIdentifier(a,b){
		var link = (a < b) ? a+'-'+b : b+'-'+a;
		return link;
	}

	/**
	 * Ottiene gli identificatori dei plot che compongono gli estremi di un link a partire dall'identificatore univoco del link
	 * @param  {String} link [Identificatore univoco di un link]
	 * @return {String[]}      [Array contenente gli identificatori dei due plot che compongono il link]
	 */
	getPlotsByLink(link){
		return [link.split('-')[0]+'-plot',link.split('-')[1]+'-plot'];
	}

}

module.exports = Utils;


