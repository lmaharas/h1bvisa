/**
 * Created by hen on 3/8/14.
 */
d3.csv("/reduced_data/h1b_newyork.csv", function(data)
	{
		visas = [];
	//	console.log(data);
		for(visa in data){
			visas.push(data[visa])
		}
	//	console.log(visas)
		aggregateApplicationsByCountry("CANADA")
	}
)

function aggregateApplicationsByCountry(country){
	var visasByCountry=[]
	for(visa in visas){
		if (visas[visa]["Origin Country"] == country){
			visasByCountry.push(visas[visa])
		}
		var countryTotal = visasByCountry.length;
	}
	//console.log(visasByCountry)
	
	var countryBySector = 
		{
		    "IT":[],
		    "Other Economic Sector":[],
		    "Advanced Mfg":[],
		    "Educational Services":[],
		    "Finance":[],
		    "Health Care":[],
			"undefined":[],
		    "Aerospace":[],
		    "Retail":[],
		    "Hospitality":[],
		    "Construction":[],
		    "Energy":[],
		    "Automotive":[],
		    "Transportation":[],
		    "Agribusiness":[],
		    "Biotechnology":[],
		    "Geospatial":[],
		    "Homeland Security":[]
		}
	for (visa in visasByCountry){
		//console.log(visasByCountry[visa]["Economic Sector"])
		var currentSector = visasByCountry[visa]["Economic Sector"];
		var currentStatus = visasByCountry[visa]["Status"];
		if(countryBySector[currentSector][currentStatus]==undefined){
			console.log("undefined")
			countryBySector[currentSector][currentStatus]=[]
			countryBySector[currentSector][currentStatus].push(visasByCountry[visa])
		}else{
			countryBySector[currentSector][currentStatus].push(visasByCountry[visa])
		}
	}
	console.log(countryBySector)
}

function drawBarGraph(){

	};


function drawMap() {
	console.log("map")
}

drawMap();
drawBarGraph();