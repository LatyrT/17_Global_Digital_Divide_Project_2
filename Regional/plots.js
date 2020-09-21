// from data.js

d3.json("../Project Work/02 - Analysis/04_Flask_SQLAchemy/WorldInternet_JavaScript_2.json").then((importedData) => {
  console.log(importedData);
  var data = importedData;


var trace1 = {
  x: data.map(row => row.World_Regions),
  y: data.map(row => row.Population),
  text: data.map(row => row.World_Regions),
  name: "Population",
  type: "bar"
};

var trace2 = {
  x: data.map(row => row.World_Regions),
  y: data.map(row => row.Internet_Users),
  text: data.map(row => row.World_Regions),
  name: "Internet Users",
  type: "bar"
};

var trace3 = {
  x: data.map(row => row.World_Regions),
  y: data.map(row => row.Population_Perc_of_World),
  xaxis: 'x2',
  yaxis: 'y2',
  text: data.map(row => row.World_Regions),
  name: "Population",
  type: "scatter"
};

var trace4 = {
  x: data.map(row => row.World_Regions),
  y: data.map(row => row.Internet_World_Perc),
  text: data.map(row => row.World_Regions),
  xaxis: 'x2',
  yaxis: 'y2',
  name: "Internet Users",
  type: "scatter"
};


// Combining both traces
var data = [trace1, trace2];

var layout = {
  paper_bgcolor : 'rgb(78,93,108)',
  plot_bgcolor: 'rgb(78,93,108)',
  title: {
      text: "Population by region",
      font: {color: 'rgb(255,255,255)'}
  },
  yaxis:{
      title: 'Population',
      color:'rgb(255,255,255)'
  },
  xaxis:{
      title: 'Regions',
      color:'rgb(255,255,255)'},      
  
  legend: {
        font: {
       color: 'white'
     }},
    //  grid: {rows: 2, columns: 1, pattern: 'independent'},

};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);

// // var trace3 = {
// //   x: data.map(row => row.World_Regions),
// //   y: data.map(row => row.Penetration_Rate),
// //   name: "Population",
// //   type: "scatter"
// // };

// // var trace4 = {
// //   x: data.map(row => row.World_Regions),
// //   y: data.map(row => row.Population_Perc_of_World),
// //   name: "Internet Users",
// //   type: "scatter"
// // };



// // // Combining both traces
// // var data2 = [trace3, trace4];


// // var layout2 = {
// //   paper_bgcolor : 'rgb(78,93,108)',
// //   plot_bgcolor: 'rgb(78,93,108)',
// //   title: {
// //       text: "Population by region",
// //       font: {color: 'rgb(255,255,255)'}
// //   },
// //   yaxis:{
// //       title: 'Population',
// //       color:'rgb(255,255,255)'
// //   },
// //   xaxis:{
// //       title: 'Regions',
// //       color:'rgb(255,255,255)'},
  
// //   legend: {
// //         font: {
// //        color: 'white'
// //      }},

// // };

// // // Render the plot to the div tag with id "plot"
// // Plotly.newPlot("plot3", data2, layout2);

// // // Pie chart
// // var trace3 = {
// //   values: data.map(row => row.Population_Perc_of_World),
// //   labels: data.map(row => row.World_Regions),
// //   textfont: {
// //     color: 'white'},
// //   type: "pie"
// // };
// // var layout1 = {
// //   paper_bgcolor : 'rgb(78,93,108)',
// //   plot_bgcolor: 'rgb(78,93,108)',
// //   title: {
// //       text: "% of Population by Region",
// //       font: {color: 'rgb(255,255,255)'}
// //   },
  
// //   legend: {
// //     x: 0, y: -2,
// //     font: {
// //        color: 'white'
// //      }},
// //      margin: {
// //       l: 10,
// //       r: 10,
// //       t: 100,
// //       b: 10
// //   },

// // };

// // var data1 = [trace3];


// // Plotly.newPlot("plot2", data1, layout1);
});