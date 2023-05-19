# NYC Squirrel Census 2018

### Purpose
 - To understand the type of squirrels in Central Park, where they are located, and their behaviour at time of observation.

### Data source
 - 2018 Central Park Squirrel Census. 
https://data.cityofnewyork.us/Environment/2018-Central-Park-Squirrel-Census-Squirrel-Data/vfnx-vebw

### Overview
- This was a full stack dvelopment, using data from a csv file, that was cleaned in python, then loaded into MongoDB.  MongoDB was then connected to a flask app, with javascript referencing the data to display it on a webpage via html and css.
 
- Here is an image of the webpage created.

![squirrels] (Squirrel_webpage.png) 
![squirrels] (squirrels_webpage.jpg) 

 ### Final visisulation

------------------------------------------------------------------------

Folder structure

-The main folder contains:
- **squirrel_setup.ipynb** - code for setting the data up in mongodb and includes data cleaning
- **squirrel_analysis.ipynb** - code for the initial analysis undertaken to understand the data story
- **app.py** - code for the flask app which holds the data being used in the online dashboard
- **index.html** - html code for the online dashboard

-The folder called **static** contains:
- **css / style.css** - the style for the online dashboard
- **js / logic.js** - the js code for the online dashboard
- **js / leaflet-heat.js** - code required for the heatmaps used within the dashboard.

-Below is a link to **powerpoint presentation** saved in google drive
https://drive.google.com/drive/folders/1AGjcTW9gMSALSFRLJm04Taxz8fiJudHt?usp=sharing


------------------------------------------------------------------------

## The initital project overview is noted below:

## Purpose
To understand the type of squirrels in Central Park, where they are located, and their behaviour at time of observation

## Data source
2018 Central Park Squirrel Census. 
This contians 3023 squirrels.
https://data.cityofnewyork.us/Environment/2018-Central-Park-Squirrel-Census-Squirrel-Data/vfnx-vebw

## Objectives
- Number of squirrels found in the park
- Most common colour of the squirrels
- Where the squirrels were spotted (on the ground or up a tree)
- Any behaviour they were undertaking when sighted
- Location of the squirrels in the park using latitude and longitude
    - Potential filters I’m thinking about are time of sighting(AM/PM) and squirrel colour.

## High level overview
1. Data available via CSV
2. Set the data up in mongodb
3. Use Flask to create an API
4. Use Javascript to connect the api to the visualisations