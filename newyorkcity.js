var visas = []
d3.csv("reduced_data/2012_2013_perm_newyorkcity.csv", function(data)
	{
		for(visa in data){
			visas.push(data[visa]);
		}
		console.log("visas",visas);
		filteredData = targetData("All", "All","Finance")
		filteredData2 = targetData("MEXICO", "All","All")
		filteredData3 = targetData("All", "All","All")
		
		console.log(mapTally(filteredData))
		drawBarGraph(barTally(targetData("All", "All", "All")))
		drawMap(mapTally(targetData("All", "All", "All")), "All")
	}
)

function targetData(Country, Status, Sector){
	targetCountry=[]
	targetCountryStatus=[]
	targetCountryStatusSector=[]
	for(visa in visas){
		if(Country == "All"){
			targetCountry.push(visas[visa])
		}else if (visas[visa]["Origin Country"]== Country){
			targetCountry.push(visas[visa])
		}
	}
	for (visa in targetCountry){
		if(Status == "All"){
			targetCountryStatus.push(targetCountry[visa])
		}else if (targetCountry[visa]["Status"] == Status){
			targetCountryStatus.push(targetCountry[visa])
		}
	}
	for (visa in targetCountryStatus){
		if (Sector == "All"){
			targetCountryStatusSector.push(targetCountryStatus[visa])
		}else if(targetCountryStatus[visa]["Economic Sector"]== Sector){
			targetCountryStatusSector.push(targetCountryStatus[visa])
		}
	}
	return targetCountryStatusSector
}

function barTally(targetCountryStatusSector){
	//tally by sector then status
	var bySector = {
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
	for(visa in targetCountryStatusSector){
		var currentSector = targetCountryStatusSector[visa]["Economic Sector"];
		var currentStatus = targetCountryStatusSector[visa]["Status"];
		if(bySector[currentSector] != undefined){
		if(bySector[currentSector][currentStatus]== undefined){
			bySector[currentSector][currentStatus]=[]
			bySector[currentSector][currentStatus].push(targetCountryStatusSector[visa])
		}else{
			bySector[currentSector][currentStatus].push(targetCountryStatusSector[visa])
		}
	}
	}
	console.log(bySector)
	barStats = []
	for (sector in bySector){
		var cCount = null
		var dCount = null
		var wCount = null
//		console.log(bySector[sector])
		if(bySector[sector]["Accepted"]!= undefined){
			cCount = bySector[sector]["Accepted"].length
		}
		if(bySector[sector]["Withdrawn"]!= undefined){
			wCount = bySector[sector]["Withdrawn"].length
		}
		if(bySector[sector]["Denied"]!= undefined){
			dCount = bySector[sector]["Denied"].length
		}
		var sum = cCount+wCount+dCount
		barStats.push([sector,cCount,wCount,dCount,sum])
	}
	//sort by decreasing value
	function sortByValue(a,b){return a[4]-b[4];}
	barStats.sort(sortByValue)
	barStats.reverse()
	return(barStats)
}
function mapTally(targetCountryStatusSector){
	//tally by country
	var byCountry = {}
	for(visa in targetCountryStatusSector){
		var currentCountry = targetCountryStatusSector[visa]["Origin Country"]
		if(byCountry[currentCountry]==undefined){
			byCountry[currentCountry]=[]
			byCountry[currentCountry].push(targetCountryStatusSector[visa])
		}else{
			byCountry[currentCountry].push(targetCountryStatusSector[visa])
		}
	}
	console.log(byCountry)
	var mapStats=[]
	for(country in byCountry){
		var currentCountry = byCountry[country]
		mapStats.push([country, byCountry[country].length])
	}
	return mapStats
}
function histTally(targetCountryStatusSector){	
}
function textTally(targetCountryStatusSector){
	//tally by job description
	
	//tally by status rate
	
	//tally by rank
}
function drawBarGraph(dataset){
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
		return dataset.map(function(d, ii){
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
	var stackedBarGraph = svg.selectAll("g.stackedBarGraph")
	            .data(stacked)
	            .enter()
				.append("svg:g")
	            .attr("class", "stackedBarGraph")
	            .style("fill", function(d, i) { return z(i); });
				
	var rect = stackedBarGraph.selectAll("rect")	
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
				.attr("opacity",.5)
	//labels
	stackedBarGraph.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d){return d[0]})
		.attr("fill", "#aaa")
		.attr("font-size", "10px")
		.attr("x", function(d,i){
			return 115
		})
		.attr("text-anchor", "end")
		.attr("transform", "rotate(-90)")
		.attr("y", function(d,i){
			return 15+i*(w/(dataset.length)-2.5)
		})
	//Interaction
	stackedBarGraph.selectAll("rect")
			.on("mouseover", function(){
					d3.select(this).attr("opacity", 1)
					//html text = stats
			})
			.on("mouseout", function(){
				d3.select(this).attr("opacity", .5)
				d3.selectAll(".clicked").attr("opacity", 1)
			})
			.on("click", function(d,i){
				d3.selectAll("rect").attr("class","unclicked")
				d3.selectAll(".unclicked").attr("opacity", .5)
				d3.select(this).attr("class","clicked")
				d3.selectAll(".clicked").transition().attr("opacity", 1)
				var Status = d.type
				var Sector = (dataset[i][0])
				var filteredData = targetData("All", Status, Sector)
				//re-filter data
				console.log(Status, Sector)
				console.log(filteredData)
				//redrawmap
				drawMap(mapTally(filteredData), Status)
				//re-render text
			})
}
function drawMap(dataset, Status){
	console.log("map")
	var width = 600;
	var height = 400;
	var mpa = d3.map();
	var projection = d3.geo.mercator()
		.scale(120)
		.translate([width/2-44, height/2+50]);
	var path = d3.geo.path()
		.projection(projection);
	var map = d3.select("div.map")
		.append("svg:svg")
		.attr("class", "map")
		.attr("width", width)
		.attr("height", height)
		.append("svg:g")
	if (Status == "Accepted"){
		maxColor = "green"
	}else if (Status == "Withdrawn"){
		maxColor = "orange"
	}else if (Status == "Denied"){
		maxColor = "red"
	}else if (Status == "All"){
		maxColor = "black"
	}
	var color = d3.scale.sqrt().range(["#fff", maxColor])
	console.log("mapvalues",dataset)
	
	d3.json("world.geojson", function(json){
		var mapValues = []
		for(var i = 0; i < dataset.length; i++){
			var dataCountry = dataset[i][0].toLowerCase();
			console.log(dataCountry)
			var dataValue = dataset[i][1];
			mapValues.push(dataValue);
			for(var j = 0; j < json.features.length; j++){
				var jsonCountry = json.features[j].properties.name.toLowerCase();
				if(dataCountry == jsonCountry){
					json.features[j].properties.value = dataValue;
					break;
				}
			}
		}
	color.domain([0,d3.max(mapValues)])
	map.selectAll("path")
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
	map.selectAll("path")
	.on("mouseover", function(){
		
	})
	.on("mouseout", function(){
		
	})
	.on("click", function(){
		
	})
	})
}






//ESSAY BOX DO NOT CHANGE
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
 	
