var visas = [];
d3.csv("reduced_data/h1b_newyork.csv", function(data)
	{
	//	console.log(data);
		for(visa in data){
			visas.push(data[visa]);
		}
		//aggregateByCountry("CANADA")
		//aggregateBySectorAndStatus("Retail", "Denied")
		//aggregatebySectorThenStatus();
		drawBarGraph(data)
		//console.log(visas)
		aggregateByCountryAll();
		d3.selectAll('#barHighlight').html("Distribution of Applications for All Countries")
		d3.selectAll('#countryLabel').html("Distribution of Applications for All Sectors")
		
		return visas
	}
)
function aggregateByCountryAll(){
	var visasByCountryAll=[]
	var countryCountAll = []
	for(visa in visas){
		var currentCountry = visas[visa]["Origin Country"]
		if (visasByCountryAll[currentCountry] == undefined){
			visasByCountryAll[currentCountry] = []
			visasByCountryAll[currentCountry].push(currentCountry)
		}else{
			visasByCountryAll[currentCountry].push(currentCountry)
		}
	}
	for(country in visasByCountryAll){
		var countryCount = visasByCountryAll[country].length
		countryCountAll.push([country, countryCount])
	}
	redrawMap(countryCountAll, "#665D50");
	return countryCountAll
}



function aggregateBySectorAndStatus(Sector, Status){
	//function that organizes selected sector and status by country
	//console.log("sector/status")
	var visasTargetSectorStatus = []
	for (visa in visas){		
		if (visas[visa]["Economic Sector"] == Sector && visas[visa]["Status"]== Status){
			visasTargetSectorStatus.push(visas[visa])
		}
	}
	//console.log("hightlighted visas: ", visasTargetSectorStatus)
	var visasBySectorStatus = {}
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
	countryCount = []
	for (visa in visasBySectorStatus){
		var currentCountrySize= visasBySectorStatus[visa].length
		countryCount.push([visa,currentCountrySize])
		//console.log(countryCount)
	}
	return countryCount
//	console.log(visasBySectorStatus)
	return countryCount
}
function aggregateBySectorAndStatusText(Sector, Status){
	//function that organizes selected sector and status by country
//	console.log("sector/status")
	var visasTargetSectorStatus = []
	for (visa in visas){		
		if (visas[visa]["Economic Sector"] == Sector && visas[visa]["Status"]== Status){
			visasTargetSectorStatus.push(visas[visa])
		}
	}
//	console.log("hightlighted visas: ", visasTargetSectorStatus)
	var visasBySectorStatus = {}
	var uniqueJobTitle = []
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
	
	for (visa in visasTargetSectorStatus){
		var currentTitle = visasTargetSectorStatus[visa]["Job Title"];
		if(uniqueJobTitle.indexOf(currentTitle) > -1){
		}
		else{
			uniqueJobTitle.push(currentTitle)
		}
	}
	return String(uniqueJobTitle)
}

var countryCount = []

function aggregateBySector(Sector){
	//function that organizes selected sector and status by country and returns country
	//console.log("sector")
	var visasTargetSector = []
	for (visa in visas){		
		if (visas[visa]["Economic Sector"] == Sector){
			visasTargetSector.push(visas[visa])
		}
	}
	//console.log("hightlighted visas: ", visasTargetSector)
	var visasBySector = {}
	for (visa in visasTargetSector){	
		var currentCountry = visasTargetSector[visa]["Origin Country"];
		if(visasBySector[currentCountry]==undefined){
			visasBySector[currentCountry]=[]
			visasBySector[currentCountry].push(visasTargetSector[visa])
		}
		else{
			visasBySector[currentCountry].push(visasTargetSector[visa])
		}
	}
	//console.log(visasBySector["Origin Country"])
	//count by country
	countryCount = []
	for (visa in visasBySector){
		var currentCountrySize= visasBySector[visa].length
		countryCount.push([visa,currentCountrySize])
		//console.log(countryCount)
	}
	return countryCount
}


