
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
			var cCount = 0
		}else{ 
			cCount = bySector[sector]["Certified"].length
		}
		if(bySector[sector]["Withdrawn"]== null){
			var wCount = 0
		}else{ 
			wCount = bySector[sector]["Withdrawn"].length
		}
		if(bySector[sector]["Denied"]== null){
			var dCount = 0
		}else{ 
			dCount = bySector[sector]["Denied"].length
		}
		sectorStats.push([sector, cCount,wCount,dCount])

	}
	
	console.log(sectorStats)
	var w = 400;
	var h = 600;
	
	var svg = d3.select("body")
		.append("svg:svg")
		.attr("width", w)
		.attr("height", h)
		.append("svg:g")
		.attr("transform", "translate(0,500)");
//	console.log("draw bar")
	p = [20, 50, 30, 20],
    x = d3.scale.ordinal().rangeRoundBands([0, w - p[1] - p[3]]),
    y = d3.scale.linear().range([0, h-50]),
    z = d3.scale.ordinal().range(["lightpink", "darkgray", "lightblue"])
		
	var remapped = ["c", "w", "d"].map(function(dat,i){
		return sectorStats.map(function(d, ii){
			return {x:ii, y: d[i+1]}
		})
	})
	console.log("mapped: ",remapped)
	
	var stacked = d3.layout.stack()(remapped)
	console.log("stacked: ", stacked)
	
	x.domain(stacked[0].map(function(d) { return d.x; }));
	y.domain([0, d3.max(stacked[stacked.length - 1], function(d) { return d.y0 + d.y; })]);
	console.log("x.domain(): " + x.domain())
	console.log("y.domain(): " + y.domain())
           
	var valgroup = svg.selectAll("g.valgroup")
	            .data(stacked)
	            .enter().append("svg:g")
	            .attr("class", "valgroup")
	            .style("fill", function(d, i) { return z(i); })
	            .style("stroke", function(d, i) { return d3.rgb(z(i)).darker(); });
				
	var rect = valgroup.selectAll("rect")
	            .data(function(d){return d;})
	            .enter().append("svg:rect")
	            .attr("x", function(d) { return x(d.x); })
	            .attr("y", function(d) { return -y(d.y0) - y(d.y); })
	            .attr("height", function(d) { return y(d.y); })
	            .attr("width", x.rangeBand());
};


function drawMap() {
	//console.log("drawMap function")
}

drawMap();
