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
		redrawMap(aggregateByCountryAll(), "#665D50");
		var withdrawnAll = aggregateByStatus("Withdrawn")
		var certifiedAll = aggregateByStatus("Certified")
		var deniedAll = aggregateByStatus("Denied")
		
		d3.selectAll('#barHighlight').html("Distribution of Applications for All Countries")
		d3.selectAll('#countryLabel').html("Distribution of Applications for All Sectors")
		d3.selectAll("#keyAll")
		.on("click", function(){
			console.log("click all")
			d3.selectAll(".svg3").remove()
			redrawMap(aggregateByCountryAll(),"#665D50");
		})
		d3.selectAll("#keyCertified")
		.on("click", function(){
			console.log("click certified")
			d3.selectAll(".svg3").remove()
			redrawMap(certifiedAll,"#59D984");
		})
		d3.selectAll("#keyWithdrawn")
		.on("click", function(){
			console.log("click withdraw")
			d3.selectAll(".svg3").remove()
			redrawMap(withdrawnAll, "#EDA52B");
		})
		d3.selectAll("#keyDenied")
		.on("click", function(){
			console.log("click denied")
			d3.selectAll(".svg3").remove()
			redrawMap(deniedAll, "#E63D25");
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
	var sectorByTitle = {}
	var sectorByCompany = []
	for (visa in visasTargetSectorStatus){
		var currentTitle = visasTargetSectorStatus[visa]["Job Title"];
		if(sectorByTitle[currentTitle]== undefined){
			sectorByTitle[currentTitle]=[]
			sectorByTitle[currentTitle].push(currentTitle)
		}
		else{
			sectorByTitle[currentTitle].push(currentTitle)
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
	console.log("titlestats -- sorted",titleStats)
//	console.log(sectorByCompany.length)
	//var printedString = "This sector contains applications for " + sectorByTitle + " working at " + sectorByCompany
	if(sectorByTitle.length<1){
		var printedString = "This Sector Contains No Applications."
		
	}else{
		var printedString = "The Top <em>"+Status+"</em>  Job Titles in  <em>"+Sector+"</em> are <br/>" + titleStats.join(" ")
		
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
	console.log("titlestats -- sorted",titleStats)
//	console.log(sectorByCompany.length)
	//var printedString = "This sector contains applications for " + sectorByTitle + " working at " + sectorByCompany
	if(sectorByTitle.length<1){
		var printedString = "<em>"+Sector+"</em> Contains No Applications."
		
	}else{
		var printedString = "The Top Job Titles in <em>"+Sector+"</em> Sector are <br/>" + titleStats.join(" ")
		
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

function aggregateByCountryText(country){
	//function that outputs job title and company for bargraph selections
	//console.log("sector")
	var visasTargetCountry=[]
	for(visa in visas){
		if (visas[visa]["Origin Country"].toLowerCase() == country.toLowerCase()){
			visasTargetCountry.push(visas[visa])
		}
	}	
	console.log("targetcountry", visasTargetCountry.length)
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
	console.log("sector by title", sectorByTitle)
	var titleStats = []
	for(title in sectorByTitle){
		titleStats.push([sectorByTitle[title].length, sectorByTitle[title][0]+"<br/>"])
	}

	titleStats.sort(function(a,b) {return a[0] > b[0];});
	titleStats.reverse();
	titleStats.splice(5,titleStats.length-5);
	titleStats = titleStats.map(function(a){return a[0] + " " + a[1]})
	console.log("titlestats -- sorted",titleStats)
//	console.log(sectorByCompany.length)
	//var printedString = "This sector contains applications for " + sectorByTitle + " working at " + sectorByCompany
	if(sectorByTitle.length<1){
		var printedString = "<em>"+country+"</em> Contains No Applications."
		
	}else{
		var printedString = "The Top Job Titles in Applications from <em>"+country+"</em> are <br/>" + titleStats.join(" ")
		
	}
//	console.log("title",sectorByTitle)
	//return  printedString
	return printedString
}

function drawBarGraph(dataset){
	//console.log("dataset", dataset)
	
	var bySector = 
		{
		    "Advanced Mfg":{},
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
			"Other Economic Sector":{},
			"Not Available":{}
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
		.attr("width", 120)
		.attr("height", h)
		.append("svg:g");
//	console.log("draw bar")
	p = [0, 50, 30, 20],
    x = d3.scale.ordinal().rangeRoundBands([0, w-30]),
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
		.attr("transform", "translate(245,-400)")
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
					var total = sectorStats[i][1]+sectorStats[i][2]+sectorStats[i][3]
					
					//TODO: find clicked on column, and pass into function for filtering
					//var Status = d3.select(this).property(i)
					var Status = d.type
					var selectedDetails = aggregateBySectorAndStatus(currentSector, Status)
					var selectedDetailsText = aggregateBySectorAndStatusText(currentSector, Status)
					d3.selectAll('#visaDetails').html(selectedDetailsText);
					if(d.type == "Certified"){
						d3.selectAll('#countryLabel').html(sectorStats[i][1] + " "+ currentSector + " " + Status+ " Applications for All Countries")
					}else if(d.type == "Withdrawn"){
						d3.selectAll('#countryLabel').html(sectorStats[i][2] + " "+ currentSector + " " + Status+ " Applications for All Countries")
					}else{
						d3.selectAll('#countryLabel').html(sectorStats[i][3] + " "+ currentSector + " " + Status+ " Applications for All Countries")
					}	
					
					d3.selectAll('#barHighlight').html("Distribution of Applications for all Countries")
					
					d3.select(".svg3")
					.attr("opacity", 1)
					.transition()
					.duration(2000)
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
	.attr("fill", "#222")
	.attr("text-anchor", "end")
	.attr("x", function(d,i){
		return 115;
	})
	.attr("y", function(d,i){ 
		return 15+i*(w/(sectorStats.length)-2.5)
	})
	.on('mouseover', function(d,i){
		var total = sectorStats[i][1]+sectorStats[i][2]+sectorStats[i][3]
		var totalPercent = parseInt(total/2340*100)
		if (totalPercent < 1){
			totalPercent = " less than 1"
		}
		
		d3.select(this).attr("opacity", 1);
		//d3.selectAll('#visaDetails').html("")
		
	})
	.on("click", function(d,i){
		var currentSector = sectorStats[i][0]
		var selectedDetailsText = generateAggregatedText(currentSector)
		var selectedDetails = aggregateBySector(currentSector)
		var total = sectorStats[i][1]+sectorStats[i][2]+sectorStats[i][3]
		//console.log("selected details: ", selectedDetails)
		d3.selectAll('#visaDetails').html(selectedDetailsText)
		d3.selectAll('#countryLabel').html("<em>"+currentSector+"</em> All Status for All Countries")
		d3.selectAll('#countryLabel').html(total + " <em>"+ currentSector + "</em> Applications for All Countries")
		d3.selectAll(".svg3")
			.attr("opacity", 1)
			.transition()
			.duration(2000)
			.attr("opacity", 0)
			.selectAll(".svg3")
			.remove();
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
			return "#eee"
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
		var countryJobTitle = aggregateByCountryText(country)
		//console.log(visasLength)
		var countryPercentage = parseInt(countryTotal/visasLength*100)
		//console.log(countryPercentage)
		if(country == "United States"){
		d3.selectAll('#countryLabel').html("US Citizens do not apply for visas.")
		d3.selectAll("#barHighlight").html("")
		d3.selectAll("#visaDetails").html("")
		}else if(countryTotal == 0){
		d3.selectAll('#countryLabel').html(country + " had no visa applications in 2013.")
		d3.selectAll("#barHighlight").html("")
		d3.selectAll("#visaDetails").html("")
		}
		else if(countryPercentage < 1){
		d3.selectAll('#countryLabel').html("<em>"+mouseOverCountry+"</em> had "+ countryTotal+" H1B visa applications, or less than 1% of global applications in 2013")
		d3.selectAll("#barHighlight").html("Distribution of applications from <em>"+mouseOverCountry+"</em>")
		d3.selectAll("#visaDetails").html(countryJobTitle)
		}else{
		d3.selectAll('#countryLabel').html("<em>"+mouseOverCountry+"</em> had "+ countryTotal+" H1B visa applications, or "+ countryPercentage+"% of global applications in 2013")
		d3.selectAll("#barHighlight").html("Distribution of applications from <em>"+mouseOverCountry+"</em>")
		d3.selectAll("#visaDetails").html(countryJobTitle)
		}
		d3.selectAll(".svg2").remove();
		d3.selectAll(".svg").remove();
		d3.selectAll(".svg3").attr("opacity",1).transition().duration(2000).attr("opacity",0).selectAll(".svg3").remove();
		
		drawBarGraph(filteredData);
		var countryCountAll = aggregateByCountryAll()
		redrawMap(countryCountAll, "#665D50");
		d3.select(this).style("stroke","#fff")
	})
	.attr("opacity", 0)
	.transition()
	.duration(2000)
	.attr("opacity", 1)
	})
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
	   console.log("close")
     closeEssayBox();
     $('#showMore').text(' ... more ');
   });

   $('#essayBox').click(function () {
       closeEssayBox(); 
       $('#showMore').text(' ... more ');
   });

  function closeEssayBox(){
   $('#essayBox').animate({'opacity':0.0}, 500, function () {
     $('#essayBox').css('display', 'none');
   })
   essayBoxShown = false;
 }
 	
