jQuery.fn.d3Click = function () {
  this.each(function (i, e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    e.dispatchEvent(evt);
  });
};


var visas = [];
d3.csv("reduced_data/2012_2013_perm_newyorkcity.csv", function(data)
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
		var selectedDetailsText = aggregateBySectorAndStatusText("All", "All")
		d3.selectAll('#visaDetails').html(selectedDetailsText);
		redrawMap(aggregateByCountryAll(), "#665D50");
		drawHistogram(aggregateByCountryAll(),"#665D50" )
		var withdrawnAll = aggregateByStatus("Withdrawn")
		var AcceptedAll = aggregateByStatus("Accepted")
		var deniedAll = aggregateByStatus("Denied")
		d3.selectAll('#barHighlight').html("Distribution of Applications for All Countries")
		d3.selectAll('#countryLabel').html("Distribution of Applications for All Sectors")
		d3.selectAll("#keyAll")
			.on("click", function(){
			//	console.log("click all")
			var selectedDetailsText = aggregateBySectorAndStatusText("All", "All")
			d3.selectAll('#visaDetails').html(selectedDetailsText);
			d3.selectAll(".svg").transition().duration(1000).style("opacity",0).remove();
			d3.selectAll(".svg2").transition().duration(1000).style("opacity",0).remove();	
			d3.selectAll(".svg3").transition().duration(1000).style("opacity",0).remove();
			d3.selectAll(".svg4").transition().duration(1000).style("opacity",0).remove();	
			drawBarGraph(visas);
			redrawMap(aggregateByCountryAll(),"#665D50");
			drawHistogram(aggregateByCountryAll(),"#665D50" )
			d3.selectAll('#countryLabel').html("All Applications, "+aggregateByCountryAll().length+" Countries");
			d3.selectAll('#barHighlight').html("Distribution of Applications for All Countries")
			
		})
		d3.selectAll("#keyAccepted")
		.on("click", function(){
			var selectedDetailsText = aggregateBySectorAndStatusText("All", "Accepted")
			d3.selectAll('#visaDetails').html(selectedDetailsText);
			//console.log(AcceptedAll.length)
			d3.selectAll(".svg").transition().duration(1000).style("opacity",0).remove();
			d3.selectAll(".svg2").transition().duration(1000).style("opacity",0).remove();	
			d3.selectAll(".svg3").transition().duration(1000).style("opacity",0).remove();
			d3.selectAll(".svg4").transition().duration(1000).style("opacity",0).remove();	
			drawBarGraph(visas);
	
			redrawMap(AcceptedAll,"#59D984");
			//console.log(AcceptedAll)
			drawHistogram(AcceptedAll,"#59D984")
			
			d3.selectAll('#countryLabel').html("All Sectors Accepted Applications, "+ AcceptedAll.length+" Countries.");
			d3.selectAll('#barHighlight').html("Distribution of Applications for All Countries")
			
		})
		d3.selectAll("#keyWithdrawn")
		.on("click", function(){
		//	console.log("click withdraw")
			d3.selectAll(".svg").transition().duration(1000).style("opacity",0).remove();
			d3.selectAll(".svg2").transition().duration(1000).style("opacity",0).remove();	
			d3.selectAll(".svg3").transition().duration(1000).style("opacity",0).remove();
			d3.selectAll(".svg4").transition().duration(1000).style("opacity",0).remove();	
			drawBarGraph(visas);
			
			var selectedDetailsText = aggregateBySectorAndStatusText("All", "Withdrawn")
			d3.selectAll('#visaDetails').html(selectedDetailsText);
			redrawMap(withdrawnAll, "#EDA52B");
			drawHistogram(withdrawnAll, "#EDA52B");
			d3.selectAll('#countryLabel').html("All Sectors Withdrawn Applications, "+ withdrawnAll.length+" Countries.");
			d3.selectAll('#barHighlight').html("Distribution of Applications for All Countries")
			
		})
		d3.selectAll("#keyDenied")
		.on("click", function(){
		//	console.log("click denied")
			d3.selectAll(".svg").transition().duration(1000).style("opacity",0).remove();
			d3.selectAll(".svg2").transition().duration(1000).style("opacity",0).remove();	
			d3.selectAll(".svg3").transition().duration(1000).style("opacity",0).remove();
			d3.selectAll(".svg4").transition().duration(1000).style("opacity",0).remove();	
			drawBarGraph(visas);
			
			var selectedDetailsText = aggregateBySectorAndStatusText("All", "Denied")
			d3.selectAll('#visaDetails').html(selectedDetailsText);
			redrawMap(deniedAll, "#E63D25");
			drawHistogram(deniedAll, "#E63D25");
			d3.selectAll('#countryLabel').html("All Sectors Denied Applications, "+ deniedAll.length+" Countries.");
			d3.selectAll('#barHighlight').html("Distribution of Applications for All Countries")
			
		})
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
	return countryCountAll
}
function aggregateByStatus(Status){
	//function that organizes selected sector and status by country and returns country
	//console.log("sector")
	var visasTargetSector = []
	for (visa in visas){		
		if (visas[visa]["Status"] == Status){
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
		}else if(Sector == "All" && Status == "All"){
			visasTargetSectorStatus.push(visas[visa])
		}else if (Sector == "All" && visas[visa]["Status"]== Status)
		visasTargetSectorStatus.push(visas[visa])
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
	var sectorByTitle = {}
	var sectorByCompany = []
	for (visa in visasTargetSectorStatus){
		var currentTitle = visasTargetSectorStatus[visa]["Job Title"];
		if (currentTitle != "Not Available"){
			if(sectorByTitle[currentTitle]== undefined){
				sectorByTitle[currentTitle]=[]
				sectorByTitle[currentTitle].push(currentTitle)
			}
			else{
				sectorByTitle[currentTitle].push(currentTitle)
			}
		}
	}
	var titleStats = []
	for(title in sectorByTitle){
		titleStats.push([sectorByTitle[title].length, sectorByTitle[title][0]+"<br/>"])
	}

	titleStats.sort(function(a,b) {return a[0] > b[0];});
	titleStats.reverse();
	titleStats.splice(5,titleStats.length-5);
	titleStats = titleStats.map(function(a){return a[0] + " " + a[1]})
//	console.log("titlestats -- sorted",titleStats)
//	console.log(sectorByCompany.length)
	//var printedString = "This sector contains applications for " + sectorByTitle + " working at " + sectorByCompany
	if(sectorByTitle.length<1){
		var printedString = "This Sector Contains No Applications."
		
	}else if(Status == "All") {
		var printedString = "<span style=\"color:black\">Top Job Titles in  <em>"+Sector+"</em> Sectors </span><br/>" + titleStats.join(" ")
		
	}
	else{
		var printedString = "<span style=\"color:black\">Top <em>"+Status+"</em> Job Titles in  <em>"+Sector+"</em> Sector </span><br/>" + titleStats.join(" ")
		
	}
//	console.log("title",sectorByTitle)
	//return  printedString
	return printedString
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
	var sectorByTitle = {}
	var sectorByCompany = []
	for (visa in visasTargetSector){
		var currentTitle = visasTargetSector[visa]["Job Title"];
		if(sectorByTitle[currentTitle]== undefined){
			sectorByTitle[currentTitle]=[]
			sectorByTitle[currentTitle].push(currentTitle)
			//console.log(currentTitle)
			//console.log(sectorByTitle, "in array")
			//do nothing
		}
		else{
			sectorByTitle[currentTitle].push(currentTitle)
			//console.log(currentTitle)
			//console.log(sectorByTitle, "not in array")
		}
	}
	//console.log(sectorByTitle)
	var titleStats = []
	for(title in sectorByTitle){
		titleStats.push([sectorByTitle[title].length, sectorByTitle[title][0]+"<br/>"])
	}

	titleStats.sort(function(a,b) {return a[0] > b[0];});
	titleStats.reverse();
	titleStats.splice(5,titleStats.length-5);
	titleStats = titleStats.map(function(a){return a[0] + " " + a[1]})
	//console.log("titlestats -- sorted",titleStats)
//	console.log(sectorByCompany.length)
	//var printedString = "This sector contains applications for " + sectorByTitle + " working at " + sectorByCompany
	if(sectorByTitle.length<1){
		var printedString = "<em>"+Sector+"</em> Contains No Applications."
		
	}else{
		var printedString = "<span style=\"color:black\">Top Job Titles in <em>"+Sector+"</em> Sector</span><br/>" + titleStats.join(" ")
		
	}
//	console.log("title",sectorByTitle)
	//return  printedString
	return printedString
}

function aggregateByCountry(country){
	//function that organize selected country's visas by sector, then status
	var visasTargetCountry=[]
	if (country==null){
		visasTargetCountry.push(visas[visa])
	}
	else{
	for(visa in visas){
		if (visas[visa]["Origin Country"] == country){
			visasTargetCountry.push(visas[visa])
		//	console.log(visas[visa]["Status"])
		}
	}
}
	return visasTargetCountry
}

function aggregateByCountryText(country){
	//function that outputs job title and company for bargraph selections
	//console.log("sector")
	var visasTargetCountry=[]
	for(visa in visas){
		if (visas[visa]["Origin Country"].toLowerCase() == country.toLowerCase()){
			visasTargetCountry.push(visas[visa])
		}
	}	
//console.log("targetcountry", visasTargetCountry.length)
	var sectorByTitle = {}
	for (visa in visasTargetCountry){
		var currentTitle = visasTargetCountry[visa]["Job Title"];
		if(sectorByTitle[currentTitle]== undefined){
			sectorByTitle[currentTitle]=[]
			sectorByTitle[currentTitle].push(currentTitle)
		}
		else{
			sectorByTitle[currentTitle].push(currentTitle)
		}
	}
//	console.log("sector by title", sectorByTitle)
	var titleStats = []
	for(title in sectorByTitle){
		titleStats.push([sectorByTitle[title].length, sectorByTitle[title][0]+"<br/>"])
	}

	titleStats.sort(function(a,b) {return a[0] > b[0];});
	titleStats.reverse();
	titleStats.splice(5,titleStats.length-5);
	titleStats = titleStats.map(function(a){return a[0] + " " + a[1]})
//	console.log("titlestats -- sorted",titleStats)
//	console.log(sectorByCompany.length)
	//var printedString = "This sector contains applications for " + sectorByTitle + " working at " + sectorByCompany
	if(sectorByTitle.length<1){
		var printedString = "<em>"+country+"</em> Contains No Applications."
		
	}else{
		var printedString = "<span style=\"color:black\">Top Job Titles in Applications from <em>"+country+"</em></span><br/>" + titleStats.join(" ")
		
	}
//	console.log("title",sectorByTitle)
	//return  printedString
	return printedString
}

function drawBarGraph(dataset){
	//console.log("dataset", dataset)
	
	var bySector = 
		{
		    "Advanced Manufacturing":{},
		    "Aerospace":{},
		    "Agribusiness":{},
		    "Automotive":{},
		    "Biotechnology":{},
		    "Construction":{},
		    "Educational Services":{},
		    "Energy":{},
			"Finance":{},
		    "Geospatial":{},
		    "Health Care":{},
		    "Homeland Security":{},
		    "Hospitality":{},
		    "IT":{},
		    "Retail":{},
		    "Transportation":{},
			"Other":{}
		}
	for (visa in dataset){
		//console.log(visasByCountry[visa]["Economic Sector"])
		var currentSector = dataset[visa]["Economic Sector"];
		var currentStatus = dataset[visa]["Status"];

		if(bySector[currentSector] != undefined){
		if(bySector[currentSector][currentStatus]== undefined){
			bySector[currentSector][currentStatus]=[]
			bySector[currentSector][currentStatus].push(dataset[visa])
		}else{
			bySector[currentSector][currentStatus].push(dataset[visa])
		}
	}
	}
	//console.log("bySector", bySector)
	sectorStats = []
	for (sector in bySector){
		var cCount = null
		var dCount = null
		var wCount = null
//		console.log(bySector[sector])
		if(bySector[sector]["Accepted"]== undefined){
		//  cCount = 0
		}else{ 
			cCount = bySector[sector]["Accepted"].length
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
		var sum = cCount+wCount+dCount
		sectorStats.push([sector, cCount,wCount,dCount,sum])
		
	}
	
	function sortByValue(a,b){return a[4]-b[4];}
	sectorStats.sort(sortByValue)
	sectorStats.reverse()
	//sectorStats.sort()	
	//console.log("sectorStats", sectorStats)
	var w = 280;
	var h = 400;
	
	var svg = d3.select("div.barchart")
		.append("svg:svg")
		.attr("width", h)
		.attr("height", w)
		.append("svg:g")
		.attr("class", "svg")
		.attr("transform", "rotate(90 0 0)");
	
	var svg2 = d3.select("div.barchart")
		.append("svg:svg")
		.attr("class", "svg2")
		.attr("width", 125)
		.attr("height", 242)
		.append("svg:g");
//	console.log("draw bar")
	p = [0, 50, 30, 20],
    x = d3.scale.ordinal().rangeRoundBands([0, w-30]),
    y = d3.scale.linear().range([0, h-140]),
    z = d3.scale.ordinal().range(["#59D984","#EDA52B","#E63D25"]);
	
	var remapped = ["Accepted", "Withdrawn", "Denied"].map(function(dat,i){
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
	var max =d3.max(stacked[stacked.length - 1], function(d) { return d.y0 + d.y; })

	var yScale = d3.scale.linear().range([15, h-118])
		.domain([max,0]);
	var formatxAxis = d3.format('.0f');
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.tickValues(yScale.domain())
		.orient("right")
		.tickFormat(formatxAxis);	

	svg.append("g")
		.attr("class", "x axis")
		.attr("fill", "#aaa")
		//.attr("transform", "translate(245,-400)")
		.call(yAxis)
		.selectAll("text")
		.attr("y",12)
		    .attr("x", 0)
		.attr("transform", "rotate(-90)")
		.style("text-anchor", "end");	
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
				.attr("opacity", 0)
				.transition()
				.duration(400)
				.attr("opacity",.6)
				valgroup.selectAll("rect").on('mouseover', function(d,i){
					var total = sectorStats[i][1]+sectorStats[i][2]+sectorStats[i][3]
					var percentC = parseInt(sectorStats[i][1]/total*100)
					var percentW = parseInt(sectorStats[i][2]/total*100)
					var percentD = parseInt(sectorStats[i][3]/total*100)
					if(d.type == "Accepted"){
						d3.selectAll('#barRollover').html(sectorStats[i][1]+" Visas, "+percentC+"% Acceptance Rate")
					}else if(d.type == "Withdrawn"){
						d3.selectAll('#barRollover').html(sectorStats[i][2]+" Visas, "+percentW+"% Withdrawn Rate")
					}else{
						d3.selectAll('#barRollover').html(sectorStats[i][3]+" Visas, "+percentD+"% Declined Rate")
					}	
					d3.select(this).attr("opacity", 1);
				})
				.on('mouseout', function(d,i){
					d3.select(this).attr("opacity", .6);
					d3.selectAll('#barRollover').html("")
				})
				.on("click", function(d,i){
					d3.selectAll(".svg").transition().duration(1000).style("opacity",0).remove();
					d3.selectAll(".svg2").transition().duration(1000).style("opacity",0).remove();					
					var total = sectorStats[i][1]+sectorStats[i][2]+sectorStats[i][3]
					drawBarGraph(visas);
					
					var total = sectorStats[i][1]+sectorStats[i][2]+sectorStats[i][3]					
					var currentSector = sectorStats[i][0]
					//console.log("number", numberOfCountries)
					var total = sectorStats[i][1]+sectorStats[i][2]+sectorStats[i][3]
					var Status = d.type
					var selectedDetails = aggregateBySectorAndStatus(currentSector, Status)
					var selectedDetailsText = aggregateBySectorAndStatusText(currentSector, Status)
					var numberOfCountries =countryCount.length
					
					d3.selectAll('#visaDetails').html(selectedDetailsText);
					d3.selectAll('#barHighlight').html("Distribution of Applications for All Countries")
					if(d.type == "Accepted"){
						d3.selectAll('#countryLabel').html(sectorStats[i][1] + " "+ currentSector + " " + Status+ " Applications from "+numberOfCountries+" Countries")
					}else if(d.type == "Withdrawn"){
						d3.selectAll('#countryLabel').html(sectorStats[i][2] + " "+ currentSector + " " + Status+ " Applications from "+numberOfCountries+" Countries")
					}else{
						d3.selectAll('#countryLabel').html(sectorStats[i][3] + " "+ currentSector + " " + Status+ " Applications from "+numberOfCountries+" Countries")
					}	
					d3.selectAll(".svg3").transition().duration(1000).style("opacity",0).remove();
					d3.selectAll(".svg4").transition().duration(1000).style("opacity",0).remove();
								
					if(d.type == "Accepted"){
					redrawMap(countryCount,"#59D984");						
					drawHistogram(countryCount,"#59D984");	
					}else if(d.type == "Withdrawn"){
					redrawMap(countryCount, "#EDA52B");		
					drawHistogram(countryCount,"#EDA52B");		
					}else{
					redrawMap(countryCount, "#E63D25");	
					drawHistogram(countryCount, "#E63D25");	
					}	
			});
				
	svg2.selectAll("text")
	.data(sectorStats)
	.enter()
	.append("svg:g")
	.append("text")
	.text(function(d){return d[0]})
	.attr("font-size", "10px")
	.attr("fill", "#222")
	.attr("text-anchor", "end")
	.attr("x", function(d,i){
		return 122;
	})
	.attr("y", function(d,i){ 
		return 15+i*(w/(sectorStats.length)-2.5)
	})
	.on('mouseover', function(d,i){
		var total = sectorStats[i][1]+sectorStats[i][2]+sectorStats[i][3]
		var totalPercent = parseInt(total/3945*100)
		if (totalPercent < 1){
			totalPercent = " less than 1"
		}
		d3.selectAll('#barRollover').html(total+" Visas")
		
		d3.select(this).attr("opacity", 1);
		//d3.selectAll('#visaDetails').html("")
	})
	.on('mouseout', function(d,i){
		d3.selectAll('#barRollover').html("")
	})
	.on("click", function(d,i){

		//console.log("selected details: ", selectedDetails)
		
		d3.selectAll(".svg3").transition().duration(1000).style("opacity",0).remove();
		d3.selectAll(".svg4").transition().duration(1000).style("opacity",0).remove();
		d3.selectAll(".svg").transition().duration(500).style("opacity",0).remove();
		d3.selectAll(".svg2").transition().duration(500).style("opacity",0).remove();
		redrawMap(countryCount, "#665D50");
		drawHistogram(countryCount, "#665D50");
		drawBarGraph(visas);
		var currentSector = sectorStats[i][0]
		var selectedDetailsText = generateAggregatedText(currentSector)
		var selectedDetails = aggregateBySector(currentSector)
		var total = sectorStats[i][1]+sectorStats[i][2]+sectorStats[i][3]
		d3.selectAll('#visaDetails').html(selectedDetailsText)
		d3.selectAll('#barHighlight').html("Distribution of Applications for All Countries")
		d3.selectAll('#countryLabel').html(total + " <em>"+ currentSector + "</em> Applications for All Countries")
	})
};
function redrawMap(countryCount, maxColor) {	
	var width = 660;
	var height = 400;	
	var countByCountry = d3.map();
	var projection = d3.geo.mercator()
	    .scale(120)
	    .translate([width/2-44, height/2+50]);
	var path = d3.geo.path()
	    .projection(projection);
		
	var svg3 = d3.select("div.map")
		.append("svg:svg")
		.attr("class", "svg3")
		.attr("width", width)
		.attr("height", height)
		.append("svg:g");	
	var color = d3.scale.sqrt()
		.range(["#fff", maxColor])


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
	function sortByValue(a,b){return a[1]-b[1];}
	dataValues.sort(sortByValue)
	dataValues.reverse()
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
	.attr("opacity",.8)
	.style("stroke", function(d){
		if(d.properties.name == "United States"){
			return "#eee"
		}
	})
	.on("mouseover", function(d,i){
		var currentCountry = d.properties.name
		var currentCountryCount = d.properties.value
		d3.select(this).attr("opacity", 1)

		if(currentCountryCount == undefined){
			d3.select("#rollover").html(d.properties.name + " has no visas.")
		}else{
		//	d3.select("#rollover").html(d.properties.name + " has "+currentCountryCount + " visas.")
			d3.select("#rollover").html(d.properties.name)
		}
		d3.select(this).attr("opacity",1)
		
		d3.selectAll(".svg4").attr("opacity",function(){
			console.log(currentCountry)
		}
	)
	})
	.on("mouseout",function(d){
		d3.select("#rollover").html("")
		d3.select(this).attr("opacity",.7)
	})
	.on("click", function(d,i){
		d3.selectAll("path").attr("class", "unclicked")
		d3.select(this).attr("class","clicked")
		var country = d.properties.name
		var filteredData = aggregateByCountry(country.toUpperCase())
		var mouseOverCountry = d.properties.name
		var countryTotal = filteredData.length
		var visasLength = visas.length;
		var countryJobTitle = aggregateByCountryText(country)
		//console.log(visasLength)
		var countryPercentage = parseInt(countryTotal/visasLength*100)
		//console.log("visa",visasLength)
		//console.log(countryPercentage)
		if(country == "United States"){
			//d3.selectAll('#countryLabel').html("US Citizens do not apply for visas.")
			d3.selectAll("#barHighlight").html("")
			d3.selectAll("#visaDetails").html("")
		}else if(countryTotal == 0){
		//	d3.selectAll('#countryLabel').html(country + " had no visa applications in 2013.")
			d3.selectAll("#barHighlight").html("")
			d3.selectAll("#visaDetails").html("")
		}
		else if(countryPercentage < 1){
			//d3.selectAll('#countryLabel').html("<em>"+mouseOverCountry+"</em> had "+ countryTotal+" permanent visa applications, or less than 1% of global applications in 2013")
			d3.selectAll("#barHighlight").html("Distribution of applications from <em>"+mouseOverCountry+"</em>")
			d3.selectAll("#visaDetails").html(countryJobTitle)
		}else{
			//d3.selectAll('#countryLabel').html("<em>"+mouseOverCountry+"</em> had "+ countryTotal+" permanent visa applications, or approximately "+ countryPercentage+"% of global applications in 2013")
			d3.selectAll("#barHighlight").html("Distribution of applications from <em>"+mouseOverCountry+"</em>")
			d3.selectAll("#visaDetails").html(countryJobTitle)
		}
		d3.selectAll(".svg").transition().duration(500).style("opacity",0).remove();
		d3.selectAll(".svg2").transition().duration(500).style("opacity",0).remove();	
		d3.select(".svg3").transition().duration(1000).style("opacity",0).remove();
		d3.selectAll(".svg4").transition().duration(1000).style("opacity",0).remove();
		drawBarGraph(filteredData);
		var countryCountAll = aggregateByCountryAll()
		redrawMap(countryCountAll, "#665D50");
		drawHistogram(aggregateByCountryAll(),"#665D50");
	})

	})
}

function drawHistogram(countryCount, maxColor) {	
	//console.log("draw histogram")
	var width = 660;
	var height = 90;	
	var dataValues = []
	var heightScale =d3.scale.linear().domain([1,1000]).range([8,height])
	var svg4 = d3.select("div.histogram")
		.append("svg:svg")
		.attr("class", "svg4")
		.attr("width", width)
		.attr("height", height)
		.append("svg:g");
	var color = d3.scale.sqrt()
		.range(["#fff", maxColor])	
	for(var i = 0; i < countryCount.length; i++){
		var dataCountry = countryCount[i][0].toLowerCase();
		var dataValue = countryCount[i][1];
		dataValues.push(dataValue);
	}
	function sortByValue(a,b){return a[1]-b[1];}
	countryCount.sort(sortByValue)
	countryCount.reverse()
	svg4.selectAll("rect")
	.data(countryCount)
	.enter()
	.append("rect")
	//.style("stroke", "#fff")
	.attr("x", function(d,i){
		//console.log(countryCount.length)
		return i*(width/countryCount.length)
	})
	.attr("y", function(d,i){
		//console.log(countryCount[1])
		return height- heightScale(countryCount[i][1])
	})
	.attr("width",(width/countryCount.length)-1)
	.attr("height", function(d,i){
		//console.log(countryCount[i][1])
		return  heightScale(countryCount[i][1])
	})
	.style("fill", function(d,i){
		//console.log(countryCount[i][1])
		return color(dataValue)
	})
	.style("opacity",0.4)
	.on("mouseover", function(d,i){
		var rank = i+1
		var countryNameCap =''
		var countryName = countryCount[i][0].toLowerCase().split(' ')
		for(var c=0; c< countryName.length; c++){
			countryNameCap += countryName[c].substring(0,1).toUpperCase() + countryName[c].substring(1,countryName[c].length) +' ';
		}
		//console.log(countryNameCap + " has "+countryCount[i][1]+" visas in this sector and is ranked " + rank)
		d3.select("#histogramLabel").html(countryNameCap)
		d3.select(this).style("opacity", .8)
		d3.select(".svg3").style("opacity", function(d){
			console.log("histo")
			return 0.1
		})
	})
	.on("mouseout", function(d,i){
		//d3.select("#rollover").html("")
		d3.select(this).style("opacity", .3)
		d3.selectAll(".clicked").style("opacity", 1)
		d3.selectAll(".unclicked").style("opacity", .3)
		d3.select(".svg3").style("opacity", 1)
		
	})
	.on("click", function(d,i){
		console.log("click hist")
		d3.selectAll("rect").attr("class", "unclicked")
		d3.select(this).attr("class", "clicked")
		d3.selectAll(".clicked").style("opacity", 1)
		d3.selectAll(".unclicked").style("opacity", .3)
		var rank = i+1
		var countryNameCap =''
		var countryName = countryCount[i][0].toLowerCase().split(' ')
		for(var c=0; c< countryName.length; c++){
			countryNameCap += countryName[c].substring(0,1).toUpperCase() + countryName[c].substring(1,countryName[c].length) +' ';
		}
		d3.select("#histogramLabel").html(countryNameCap + " has "+countryCount[i][1]+" visas and is ranked " + rank)
	})
	.attr("opacity", 0)
	.transition()
	.duration(1000)
	.attr("opacity", 1)
}

var essayBoxShown = false;
 $('#showMore').click(function(e){
     e.preventDefault();
     essayBoxShown = !essayBoxShown;
     if (essayBoxShown) {
         $('#essayBox').css('display', 'block');
         $('#essayBox').animate({'opacity':1.0}, 500);
         $(this).text(' ... view map ');
     } else {
         closeEssayBox();
         $(this).text(' ... more ');
     }

   })


   $('#essayBox-close').click(function(){
//	   console.log("close")
     closeEssayBox();
     $('#showMore').text(' ... more ');
   });


  function closeEssayBox(){
   $('#essayBox').animate({'opacity':0.0}, 500, function () {
     $('#essayBox').css('display', 'none');
   })
   essayBoxShown = false;
 }
// var newYork = d3.select("body").append("svg").attr("class","svg5").attr("width",20).attr("height",20)
// var nyCircle = newYork.append("circle").attr("cx",20).attr("cy",30).attr("r",30)
 	
