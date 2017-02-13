var defaultSize = 3; //Dimensione indicatore città
var plotType = "rounded"; //Tipo indicatore città
var defaultStroke = 1; //Spessore linea di collegamento
var defaultFactor = -0.15; //Curvatura linea di collegamento [- verso l'alto, + verso il basso]


$(".map-container").mapael({
		map: {
			name: "world_countries_miller",
			defaultArea : {
				attrs: {
					stroke: "#fff",
					"stroke-width": 0.5
				}
			}
		},
	//QUI DEFINISCO I COLORI DELLE AREE
	areas : {
		"US": {
			attrs : {
				 fill: "#C01D2E"
			},
		},
	},
	
	//QUI DEFINISCO LE CITTA'
	plots :{
		'paris': {
			type : plotType,
			size : defaultSize,
			latitude: 48.5124,
			longitude: 2.2107,
			tooltip: {content: "<span style=\"font-weight:bold;\">City :</span> Paris <br />"},
			text : 'Paris'
		},
		'newyork': {
			type : plotType,
			size : defaultSize,
			latitude: 40.43,
			longitude: -74.00,
			tooltip: {content: "<span style=\"font-weight:bold;\">City :</span> New York<br />"},
			text : 'New York'
		}
	},
	
	links  : {
		'link1' : {
			factor : defaultFactor,
			between : ['paris','newyork'],
			attrs : {
				'stroke-width': defaultStroke
			}
		}
	}
});