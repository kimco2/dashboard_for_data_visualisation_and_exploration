// const url = "http://127.0.0.1:5000/api/v1.0/location";
// const timeURL = "http://127.0.0.1:5000/api/v1.0/time_options";
const coordinatesURL = "http://127.0.0.1:5000/api/v1.0/coordinates";
const summaryStatsURL = "http://127.0.0.1:5000/api/v1.0/summary_stats";
const activityURL = "http://127.0.0.1:5000/api/v1.0/activity";
const timeSightingURL = "http://127.0.0.1:5000/api/v1.0/time_sighting";

//-------------------------------------------------------------------------------
// Create a heatmap based on squirrel location
let myMap = L.map("map", {
  center: [40.7826, -73.9656],
  zoom: 13.5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json(coordinatesURL).then(function(response) {

  // console.log(response);

  let heatArray = [];

  for (let i = 0; i < response.length; i++) {
    // let location = features[i].geometry;
    if (response) {
      // console.log(response);
      heatArray.push([response[i].Y, response[i].X]);
    }

  }
  // console.log(heatArray)
  let heat = L.heatLayer(heatArray, {
    scaleRadius: true,
    maxOpacity:0.5,
    minOpacity: 0,
    radius:10,
    blur: 15
  }).addTo(myMap);

});


//---------------------------------------------------------------------------------
// Build chart on squirrel colour
function buildColour(){
  d3.json(summaryStatsURL).then((data)=>{
             
          // define variables
          let total = 0
          let cinnamonCount = 0
          let grayCount = 0
          let blackCount = 0
          let Not_notedCount = 0
          // loop through data
           for (let i = 0; i < data.length; i++){
            row = data[i]
            // add one to total fo reach row
            total += 1 
            // Conditional statement 
            if (row.Primary_Fur_Color == 'Cinnamon'){
              cinnamonCount +=1;
            } else if (row.Primary_Fur_Color == 'Gray'){
              grayCount += 1;
            } else if (row.Primary_Fur_Color =='Black'){
              blackCount += 1;
            } else{
              Not_notedCount += 1;
            }
            }
            
            // calcuate the percentages for each
            let cinnamonPer  = Math.trunc((cinnamonCount/total)*100);
            let grayPer  = Math.trunc((grayCount/total)*100);
            let blackPer  = Math.trunc((blackCount/total)*100);
            let nothingPer  = Math.trunc((Not_notedCount/total)*100);
  
            // assign percents and names to fields to use in charting
            let names = ['Gray', 'Cinnamon', 'Black'];
            let values = [grayPer, cinnamonPer, blackPer];
  
          var options = {
              series: values,
              chart: {
              height: 300,
              type: 'radialBar',
          },
          plotOptions: {
              radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                  margin: 5,
                  size: '30%',
                  background: 'transparent',
                  image: undefined,
              },
              dataLabels: {
                  name: {
                  show: false,
                  },
                  value: {
                  show: false,
                  }
              }
              }
          },
          colors: ['#85c7de', '#0084ff', '#39539E'],
          labels: names,
          legend: {
              show: true,
              floating: true,
              fontSize: '16px',
              position: 'left',
              offsetX: 10,
              offsetY: 15,
              labels: {
              useSeriesColors: true,
              },
              markers: {
              size: 0
              },
              formatter: function(seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              },
              itemMargin: {
              vertical: 3
              }
          },
          responsive: [{
              breakpoint: 480,
              options: {
              legend: {
                  show: false
              }
              }
          }]
          };
  
          var chart = new ApexCharts(document.querySelector("#colour"), options);
          chart.render();
          });
          }
  
  
  //---------------------------------------------------------------------------------
  // Build chart on squirrel age
  function buildAge(){
      d3.json(summaryStatsURL).then((response)=>{
          let data = response.filter(object => object.Age);
                  
          let total = 0
          let adultCount = 0
          let juvenileCount = 0
          let notNotedCount = 0
      
           for (let i = 0; i < data.length; i++){
            row = data[i]
      
            total += 1 
      
            // Conditional statement
            if (row.Age == 'Adult'){
              adultCount +=1;
            } else if (row.Age == 'Juvenile'){
              juvenileCount += 1;
            } else{
              notNotedCount += 1;
            }
            }
               
            let adultPer  = Math.trunc((adultCount/total)*100);
            let juvenilePer  = Math.trunc((juvenileCount/total)*100);
            let nothingPer  = Math.trunc((notNotedCount/total)*100);
  
            let names = ['Adult', 'Juvenile'];
            let values = [adultPer, juvenilePer];
  
          var options = {
              series: values,
              chart: {
              height: 300,
              type: 'radialBar',
          },
          plotOptions: {
              radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                  margin: 5,
                  size: '30%',
                  background: 'transparent',
                  image: undefined,
              },
              dataLabels: {
                  name: {
                  show: false,
                  },
                  value: {
                  show: false,
                  }
              }
              }
          },
          colors: ['#85c7de', '#0084ff'],
          labels: names,
          legend: {
              show: true,
              floating: true,
              fontSize: '16px',
              position: 'left',
              offsetX: 10,
              offsetY: 15,
              labels: {
              useSeriesColors: true,
              },
              markers: {
              size: 0
              },
              formatter: function(seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              },
              itemMargin: {
              vertical: 3
              }
          },
          responsive: [{
              breakpoint: 480,
              options: {
              legend: {
                  show: false
              }
              }
          }]
          };
  
          var chart = new ApexCharts(document.querySelector("#age"), options);
          chart.render();
          });
          }
  
  
  //---------------------------------------------------------------------------------
  // Build chart on squirrel colour
  
  function buildLocation(){
      d3.json(summaryStatsURL).then((data)=>{
  
        let total = 0
        let groundCount = 0
        let aboveGroundCount = 0
        let not_notedCount = 0
        
        for (let i = 0; i < data.length; i++){
          row = data[i]
      
          total += 1 
      
          // Conditional statement
          if (row.Location == 'Above Ground'){
            groundCount +=1;
          } else if (row.Location == 'Ground Plane'){
            aboveGroundCount += 1;
          } else{
            not_notedCount += 1;
          }
          }
                      
            let groundPer  = Math.trunc((groundCount/total)*100);
            let aboveGroundPer  = Math.trunc((aboveGroundCount/total)*100);
            let nothingPer  = Math.trunc((not_notedCount/total)*100);
  
            let names = ['Above ground', 'Ground'];
            let values = [aboveGroundPer, groundPer];
  
          var options = {
              series: values,
              chart: {
              height: 300,
              type: 'radialBar',
          },
          plotOptions: {
              radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                  margin: 5,
                  size: '30%',
                  background: 'transparent',
                  image: undefined,
              },
              dataLabels: {
                  name: {
                  show: false,
                  },
                  value: {
                  show: false,
                  }
              }
              }
          },
          colors: ['#85c7de', '#0084ff'],
          labels: names,
          legend: {
              show: true,
              floating: true,
              fontSize: '16px',
              position: 'left',
              offsetX: 4,
              offsetY: 15,
              labels: {
              useSeriesColors: true,
              },
              markers: {
              size: 0
              },
              formatter: function(seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              },
              itemMargin: {
              vertical: 3
              }
          },
          responsive: [{
              breakpoint: 480,
              options: {
              legend: {
                  show: false
              }
              }
          }]
          };
  
          var chart = new ApexCharts(document.querySelector("#location"), options);
          chart.render();
          });
          }




  //------------------------------
