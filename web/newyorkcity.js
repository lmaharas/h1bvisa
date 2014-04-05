
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
	console.log(visasBySectorStatus)
}


function aggregatebySectorThenStatus(){
	//function that organizes by each sector and then by each status
	//format: sector, # certified, # withdrawn, # denied
	var bySector = 
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
	for (visa in visas){
		//console.log(visasByCountry[visa]["Economic Sector"])
		var currentSector = visas[visa]["Economic Sector"];
		var currentStatus = visas[visa]["Status"];
		if(bySector[currentSector][currentStatus]==undefined){
			bySector[currentSector][currentStatus]=[]
			bySector[currentSector][currentStatus].push(visas[visa])
		}else{
			bySector[currentSector][currentStatus].push(visas[visa])
		}
	}
	console.log(bySector)
	return(bySector)
	
}

d3.csv("/reduced_data/h1b_newyork.csv", function(data)
	{
		visas = [];
	//	console.log(data);
		for(visa in data){
			visas.push(data[visa]);
		}
		//aggregateByCountry("CANADA")
		//aggregateBySectorAndStatus("Retail", "Denied")
		//aggregatebySectorThenStatus();
		drawBarGraph(data)
	}
)

function drawBarGraph(dataset){
	var bySector = 
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
	for (visa in dataset){
		//console.log(visasByCountry[visa]["Economic Sector"])
		var currentSector = visas[visa]["Economic Sector"];
		var currentStatus = visas[visa]["Status"];
		if(bySector[currentSector][currentStatus]==undefined){
			bySector[currentSector][currentStatus]=[]
			bySector[currentSector][currentStatus].push(visas[visa])
		}else{
			bySector[currentSector][currentStatus].push(visas[visa])
		}
	}	
//	console.log(bySector)
	var sectorStats = []
	for (sector in bySector){
//		console.log(bySector[sector])
		if(bySector[sector]["Certified"]== null){
			var cSize = 0
		}else{ 
			cSize = bySector[sector]["Certified"].length
		}
		if(bySector[sector]["Withdrawn"]== null){
			var wSize = 0
		}else{ 
			wSize = bySector[sector]["Withdrawn"].length
		}
		if(bySector[sector]["Denied"]== null){
			var dSize = 0
		}else{ 
			dSize = bySector[sector]["Denied"].length
		}

		sectorStats[sector]=[]
		sectorStats[sector].push(cSize)
		sectorStats[sector].push(wSize)
		sectorStats[sector].push(dSize)
	}
	
	console.log(sectorStats)
	var w = 400;
	var h = 600;
//	console.log("draw bar")
	var svg = d3.select("body")
		.append("svg:svg")
		.attr("width", w)
		.attr("height", h);
	svg.selectAll("rect")
		.data(sectorStats["IT"])
		.enter()
		.append("rect")
		.attr("x", function(d,i){return i*20})
		.attr("y", 0)
		.attr("width", 20)
		.attr("height", function(d,i){
			return d/2
		})
		.attr("fill", function(d,i){d3.rgb(i*30,0,0)});
};


function drawMap() {
	//console.log("drawMap function")
}

drawMap();
