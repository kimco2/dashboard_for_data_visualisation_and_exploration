# Project_3-Squirrel_Census

## Project outline

### Purpose
To understand the type of squirrels in NYC Central Park, their behaviour at the time of spotting, and where they were found in the park.

## Data source
2018 Central Park Squirrel Census. 
This contians 3023 squirrels.
https://data.cityofnewyork.us/Environment/2018-Central-Park-Squirrel-Census-Squirrel-Data/vfnx-vebw

## Objectives
- Number of squirrels found in the park
- Most common colour of the squirrels
- Where the squirrels were spotted (on the ground or up a tree)
- Whether they were foraging or eating when they were spotted
- Where abouts in the park the squirrels were found using latitude and longitude
    - Potential filters I’m thinking about are time of sighting(AM/PM), squirrel location (ground/tree), age (adult/juvenile).

## High level overview
1. Data available via CSV
2. Set the data up in mongodb
3. Use Flask to create an API
4. Use Javascript to connect the api to the visualisations