//Activity bar chart
//------------------------------

function buildActivityChart(when){
  d3.json(activityURL).then((response)=>{
    data = response.filter(object => object.Shift == when);
    // console.log(data)

    // Counting total number of squirrels
    let total = data.length;
    // console.log(total)

    // Counting number of squirrels who were running
    let runningData = data.filter(object => object.Running == 'TRUE');
    let running = runningData.length;
    let runningPer = Math.trunc((running / total)*100)
    console.log(running)
    console.log(runningPer)

     // Counting number of squirrels who were chasing
     let chasingData = data.filter(object => object.Chasing == 'TRUE');
     let chasing = chasingData.length;
     let chasingPer = Math.trunc((chasing / total)*100)
  
    // Counting number of squirrels who were climbing
    let climbingData = data.filter(object => object.Climbing == 'TRUE');
    let climbing = climbingData.length;
    let climbingPer = Math.trunc((climbing / total)*100)
    // console.log(climbingPer)

    // Counting number of squirrels who were doing any movment
    let someActivityData = data.filter(object => object.Climbing == 'TRUE' || object.Chasing == 'TRUE' || object.Running == 'TRUE');
    let someActivity = someActivityData.length;
    let someActivityPer = Math.trunc((someActivity / total)*100)
 
    let names = ['Some movement', 'Climbing', 'Running', 'Chasing'];
      let values = [someActivityPer, climbingPer, runningPer, chasingPer];
  
      let trace1 = [{
        x: names,
        y: values,
        type: 'bar',
        marker:{color: ['#335c81', '#85c7de', '#85c7de', '#85c7de']},
        text: values,
        textposition: 'auto',
        hoverinfo: 'none',
        width: [0.8, 0.8, 0.8, 0.8]
      }];

      let layout = {
        bargap: .5,
        width: 475,
        height: 400
        };

      Plotly.newPlot("activity", trace1, layout);
      });
    };


  //------------------------------
