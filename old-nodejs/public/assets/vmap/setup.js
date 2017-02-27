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
			attrs : {
				 fill: "#FFFF00"
			},
		},
		"Asia2": {
			attrs : {
				 fill: "#E4D82C"
			},
		},
		"Asia3": {
			attrs : {
				 fill: "#DFD055"
			},
		},		
		"Asia4": {
			attrs : {
				 fill: "#FCF463"
			},
		},		
		"Asia5": {
			attrs : {
				 fill: "#F6F62F"
			},
		},		
		"Asia6": {
			attrs : {
				 fill: "#FCC95F"
			},
		},		
		"Asia7": {
			attrs : {
				 fill: "#909300"
			},
		},		
		"Oce1": { //Australia
			attrs : {
				 fill: "#69B628"
			},
		},		
		"Oce2": { //Nuova Zelanda
			attrs : {
				 fill: "#9DDE67"
			},
		},		
		"Africa1": { //Nord Africa
			attrs : {
				 fill: "#444444"
			},
		},
		"Africa2": { //Africa Centrale
			attrs : {
				 fill: "#000"
			},
		},		
		"Africa3": { //Sud Centrale
			attrs : {
				 fill: "#828282"
			},
		},
		"Africa4": { //Madagascar
			attrs : {
				 fill: "#CCCCCC"
			},
		},		
		"Eu1": { //Eu Ovest
			attrs : {
				 fill: "#6699FF" 
			},
            tooltip: {content: "<span style=\"font-weight:bold;\">Livello Infezione:</span>50%"}
		},		
		"Eu2": { //Eu Est
			attrs : {
				 fill: "#00C0F8"
			},
		},		
		"Eu3": { //Scandinavia
			attrs : {
				 fill: "#000080"
			},
		},		
		"Eu4": { //UK
			attrs : {
				 fill: "#0074E4"
			},
		},		
		"Eu5": { //Islanda
			attrs : {
				 fill: "#54D8FC"
			},
		},		
		"America1": { //Groenlandia
			attrs : {
				 fill: "#FC0044"
			},
		},		
		"America2": { //Canada
			attrs : {
				 fill: "#900808"
			},
		},		
		"America3": { //USA
			attrs : {
				 fill: "#FF0000"
			},
		},		
		"America4": { //America Centrale
			attrs : {
				 fill: "#CC0000"
			},
		},		
		"America5": { //Sud America Colombia,Bolive ecc
			attrs : {
				 fill: "#E2004F"
			},
		},		
		"America6": { //Sud America Brasile
			attrs : {
				 fill: "#FF525F"
			},
		},		
		"America7": { //Sud America Argentina,Uruguay, ...
			attrs : {
				 fill: "#C61800"
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
				'text' : 'x';
			}
		}
	}
});