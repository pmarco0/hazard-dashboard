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
			var i = this.getMinMaxByValue(vars[key]);
			content_text += '<span style=\"font-weight:bold;\">'+key+' :</span><div style="width:1px;height:1px;background-color:'+config['LEGEND_COLOR'][i]+'"></div><br />';
		}
		//var tooltip = {content: content_text}
		return content_text;
	}

	getMinMaxByValue(value){

		if(typeof(value) != 'number'){
			value = parseInt(value);
		}

		for(var i=0;i<config['LEGEND'];i++){
			if(value.inRange(this.getValues(config['LEGEND'][0]),this.getValues(config['LEGEND'][1]))) return i;
		}
	}

	getValues(value){
		return value.split(',');
	}



}

module.exports = Utils;


