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
			content_text += '<span style=\"font-weight:bold;\">'+key+' :</span> '+vars[key]+'<br />';
		}
		var tooltip = {content: content_text}
		return tooltip;
	}
}

module.exports = Utils;