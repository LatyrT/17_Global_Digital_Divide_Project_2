d3.json("../Project Work/02 - Analysis/04_Flask_SQLAchemy/InternetByCountry_JavaScript_2.json").then((importedData) => {
  console.log(importedData);
  var data = importedData;

function filtercountries(country) {
  return country.Region === "Oceania";
}

// 2. Use filter() to pass the function as its argument
var filteredregion = data.filter(filtercountries);

//  Check to make sure your are filtering your movies.
console.log(filteredregion);

// Sort the data by Greek search results
var sortedratings = filteredregion.sort((a, b) => b.Population - a.Population);

// Slice the first 10 objects for plotting
slicedData = sortedratings.slice(0, 10);

// Reverse the array to accommodate Plotly's defaults
reversedData = slicedData.reverse();

// Trace1 for the Greek Data
var trace1 = {
  x: reversedData.map(object => object.Population),
  y: reversedData.map(object => object.Country),
  name: "Population",
  type: "bar",
  orientation: "h"
};

var trace2 = {
  x: reversedData.map(object => object.InternetUsers),
  y: reversedData.map(object => object.Country),
  name: "Internet_Users",
  type: "bar",
  orientation: "h"
};

// data
var data = [trace1,trace2];

// Apply the group bar mode to the layout
var layout =
  {
    paper_bgcolor : 'rgb(78,93,108)',
    plot_bgcolor: 'rgb(78,93,108)',
    title: {
        text: "Top 10 Countries in the Region by population",
        font: {color: 'rgb(255,255,255)'}
    },
    yaxis:{
        title: 'Country',
        color:'rgb(255,255,255)',
        tickmode:"linear"
    },
    xaxis:{
        title: 'Population/Internet Users',
        color:'rgb(255,255,255)'},
    margin: {
        l: 180,
        r: 100,
        t: 100,
        b: 100
    },
    legend: {
      font: {
         color: 'white'
       }},

};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("bar-plot", data, layout);
});
