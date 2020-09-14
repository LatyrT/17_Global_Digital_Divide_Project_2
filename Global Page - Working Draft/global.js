// MAP - Share of Internet Users per Country & Number of users per country
 var map1 = L.map("map1", {
     center: [36.7397,3.05097],
     zoom: 2
   });
 L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
     maxZoom: 18,
     id: 'mapbox/streets-v11',
     tileSize: 512,
     zoomOffset: -1,
     accessToken: "pk.eyJ1IjoiYW5uYS1qZXNzaWNhIiwiYSI6ImNrYmQ2MW1yNjA4cmkycm80Ymh0a2s5aXAifQ.ZOUOyvEapguQx8cwAfSLaQ"
 }).addTo(map1);

d3.json("../Project Work/02 - Analysis/04_Flask_SQLAchemy/InternetByCountry_JavaScript_2.json").then(function(regions) {
  console.log(regions);

  for (var i = 0; i < regions.length; i++) {
    var color = "";
    // console.log(regions[i].location);
    if (regions[i].Percent_Population > 75) {
      color = "green";
    }
    else if (regions[i].Percent_Population > 50) {
      color = "blue";
    }
    else {
      color = "red";
    }
  
    L.circle(regions[i].Location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      radius: regions[i].Percent_Population * 5000
    }).bindPopup("<h2>" + regions[i].Countries + "</h2> <hr> <h2>Percentage of population using the internet: " + regions[i].Percent_Population+  "</h2> <hr> <h2>Number of people using the internet: " + regions[i].InternetUsers +  "</h2>" ).addTo(map1);
  };

});


// // internet cost v. speed - bubbles - D3
var svgWidth = 1100;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data

d3.json("../Project Work/02 - Analysis/04_Flask_SQLAchemy/CostandSpeed_JavaScript_2.json").then(function(costSpeedData) {
  console.log(costSpeedData);

    //  Parse Data/Cast as numbers
    costSpeedData.forEach(function(data) {
      data.dlspeed = +data.dlspeed;
      data.cost = +data.cost;
    });
    //  Create scale functions
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(costSpeedData, d => d.cost)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(costSpeedData, d => d.dlspeed)])
      .range([height, 0]);

    //  Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //  Append Axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(costSpeedData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.cost))
    .attr("cy", d => yLinearScale(d.dlspeed))
    .attr("r", "15")
    .attr("fill", "yellow")
    .attr("opacity", ".8");

    // Initialize tool tip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.country}<br>Speed: ${d.dlspeed}<br>Cost: ${d.cost}`);
      });

    //  Create tooltip in the chart
    chartGroup.call(toolTip);

    //  Create event listeners to display and hide the tooltip
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Internet Speed")
      .attr("fill", "white");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Internet Monthly Cost")
      .attr("fill", "white");;
  }).catch(function(error) {
    console.log(error);
  });

