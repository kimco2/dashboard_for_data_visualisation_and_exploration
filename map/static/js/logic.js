//--------------------------------------------------------------------------
// CREATING THE BAR CHART
//--------------------------------------------------------------------------


//--------------------------------------------------------------------------
// CREATING THE DONUT CHART
//--------------------------------------------------------------------------
let data = [{
  values: [50,25,25],
  labels: ['a','b','c'],
  hole: .4,
  type: "pie"
}];

let layout = {
  height: 600,
  width: 800
};

Plotly.newPlot("donut", data, layout);


// buildDonut("donut", data, layout);


//--------------------------------------------------------------------------
// CREATING THE MAP
//--------------------------------------------------------------------------
// Creating the map object
let myMap = L.map("map", {
  center: [40.7826, -73.9656],
  zoom: 15
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let baseURL = "http://127.0.0.1:5000/api/v1.0/location";

// Get the data with d3.
d3.json(baseURL).then(function(response) {

  let markers = L.markerClusterGroup();

  // Loop through the data.
  for (let i = 0; i < response.length; i++) {

    // Set the data location property to a variable.
    let coords = response[i]
  
    // console.log(coords)
  
    // Check for the location property.
    if (coords) {

      // Add a new marker to the cluster group, and bind a popup.
      markers.addLayer(L.marker([coords.Y, coords.X])
        .bindPopup(response[i]._id));
    }

  }
  // Add our marker cluster layer to the map.
  myMap.addLayer(markers);
});

