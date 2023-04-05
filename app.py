from flask import Flask, jsonify
from pymongo import MongoClient
import json
from bson.json_util import dumps
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


client = MongoClient('localhost', 27017)

db = client.squirrels_db
squirrels = db.squirrels


#-------------------------------------------------
# Flask Routes
#-------------------------------------------------
@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Welcome to this api for the NYC 2018 Squirrel Census<br/>"
        f"<br/>"   
        f"Available routes are:<br/>"
        f"<br/>"
        f"/api/v1.0/location<br/>"
        f"/api/v1.0/colour_plus<br/>"
        f"/api/v1.0/location_plus<br/>"
        f"/api/v1.0/colour<br/>"
        f"/api/v1.0/eating<br/>"
        f"/api/v1.0/foraging<br/>"
        f"/api/v1.0/climbing<br/>"
        f"/api/v1.0/chasing<br/>"
    )

#-------------------------------------------------
# #Route: location_heatmap
# @app.route('/api/v1.0/location_heatmap')
# def location():
#     query = {}
#     fields = {'Unique Squirrel ID', rounded_X: {$round: ["$X", 2]}, 'Y'}
#     results = list(census_2018.find(query, fields))
#     for user in results:
#         user["_id"]=str(user["_id"])
#     return json.dumps(results)


#-------------------------------------------------
#Route: location
@app.route('/api/v1.0/location')
def location():
    query = {}
    fields = {'Unique_Squirrel_ID', 'X', 'Y', 'Age', 'Shift', 'Primary_Fur_Color', 'Location', 'Running', 'Chasing', 'Climbing', 'Eating', 'Foraging', 'Kuks', 'Quaas', "Moans"}
    results = list(squirrels.find(query, fields))
    for user in results:
        user["_id"]=str(user["_id"])
    return json.dumps(results)

#-------------------------------------------------
#Route: colour_plus
@app.route('/api/v1.0/colour_plus')
def colour_plus():
    query = {}
    fields = {'Unique_Squirrel_ID', 'Primary_Fur_Color'}
    results = list(squirrels.find(query, fields))
    for user in results:
        user["_id"]=str(user["_id"])
    return json.dumps(results)

#-------------------------------------------------
#Route: location_plus
@app.route('/api/v1.0/location_plus')
def location_plus():
    query = {}
    fields = {'Unique_Squirrel_ID', 'X', 'Y', 'Shift', 'Age', 'Location', 'Primary Fur Color'}
    results = list(squirrels.find(query, fields))
    for user in results:
        user["_id"]=str(user["_id"])
    return json.dumps(results)

#-------------------------------------------------
#Route: colour
@app.route('/api/v1.0/colour')
def colour():
    query = [{'$group': {'_id': "$Primary_Fur_Color", 'count': { '$sum': 1 }}}]
    results = list(squirrels.aggregate(query))
    return json.dumps(results)

#-------------------------------------------------
#Route: eating
@app.route('/api/v1.0/eating')
def eating():
    query = [{'$group': {'_id': "$Eating", 'count': { '$sum': 1 }}}]
    results = list(squirrels.aggregate(query))
    return json.dumps(results)

#-------------------------------------------------
#Route: foraging
@app.route('/api/v1.0/foraging')
def foraging():
    query = [{'$group': {'_id': "$Foraging", 'count': { '$sum': 1 }}}]
    results = list(squirrels.aggregate(query))
    return json.dumps(results)

#-------------------------------------------------
#Route: climbing
@app.route('/api/v1.0/climbing')
def climbing():
    query = [{'$group': {'_id': "$Climbing", 'count': { '$sum': 1 }}}]
    results = list(squirrels.aggregate(query))
    return json.dumps(results)

#-------------------------------------------------
#Route: chasing
@app.route('/api/v1.0/chasing')
def chasing():
    query = [{'$group': {'_id': "$Chasing", 'count': { '$sum': 1 }}}]
    results = list(squirrels.aggregate(query))
    return json.dumps(results)

#-------------------------------------------------
# #Route: pipeline
# @app.route('/api/v1.0/pipeline')
# def pipeline():
#     # match_query = {'$match}': {}}
#     group_query = [{'$group': {'_id': "$Primary Fur Color", 'count': { '$sum': 1 }}}]
#     sort_values = {'$sort': { 'count': -1 }}
#     pipeline = [group_query, sort_values]
#     results = list(census_2018.aggregate(pipeline))
#     return dumps(results)

# Turning on the dubug mode - must go last
if __name__ == '__main__':
    app.run(debug=True)

    # data_one = dumps(results)
    # return (data_one)
    # data_one = dumps(results)
    # return data_one


# @app.route('/trying')
# def trying():
#     query = {'Unique Squirrel ID'}
#     results = census_2018.find(query)
#     data_one = dumps(all_data)
#     return data_one
    # data_one = dumps(r?esult)
    # return data_one?
    # return json.dumps(result)