function generateAggregatedText(Sector){
	//function that outputs job title and company for bargraph selections
	//console.log("sector")
	var visasTargetSector = []
	for (visa in visas){		
		if (visas[visa]["Economic Sector"] == Sector){
			visasTargetSector.push(visas[visa])
		}
	}
	var visasBySector = {}
	for (visa in visasTargetSector){	
		var currentCountry = visasTargetSector[visa]["Origin Country"];
		if(visasBySector[currentCountry]==undefined){
			visasBySector[currentCountry]=[]
			visasBySector[currentCountry].push(visasTargetSector[visa])
		}
		else{
			visasBySector[currentCountry].push(visasTargetSector[visa])
		}
	}
	var sectorByTitle = []
	var sectorByCompany = []
	for (visa in visasTargetSector){
		var currentTitle = visasTargetSector[visa]["Job Title"];
		if(sectorByTitle.indexOf(currentTitle) > -1){
			//console.log(currentTitle)
			//console.log(sectorByTitle, "in array")
			//do nothing
		}
		else{
			sectorByTitle.push(currentTitle)
			//console.log(currentTitle)
			//console.log(sectorByTitle, "not in array")
		}
	}
	for (visa in visasTargetSector){
		var currentCompany = visasTargetSector[visa]["Company"]
		if (sectorByCompany.indexOf(currentCompany)> -1){
			//do nothing
		}else{
			sectorByCompany.push(currentCompany)
		}
	}
//	console.log(sectorByCompany.length)
	//var printedString = "This sector contains applications for " + sectorByTitle + " working at " + sectorByCompany
	if(sectorByTitle.length<1){
		var printedString = "This sector contains no applications."
		
	}else{
		var printedString = "This sector contains applications for " + sectorByTitle
		
	}
//	console.log("title",sectorByTitle)
	//return  printedString
	return printedString
}

function aggregateByCountry(country){
	//function that organize selected country's visas by sector, then status
	var visasTargetCountry=[]
	for(visa in visas){
		if (visas[visa]["Origin Country"] == country){
			visasTargetCountry.push(visas[visa])
		//	console.log(visas[visa]["Status"])
		}
	}
	return visasTargetCountry
}

