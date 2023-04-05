const url = "http://127.0.0.1:5000/api/v1.0/location";


//------------------------------
//Activity bar chart
//------------------------------

  d3.json(url).then((data)=>{
    // console.log(data)
    // Counting number of squirrels who were running
    let running_data = data.filter(object => object.Running == 'TRUE');
    let running = running_data.length;
    console.log(running)

     // Counting number of squirrels who were chasing
     let chasing_data = data.filter(object => object.Chasing == 'TRUE');
     let chasing = chasing_data.length;
     console.log(chasing)

    // Counting number of squirrels who were climbing
    let climbing_data = data.filter(object => object.Climbing == 'TRUE');
    let climbing = climbing_data.length;
    console.log(climbing)

    // Counting number of squirrels who were climbing
    let no_activity_data = data.filter(object => object.Climbing == 'FALSE' && object.Chasing == 'FALSE' && object.Running == 'FALSE');
    let no_activity = no_activity_data.length;
    console.log(no_activity)
 
    let names = ['Running', 'Chasing', 'Climbing', 'Not active'];
      let values = [running, chasing, climbing, no_activity];
      // console.log(values)
      // console.log(names)

      let title = `activity chart`
      
      let trace1 = [{
        x: names,
        y: values,
        type: 'bar',
        marker:{color: ['22577a', '22577a', '22577a', '22577a']}
      }];

      let layout = {
        title: title
      };

      Plotly.newPlot("activity_plot", trace1, layout);
      });


    
//------------------------------
//Bar Chart
//------------------------------
function buildBar(when){
  d3.json(url).then((data)=>{
    // console.log(data)
    // let count = 0;
    // console.log(data)
    let data2 = data.filter(object => object.Shift == when);
    // console.log(data2)
    
    let total = 0
    let cinnamonCount = 0
    let grayCount = 0
    let blackCount = 0
    let Not_notedCount = 0

     for (let i = 0; i < data2.length; i++){
      row = data2[i]

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
      let names = ['Gray', 'Cinnamon', 'Black', 'Not noted'];
      let values = [grayCount, cinnamonCount, blackCount, Not_notedCount];
      // console.log(values)
      // console.log(names)

      let title = `test`
      
      let trace1 = [{
        x: names,
        y: values,
        type: 'bar',
        marker:{color: ['22577a', '22577a', '22577a', '22577a']}
      }];

// let data = [trace1];

      let layout = {
        title: title
      };

      Plotly.newPlot("plot", trace1, layout);
      })};


    buildBar('AM')

//------------------------------
//Pie
//------------------------------

function buildPie(){
d3.json(url).then((data)=>{
  // console.log(data)
  // let count = 0;
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
    let names = ['Ground', 'Above ground', 'Not noted'];
    let counts = [groundCount, aboveGroundCount, not_notedCount];
    // console.log(values)
    // console.log(names)

    let title = `test pie`
    
    let trace1 = [{
      labels: names,
      values: counts,
      hole: .4,
      type: 'pie',
      hoverinfo: "label+percent",
      textinfo: "label+percent",
      // pull: [0, 0.1, 0],
      marker: {
        'colors': [
          'd4a373',
          'ccd5ae',
          'd6ccc2'
        ]}
      
    }];

// let data = [trace1];

    let layout = {
      title: title,
      height: 600,
      width: 800,
      showlegend: false,
      annotations: [
        {
          font: {
            size: 20
          },
          showarrow: false,
          text: 'Location',
          x: 0.50,
          y: 0.49
        }],
    };

    Plotly.newPlot("pie", trace1, layout);
    })};

// buildPie()


///////---------------------------------------------------
/// DO NOT DELETE THIS WORKED
///////---------------------------------------------------

// const url = "http://127.0.0.1:5000/api/v1.0/location";

// //------------------------------
// //Bar Chart
// //------------------------------
// function buildBar(){
//   d3.json(url).then((data)=>{
//     // console.log(data)
//     // let count = 0;
//     let total = 0
//     let cinnamonCount = 0
//     let grayCount = 0
//     let blackCount = 0
//     let Not_notedCount = 0

//     for (let i = 0; i < data.length; i++){
//       row = data[i]

//       total += 1 

//       // Conditional statement
//       if (row.Primary_Fur_Color == 'Cinnamon'){
//         cinnamonCount +=1;
//       } else if (row.Primary_Fur_Color == 'Gray'){
//         grayCount += 1;
//       } else if (row.Primary_Fur_Color =='Black'){
//         blackCount += 1;
//       } else{
//         Not_notedCount += 1;
//       }
//       }
//       let names = ['Gray', 'Cinnamon', 'Black', 'Not noted'];
//       let values = [grayCount, cinnamonCount, blackCount, Not_notedCount];
//       // console.log(values)
//       // console.log(names)

//       let title = `test`
      
//       let trace1 = [{
//         x: names,
//         y: values,
//         type: 'bar',
//         marker:{color: ['22577a', '22577a', '22577a', '22577a']}
//       }];

// // let data = [trace1];

//       let layout = {
//         title: title
//       };

//       Plotly.newPlot("plot", trace1, layout);
//       })};

// //------------------------------
// //Pie
// //------------------------------

// function buildPie(){
// d3.json(url).then((data)=>{
//   // console.log(data)
//   // let count = 0;
//   let total = 0
//   let groundCount = 0
//   let aboveGroundCount = 0
//   let not_notedCount = 0
  
//   for (let i = 0; i < data.length; i++){
//     row = data[i]

//     total += 1 

//     // Conditional statement
//     if (row.Location == 'Above Ground'){
//       groundCount +=1;
//     } else if (row.Location == 'Ground Plane'){
//       aboveGroundCount += 1;
//     } else{
//       not_notedCount += 1;
//     }
//     }
//     let names = ['Ground', 'Above ground', 'Not noted'];
//     let counts = [groundCount, aboveGroundCount, not_notedCount];
//     // console.log(values)
//     // console.log(names)

//     let title = `test pie`
    
//     let trace1 = [{
//       labels: names,
//       values: counts,
//       hole: .4,
//       type: 'pie',
//       hoverinfo: "label+percent",
//       textinfo: "label+percent",
//       // pull: [0, 0.1, 0],
//       marker: {
//         'colors': [
//           'd4a373',
//           'ccd5ae',
//           'd6ccc2'
//         ]}
      
//     }];

// // let data = [trace1];

//     let layout = {
//       title: title,
//       height: 600,
//       width: 800,
//       showlegend: false,
//       annotations: [
//         {
//           font: {
//             size: 20
//           },
//           showarrow: false,
//           text: 'Location',
//           x: 0.50,
//           y: 0.49
//         }],
//     };

//     Plotly.newPlot("pie", trace1, layout);
//     })};

// buildBar()
// buildPie()