//Singleton
var Game = new function(){	
	var _this = this;
	_this.victoryMessage;
	_this.lossMessage;
	_this.resources = new Array();

	_this.parse = function(xml){
		//JQuery XML Parser @ https://api.jquery.com/jQuery.parseXML/
		_this.configxml = $.parseXML(xml);
		$xml = $(_this.configxml);
		
		$xml.find('resources').find('name').each(function(e){
			_this.resources.push(new Resource($(this).text()));
		});
		
		//Assign objects & variables
		_this.victoryMessage = $xml.find("victoryMessage").text();
		_this.lossMessage = $xml.find("lossMessage").text();
	}
	
}

//Instantiable
function Group(name,type) {

}

function Resource(name){
	this.name = name;
}