function drawBarGraph(dataset){
	//console.log("dataset", dataset)
	
	var bySector = 
		{
			"Other Economic Sector":{},
		    "Finance":{},
		    "IT":{},
			"Not Available":{},
		    "Health Care":{},
		    "Advanced Mfg":{},
		    "Educational Services":{},
		    "Aerospace":{},
		    "Retail":{},
		    "Hospitality":{},
		    "Construction":{},
		    "Energy":{},
		    "Automotive":{},
		    "Transportation":{},
		    "Agribusiness":{},
		    "Biotechnology":{},
		    "Geospatial":{},
		    "Homeland Security":{}
		}
	for (visa in dataset){
		//console.log(visasByCountry[visa]["Economic Sector"])
		var currentSector = dataset[visa]["Economic Sector"];
		var currentStatus = dataset[visa]["Status"];

		if(bySector[currentSector][currentStatus]==undefined){
			bySector[currentSector][currentStatus]=[]
			bySector[currentSector][currentStatus].push(dataset[visa])
		}else{
			bySector[currentSector][currentStatus].push(dataset[visa])
		}
	}
	//console.log("bySector", bySector)
	var sectorStats = []
	for (sector in bySector){
		var cCount = null
		var dCount = null
		var wCount = null
//		console.log(bySector[sector])
		if(bySector[sector]["Certified"]== undefined){
		//  cCount = 0
		}else{ 
			cCount = bySector[sector]["Certified"].length
		}
		if(bySector[sector]["Withdrawn"]== undefined){
			//wCount = 0
		}else{ 
			wCount = bySector[sector]["Withdrawn"].length
		}
		if(bySector[sector]["Denied"]== undefined){
		//	dCount = 0
		}else{ 
			dCount = bySector[sector]["Denied"].length
		}
		sectorStats.push([sector, cCount,wCount,dCount])
		//console.log(sector, cCount, wCount,dCount)
	}
	//sectorStats.sort()	
	//console.log("sectorStats", sectorStats)
	var w = 400;
	var h = 400;
	
	var svg = d3.select("div.barchart")
		.append("svg:svg")
		.attr("width", h)
		.attr("height", w)
		.append("svg:g")
		.attr("class", "svg")
		
		//.attr("transform", "translate(0,400)")
		.attr("transform", "rotate(90 0 0)");
	var svg2 = d3.select("div.barchart")
		.append("svg:svg")
		.attr("class", "svg2")
		.attr("width", 120)
		.attr("height", h)
		.append("svg:g");
//	console.log("draw bar")
	p = [0, 50, 30, 20],
    x = d3.scale.ordinal().rangeRoundBands([0, w-20]),
    y = d3.scale.linear().range([0, h-140]),
    z = d3.scale.ordinal().range(["#59D984","#EDA52B","#E63D25"]);
	
	var remapped = ["Certified", "Withdrawn", "Denied"].map(function(dat,i){
		//console.log(dat)
		return sectorStats.map(function(d, ii){
			return {x:ii, y: d[i+1], type: dat}
		})
	})
	//console.log("mapped: ",remapped)
	
	var stacked = d3.layout.stack()(remapped)
	//console.log("stacked: ", stacked)
	
	x.domain(stacked[0].map(function(d) { return d.x; }));
	y.domain([0, d3.max(stacked[stacked.length - 1], function(d) { return d.y0 + d.y; })]);
	//console.log("x.domain(): " + x.domain())
	//console.log("y.domain(): " + y.domain())
           
	var valgroup = svg.selectAll("g.valgroup")
	            .data(stacked)
	            .enter()
				.append("svg:g")
				.attr("class", "bargraph")
	            .attr("class", "valgroup")
	            .style("fill", function(d, i) { return z(i); });
				
	var rect = valgroup.selectAll("rect")	
	            .data(function(d){return d;})
	            .enter()
				.append("svg:rect")
	            .attr("x", function(d) { return x(d.x); })
	            .attr("y", function(d) { return -y(d.y0) - y(d.y)-120; })
	            .attr("height", function(d) { 
					if(y(d.y) < 2 && y(d.y)!=0 ){
						return 2
					}else{
					return y(d.y);}
				 })
	            .attr("width", x.rangeBand()-3)
				.attr("opacity", 0.6)
				.on('mouseover', function(d,i){
					var total = sectorStats[i][1]+sectorStats[i][2]+sectorStats[i][3]
					var percentC = parseInt(sectorStats[i][1]/total*100)
					var percentW = parseInt(sectorStats[i][2]/total*100)
					var percentD = parseInt(sectorStats[i][3]/total*100)
					//d3.selectAll("#barHighlight")
					//	.html(sectorStats[i][0]+" - Certified: "+ sectorStats[i][1]+"("+percentC +"%), Withdrawn: "+sectorStats[i][2]+"("+percentW +"%), Denied: "+sectorStats[i][3]+"("+percentD +"%)");
					d3.select(this).attr("opacity", 1);
				})
				.on('mouseout', function(d){
					d3.select(this).attr("opacity", .6);
					//d3.selectAll('#barHighlight').html('');
				})
				.on("click", function(d,i){
					var currentSector = sectorStats[i][0]
					//TODO: find clicked on column, and pass into function for filtering
					//var Status = d3.select(this).property(i)
					var Status = d.type
					var selectedDetails = aggregateBySectorAndStatus(currentSector, Status)
					var selectedDetailsText = aggregateBySectorAndStatusText(currentSector, Status)
					d3.selectAll('#visaDetails').html(JSON.stringify(selectedDetailsText));
					d3.selectAll('#countryLabel').html(currentSector + " " + Status+ " for All Countries")
					d3.selectAll('#barHighlight').html("Distribution of Applications for all Countries")
					
					d3.select(".svg3")
					.attr("opacity", 1)
					.transition()
					.duration(1000)
					.attr("opacity", 0)
					.remove();
					if(d.type == "Certified"){
					redrawMap(countryCount,"#59D984");	
					}else if(d.type == "Withdrawn"){
					redrawMap(countryCount, "#EDA52B");		
					}else{
					redrawMap(countryCount, "#E63D25");	
					}	
					d3.selectAll(".svg").remove();
					d3.selectAll(".svg2").remove();
					drawBarGraph(visas);
					d3.select(this).attr("fill", "red")
									
			});
				
	svg2.selectAll("text")
	.data(sectorStats)
	.enter()
	.append("svg:g")
	.append("text")
	.text(function(d){return d[0]})
	.attr("font-size", "10px")
	.attr("text-anchor", "end")
	.attr("x", function(d,i){
		return 112;
	})
	.attr("y", function(d,i){ 
		return 15+i*(w/(sectorStats.length)-1.5)
	})
	.on('mouseover', function(d,i){
		var total = sectorStats[i][1]+sectorStats[i][2]+sectorStats[i][3]
		var totalPercent = parseInt(total/2340*100)
		if (totalPercent < 1){
			totalPercent = " less than 1"
		}
		
		d3.select(this).attr("opacity", 1);
		d3.selectAll('#visaDetails').html("")
		
	})
	.on("click", function(d,i){
		var currentSector = sectorStats[i][0]
		var selectedDetailsText = generateAggregatedText(currentSector)
		var selectedDetails = aggregateBySector(currentSector)
		//console.log("selected details: ", selectedDetails)
		d3.selectAll('#visaDetails').html(JSON.stringify(selectedDetailsText))
		d3.selectAll('#countryLabel').html(currentSector+" All Status for All Countries")
		
		d3.select(".svg3")
		.attr("opacity", 1)
		.transition()
		.duration(1000)
		.attr("opacity", 0)
		.remove()
		redrawMap(countryCount, "#665D50");
		d3.selectAll(".svg").remove();
		d3.selectAll(".svg2").remove();
		drawBarGraph(visas);
	})
};