//Eating bar chart
//------------------------------

function buildEating(when){
  d3.json(activityURL).then((response)=>{
    data = response.filter(object => object.Shift == when);
    // console.log(data)

    // Counting total number of squirrels
    let total = data.length;
    // console.log(total)

    // Counting number of squirrels who were eating
    let eatingData = data.filter(object => object.Eating == 'TRUE');
    let eating = eatingData.length;
    let eatingPer = Math.trunc((eating / total)*100)
    // console.log(eatingPer)

     // Counting number of squirrels who were foraging
     let foragingData = data.filter(object => object.Foraging == 'TRUE');
     let foraging = foragingData.length;
     let foragingPer = Math.trunc((foraging / total)*100)
    //  console.log(foragingPer)

      // Counting number of squirrels who were eating or foraging
      let someEatingData = data.filter(object => object.Foraging == 'TRUE' || object.Eating == 'TRUE');
      let someEating = someEatingData.length;
      let someEatingPer = Math.trunc((someEating / total)*100)
     //  console.log(notEatingPer)
 
    let names = ['Eating or Foraing', 'Foraging', 'Eating'];
    let values = [someEatingPer, foragingPer, eatingPer];

      
      let trace1 = [{
        x: names,
        y: values,
        type: 'bar',
        marker:{color: ['#335c81', '#85c7de', '#85c7de']},
        text: values,
        textposition: 'auto',
        hoverinfo: 'none',
        width: [0.8, 0.8, 0.8]
      }];

      let layout = {
        bargap: .5,
        width: 450,
        height: 400
        };

      Plotly.newPlot("eating", trace1, layout);
      });
    };




  //------------------------------
//Noises bar chart
//------------------------------

function buildNoises(when){
  d3.json(activityURL).then((response)=>{
    data = response.filter(object => object.Shift == when);
    // console.log(data)

    // Counting total number of squirrels
    let total = data.length;
    // console.log(total)

    // Counting number of squirrels who were making a kuks sound
    let kuksData = data.filter(object => object.Kuks == 'TRUE');
    let kuks = kuksData.length;
    let kuksPer = Math.trunc((kuks / total)*100)
    // console.log(kuks)
    // console.log(kuksPer)

     // Counting number of squirrels who were making a quaas sound
     let quaasData = data.filter(object => object.Quaas == 'TRUE');
     let quaas = quaasData.length;
     let quaasPer = Math.trunc((quaas / total)*100)
    //  console.log(quaasPer)

    // Counting number of squirrels who were moaning
    let moansData = data.filter(object => object.Moans == 'TRUE');
    let moans = moansData.length;
    let moansPer = Math.trunc((moans / total)*100)
   //  console.log(moansPer)

      // Counting number of squirrels who were making some noise
      let someSoundData = data.filter(object => object.Kuks == 'TRUE' || object.Quaas == 'TRUE' || object.Moans == 'TRUE');
      let someSound = someSoundData.length;
      let someSoundPer = Math.trunc((someSound / total)*100)
     //  console.log(noSoundPer)
 
    let names = ['Some noise', 'Kuks', 'Quaas', 'Moans'];
      let values = [someSoundPer, kuksPer, quaasPer, moansPer];
      
      let trace1 = [{
        x: names,
        y: values,
        type: 'bar',
        marker:{color: ['#335c81', '#85c7de', '#85c7de', '#85c7de']},
        text: values,
        textposition: 'auto',
        hoverinfo: 'none',
        width: [0.8, 0.8, 0.8, 0.8]
      }];

     let layout = {
        bargap: .5,
        width: 450,
        height: 400
        };

      Plotly.newPlot("noises", trace1, layout);
      });
    };


    // ----------------------------------------
// Function for when webpage is initialised
// This includes the drop down selector and setting the inital charts to show data from id '940'.
// ----------------------------------------
function init(){
  // Selecting the drop down component
  let selector = d3.select("#selDataset");
  // Reading the JSON url
  d3.json(timeSightingURL).then((data) => {
    // Getting the 'names' from the json file
    let sampleNames = data.time;
    // console.log(sampleNames)
    // Adding all the names to the drop down component and assigning their name as the value
    for (let i = 0; i < sampleNames.length; i++)
        {selector
              .append("option")
              .text(sampleNames[i])
              .property("value", sampleNames[i]);
     };

    //  Show initital charts using the data from id 940
    buildColour();
    buildAge();
    buildLocation();
    buildActivityChart("AM");
    buildEating("AM");
    buildNoises("AM");
    })}; 


        // Function that updates the charts and metadata when a different ID is selected
// ----------------------------------------
function optionChanged(newSelect){
  buildActivityChart(newSelect);
  buildEating(newSelect);
  buildNoises(newSelect);
};

init();
