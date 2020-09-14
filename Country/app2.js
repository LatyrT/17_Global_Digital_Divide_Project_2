// from data.js

d3.json("../Project Work/02 - Analysis/04_Flask_SQLAchemy/WebIndex1_JavaScript_2.json").then((importedData) => {
    console.log(importedData);
    var data = importedData;

    var tableData = data;
    var tbody = d3.select("tbody");
    
    tableData.forEach((report) => {
        console.log(report);
        var row = tbody.append('tr');
    
        Object.entries(report).forEach(([key, value]) => {
            console.log(key, value);
            var cell = row.append('td');
            cell.text(value);
        });
    });
    
    var clickHandler = d3.select("#filter-btn");
    
    //Click event
    clickHandler.on("click", function() {
    
    //Remove existing table
    d3.select("tbody").html("");
    
    //Prevent page from refreshing
    d3.event.preventDefault();
    
    // Get the value property of the input elements
    var selectedCountries = d3.select("#countries").property("value");
    
    var overall = d3.select("#overalls").property("value");
    
    var universal = d3.select("#universals").property("value");
    
    var freedom = d3.select("#freedoms").property("value");
    
    var relevant = d3.select("#relevant_content").property("value");
    
    var selectedempowerment = d3.select("#empowerment").property("value");
    
    filteredData = tableData;
    
    
    if (selectedCountries) {
        filteredData = filteredData.filter(record => record.countries === selectedCountries);
    }
    if (overall) {
        filteredData = filteredData.filter(record => record.overalls >= overall);
    }
    if (universal) {
        filteredData = filteredData.filter(record => record.universals >= universal);
    }
    if (freedom) {
        filteredData = filteredData.filter(record => record.freedoms >= freedom);
    }
    if (relevant) {
        filteredData = filteredData.filter(record => record.relevant_content >= relevant);
    }
    if (selectedempowerment) {
        filteredData = filteredData.filter(record => record.empowerment >= selectedempowerment);
    }
    
    // Display the filtered dataset
    
    filteredData.forEach((report) => {
        var row = tbody.append('tr');
    
        Object.entries(report).forEach(([key, value]) => {
            console.log(key, value);
            var cell = row.append('td');
            cell.text(value);
        });
    });
    });
    


 });
