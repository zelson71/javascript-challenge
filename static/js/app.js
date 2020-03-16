// from data.js
var tableData = data;


// YOUR CODE HERE!
// Variables

var button = d3.select("#filterBtn");
// var inputField1 = d3.select("#date");
var inputField1 = d3.select("#date");
console.log(inputField1);
var inputField2 = d3.select("#city");
var inputField3 = d3.select("#state");
var inputField4 = d3.select("#shape")
var tbody = d3.select("tbody");
var resetBtn = d3.select("#resetBtn");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

var datain = (dataInput) => {

    dataInput.forEach(ufo_sightings => {
        var row = tbody.append("tr");
        columns.forEach(column => row.append("td").text(ufo_sightings[column])
        )
    });
}


//Populate table
datain(data);

// Filter by attribute
button.on("click", () => {
    d3.event.preventDefault();
    var inputDate = inputField1.property("value").trim();



    var inputCity = inputField2.property("value").toLowerCase().trim();
    var inputState = inputField3.property("value").toLowerCase().trim()
    var inputShape = inputField4.property("value").trim();
    // Filter by field matching input value
    var filterCity = data.filter(data => data.city === inputCity);

    var filterState = data.filter(data => data.state === inputState);
    var filterShape = data.filter(data => data.shape === inputShape);
    var filterDate = data.filter(data => data.datetime === inputDate);
    console.log(filterDate)
    // console.log(data.datetime)
    var filterData = data.filter(data => data.datetime === inputDate && data.city === inputCity && data.state === inputState && data.shape == inputShape);


    format = d3.time
    // Add filtered sighting to table
    tbody.html("");

    let response = {
        filterData, filterCity, filterDate, filterState, filterShape
    }


    if (response.filterData.length !== 0) {
        datain(filterData);
    }
    else if (response.filterData.length === 0 && ((response.filterCity.length !== 0 || response.filterDate.length !== 0 || response.filterState !== 0 || response.filterShape !== 0))) {
        datain(filterCity) || datain(filterDate) || datain(filterState) || datain(filterShape);

    }
    else {
        tbody.append("tr").append("td").text("No results found!");
    }
});

resetBtn.on("click", () => {
    tbody.html("");
    document.getElementById("UFOForm").reset()
    datain(data)
    console.log("Table reset")
})