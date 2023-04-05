const url = "http://127.0.0.1:5000/api/v1.0/location";

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
    let values = [groundCount, aboveGroundCount, not_notedCount];
    // console.log(values)
    // console.log(names)

    let title = `test pie`
    
    let trace2 = [{
      labels: names,
      values: values,
      type: 'pie'
    }];

// let data = [trace1];

    let layout = {
      title: title
    };

    Plotly.newPlot("plot", trace2, layout);
    })};

buildPie()
