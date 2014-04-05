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
		//aggregateByCountry("CANADA")
		aggregateBySectorAndStatus("Retail", "Denied")
	}
)

function aggregateByCountry(country){
	//function that organize selected country's visas by sector, then status
	var visasTargetCountry=[]
	for(visa in visas){
		if (visas[visa]["Origin Country"] == country){
			visasTargetCountry.push(visas[visa])
		}
		var countryTotal = visasTargetCountry.length;
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
	for (visa in visasTargetCountry){
		//console.log(visasByCountry[visa]["Economic Sector"])
		var currentSector = visasTargetCountry[visa]["Economic Sector"];
		var currentStatus = visasTargetCountry[visa]["Status"];
		if(countryBySector[currentSector][currentStatus]==undefined){
			countryBySector[currentSector][currentStatus]=[]
			countryBySector[currentSector][currentStatus].push(visasTargetCountry[visa])
		}else{
			countryBySector[currentSector][currentStatus].push(visasTargetCountry[visa])
		}
	}
	console.log(countryBySector)
}

function aggregateBySectorAndStatus(Sector, Status){
	//function that organizes selected sector and status by country
	console.log("sector status")
	var visasTargetSectorStatus = []
	for (visa in visas){		
		if (visas[visa]["Economic Sector"] == Sector && visas[visa]["Status"]== Status){
			visasTargetSectorStatus.push(visas[visa])
		}
	}
	console.log("hightlighted visas: ", visasTargetSectorStatus)
	var visasBySectorStatus = []
	for (visa in visasTargetSectorStatus){	
		var currentCountry = visasTargetSectorStatus[visa]["Origin Country"];

		if(visasBySectorStatus[currentCountry]==undefined){
			visasBySectorStatus[currentCountry]=[]
			visasBySectorStatus[currentCountry].push(visasTargetSectorStatus[visa])
		}
		else{
			visasBySectorStatus[currentCountry].push(visasTargetSectorStatus[visa])
		}
	}
	console.log(visasBySectorStatus["Origin Country"])
	
	console.log(visasBySectorStatus)
}

function drawBarGraph(){

	};


function drawMap() {
	console.log("map")
}

drawMap();
drawBarGraph();