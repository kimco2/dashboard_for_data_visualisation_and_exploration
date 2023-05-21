# Where are the squirrels in Central Park NYC?

### **Purpose**
 To understand the type of squirrels in Central Park, where they are located and their behaviour at time of observation.

 ### **Overview**
This was a full stack development, using data from the [2018 Central Park Squirrel Census](https://data.cityofnewyork.us/Environment/2018-Central-Park-Squirrel-Census-Squirrel-Data/vfnx-vebw).

### **Aspects covered**
- Cleaning data in python
- Creating a database in MongoDB and loading data into it
- Exploratory data analysis
- Connecting MongoDB to a flask api
- Using javascript to reference data contained in the flask api to display on a web page via html and css.
 
### **Web page**
Below is an image of the created webpage.  The charts were designed to be interactive for users, you can:
- Select different layers on the heat map.
- Click on and off the bars on the radial charts
-  Select a time to display the data on squirrel activity

![squirrels_webpage](squirrels_webpage.jpg)

### **Report**
 - A written report is saved in the repo as **Squirrels_NYC_report.pdf**

### **Folder structure**
The main folder contains:
- **squirrel_setup.ipynb** - code for setting the data up in mongodb and includes data cleaning
- **squirrel_analysis.ipynb** - code for the initial analysis undertaken to understand the data story
- **app.py** - code for the flask app which holds the data being used in the online dashboard
- **index.html** - html code for the online dashboard
- **Squirrels_NYC_report.pdf** - written report

The folder called **static** contains:
- **css / style.css** - the style for the online dashboard
- **js / logic.js** - the js code for the online dashboard
- **js / leaflet-heat.js** - code required for the heatmaps used within the dashboard.

<br>

---

### **Contact**
Email: kymcoleman@gmail.com

---