function redrawMap(countryCount, maxColor) {
	var width = 800;
	var height = 400;	
	var countByCountry = d3.map();
	var projection = d3.geo.mercator()
	    .scale(120)
	    .translate([width / 2, height/2+50]);
	var path = d3.geo.path()
	    .projection(projection);
		
	var svg3 = d3.select("div.map")
		.append("svg:svg")
		.attr("class", "svg3")
		.attr("width", width)
		.attr("height", height)
		.append("svg:g");	
	var color = d3.scale.sqrt()
		.range(["#efefef", maxColor])
	d3.json("world.geojson", function(json){
		var dataValues = []
	for(var i = 0; i < countryCount.length; i++){
		var dataCountry = countryCount[i][0].toLowerCase();
		var dataValue = countryCount[i][1];
		dataValues.push(dataValue);
		for(var j = 0; j < json.features.length; j++){
			var jsonCountry = json.features[j].properties.name.toLowerCase();
			if(dataCountry == jsonCountry){
				json.features[j].properties.value = dataValue;
				break;
			}
		}
	}
	color.domain([0,d3.max(dataValues)])
	svg3.selectAll("path")
	.data(json.features)
	.enter()
	.append("path")
	.attr("d", path)
	//.style("stroke", "#fff")
	.style("fill", function(d){
		var value = d.properties.value;
		if(d.properties.name == "United States"){
			return "#fff"
		}
		if(value){
			return color(value);
		}else{
			return "#fff";
		}
		
	})
	.style("stroke", function(d){
		if(d.properties.name == "United States"){
			return "#aaa"
		}
	})
	.on("mouseover", function(d,i){
	})
	.on("click", function(d,i){
		var country = d.properties.name
		var filteredData = aggregateByCountry(country.toUpperCase())
		var mouseOverCountry = d.properties.name
		var countryTotal = filteredData.length
		var visasLength = visas.length;
		console.log(visasLength)
		var countryPercentage = parseInt(countryTotal/visasLength*100)
		console.log(countryPercentage)
		if(countryPercentage < 1){
		d3.selectAll('#countryLabel').html(mouseOverCountry+" had "+ countryTotal+" H1B visa applications, or less than 1% of global applications")
		}else{
		d3.selectAll('#countryLabel').html(mouseOverCountry+" had "+ countryTotal+" H1B visa applications, or "+ countryPercentage+"% of global application")
		}
		d3.selectAll("#barHighlight").html("Distribution of applications from "+mouseOverCountry)
		//console.log("filtered country dataset",filteredData)
		d3.selectAll(".svg").remove();
		d3.selectAll(".svg2").remove();
		drawBarGraph(filteredData);
		redrawMap(countryCount, "#665D50");
	})
	.attr("opacity", 0)
	.transition()
	.duration(1000)
	.attr("opacity", 1)
	})
}

