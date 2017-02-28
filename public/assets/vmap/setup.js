var defaultSize = 3; //Dimensione indicatore città
var plotType = "rounded"; //Tipo indicatore città
var defaultStroke = 1; //Spessore linea di collegamento
var defaultFactor = -0.15; //Curvatura linea di collegamento [- verso l'alto, + verso il basso]


$(".map-container").mapael({
		map: {
			name: "hazard_map",
			defaultArea : {
				attrs: {
					stroke: "#7C7C7C",
					"stroke-width": 0.2
				}
			}
		},
	//QUI DEFINISCO I COLORI DELLE AREE
	areas : {
		"Asia1": {
			
			value:1,
			attrs : {
				 fill: "#FFFF00"
			},
		},
		"Asia2": {
			
			value:1,
			attrs : {
				 fill: "#E4D82C"
			},
		},
		"Asia3": {

			value:1,
			attrs : {
				 fill: "#DFD055"
			},
		},		
		"Asia4": {
			value:1,
			attrs : {
				 fill: "#FCF463"
			},
		},		
		"Asia5": {
			value:1,
			attrs : {
				 fill: "#F6F62F"
			},
		},		
		"Asia6": {
			value:1,
			attrs : {
				 fill: "#FCC95F"
			},
		},		
		"Asia7": {
			value:1,
			attrs : {
				 fill: "#909300"
			},
		},		
		"Oce1": { //Australia
			value:1,
			attrs : {
				 fill: "#69B628"
			},
		},		
		"Oce2": { //Nuova Zelanda
			value:1,
			attrs : {
				 fill: "#9DDE67"
			},
		},		
		"Africa1": { //Nord Africa
			value:1,
			attrs : {
				 fill: "#444444"
			},
		},
		"Africa2": { //Africa Centrale
			value:1,
			attrs : {
				 fill: "#000"
			},
		},		
		"Africa3": { //Sud Centrale
			value:1,
			attrs : {
				 fill: "#828282"
			},
		},
		"Africa4": { //Madagascar
			value:1,
			attrs : {
				 fill: "#CCCCCC"
			},
		},		
		"Eu1": { //Eu Ovest
			value:1,
			attrs : {
				 fill: "#6699FF" 
			},
            tooltip: {content: "<span style=\"font-weight:bold;\">Livello Infezione:</span>50%"}
		},		
		"Eu2": { //Eu Est
			value:1,
			attrs : {
				 fill: "#00C0F8"
			},
		},		
		"Eu3": { //Scandinavia
			value:1,
			attrs : {
				 fill: "#000080"
			},
		},		
		"Eu4": { //UK
			value:1,
			attrs : {
				 fill: "#0074E4"
			},
		},		
		"Eu5": { //Islanda
			value:1,
			attrs : {
				 fill: "#54D8FC"
			},
		},		
		"America1": { //Groenlandia
			value:5,
			attrs : {
				 fill: "#FC0044"
			},
		},		
		"America2": { //Canada
			value:1,
			attrs : {
				 fill: "#900808"
			},
		},		
		"America3": { //USA
			value:1,
			attrs : {
				 fill: "#FF0000"
			},
		},		
		"America4": { //America Centrale
			value:1,
			attrs : {
				 fill: "#CC0000"
			},
		},		
		"America5": { //Sud America Colombia,Bolive ecc
			value:1,
			attrs : {
				 fill: "#E2004F"
			},
		},		
		"America6": { //Sud America Brasile
			value:1,
			attrs : {
				 fill: "#FF525F"
			},
		},		
		"America7": { //Sud America Argentina,Uruguay, ...
			value:1,
			attrs : {
				 fill: "#C61800"
			},
		},

	},
	legend : {
		area: {
			display: false,
			slices: [
	            {
	                max: 1,
	                attrs: {
	                    fill: "#6ECBD4"
	                },
	                label: "Less than 5M"
	            },
	            {
	                min: 2,
	                max: 3,
	                attrs: {
	                    fill: "#3EC7D4"
	                },
	                label: "Between 5M and 10M"
	            },
	            {
	                min: 4,
	                max: 5,
	                attrs: {
	                    fill: "#028E9B"
	                },
	                label: "Between 10M and 50M"
	            },
	            {
	                min: 6,
	                attrs: {
	                    fill: "#01565E"
	                },
	                label: "More than 50M"
	            }
			]
		}
	},
	//QUI DEFINISCO LE CITTA'
	/*plots :{
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
			value:1,
			attrs : {
				'stroke-width': defaultStroke
				'text' : 'x';
			}
		}
	}*/
});