from flask import Flask, jsonify
from pymongo import MongoClient
import json
from bson.json_util import dumps
from flask import Flask
from flask_cors import CORS
import pprint
from bson import json_util


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
        f"<br/>"   
        f"<h2>Welcome to this api for the NYC 2018 Squirrel Census</h2>"
        # f"<br/>"   
        f"<h3>Available routes are:</h3>"
        # f"<br/>"
        f"/api/v1.0/coordinates</br>"
        f"/api/v1.0/summary_stats</br>"
        f"/api/v1.0/activity</br>"
        f"/api/v1.0/time_sighting"
   )

#-------------------------------------------------
#Route: coordinates
@app.route('/api/v1.0/coordinates')
def coordinates():
    query = {}
    fields = {'Unique_Squirrel_ID', 'X', 'Y'}
    results = list(squirrels.find(query, fields))
    for user in results:
        user["_id"]=str(user["_id"])
    return jsonify(results)



#-------------------------------------------------
#Route: summary_stats
@app.route('/api/v1.0/summary_stats')
def summary_stats():
    query = {}
    fields = {'Unique_Squirrel_ID', 'Age', 'Primary_Fur_Color', 'Location'}
    results = list(squirrels.find(query, fields))
    for user in results:
        user["_id"]=str(user["_id"])
    return jsonify(results)
    # page_sanitized = json.loads(json_util.dumps(results))
    # return(page_sanitized)

#-------------------------------------------------
#Route: activity
@app.route('/api/v1.0/activity')
def activity():
    query = {}
    fields = {'Unique_Squirrel_ID', 'Shift', 'Running', 'Chasing', 'Climbing', 'Eating', 'Foraging', 'Kuks', 'Quaas', "Moans"}
    results = list(squirrels.find(query, fields))
    for user in results:
        user["_id"]=str(user["_id"])
    return jsonify(results)
    # page_sanitized = json.loads(json_util.dumps(results))
    # return(page_sanitized)

#-------------------------------------------------
#Route: time_sighting
@app.route('/api/v1.0/time_sighting')
def time_sighting():
    query = [{'$group': {'_id': "$Shift", 'count': { '$sum': 1 }}}]
    results = list(squirrels.aggregate(query))
    time_options = []
    for row in results:
        val_list = list(row.values())
        value = val_list[0]
        time_options.append(value)
    time = {"time": time_options}
    # return json.dumps(time)  
    return jsonify(time)  

# Turning on the dubug mode - must go last
if __name__ == '__main__':
    app.run(debug=True)

#-------------------------------------------------
#Route: time_options
# @app.route('/api/v1.0/time_options')
# def time_options():
#     query = [{'$group': {'_id': "$Shift", 'count': { '$sum': 1 }}}]
#     results = list(squirrels.aggregate(query))
#     time_options = []
#     for row in results:
#         val_list = list(row.values())
#         value = val_list[0]
#         time_options.append(value)
#     time = {"time": time_options}
#     return json.dumps(time)    

#-------------------------------------------------
#Route: location
# @app.route('/api/v1.0/location')
# def location():
#     query = {}
#     fields = {'Unique_Squirrel_ID', 'X', 'Y', 'Age', 'Shift', 'Primary_Fur_Color', 'Location', 'Running', 'Chasing', 'Climbing', 'Eating', 'Foraging', 'Kuks', 'Quaas', "Moans"}
#     results = list(squirrels.find(query, fields))
#     for user in results:
#         user["_id"]=str(user["_id"])
#     return jsonify(results)
    # page_sanitized = json.loads(json_util.dumps(results))
    # return(page_sanitized)


#-------------------------------------------------
# Route: location
# @app.route('/api/v1.0/location_test')
# def location_test():
#     query = {}
#     fields = {'Unique_Squirrel_ID', 'X', 'Y', 'Age', 'Shift', 'Primary_Fur_Color', 'Location', 'Running', 'Chasing', 'Climbing', 'Eating', 'Foraging', 'Kuks', 'Quaas', "Moans"}
#     results = list(squirrels.find(query, fields))
#     for user in results:
#         user["_id"]=str(user["_id"])
#     return jsonify(results)
    
    
    # query = {}
    # fields = {'Unique_Squirrel_ID', 'X', 'Y', 'Age', 'Shift', 'Primary_Fur_Color', 'Location', 'Running', 'Chasing', 'Climbing', 'Eating', 'Foraging', 'Kuks', 'Quaas', "Moans"}
    # results = list(squirrels.find(query, fields))
    # location_options = []
    # for row in results:
    #     val_list = list(row.values())
    #     value = val_list[0]
    #     location_options.append(value)
    # location_test = {"location" : location_options}
    # location_format = json.loads(json_util.dumps(location_test))
    # return(location_format)
    # for user in results:
    #     user["_id"]=str(user["_id"])
    # return json.dumps(results)
    # page_sanitized = json.loads(json_util.dumps(results))
    # return(page_sanitized)
    
    # results_format = json.dumps(results, indent=0)
    # pp = pprint.PrettyPrinter(indent=4)
    # pp.pprint(results_format)
    # return(results_format)

#         
#-------------------------------------------------
# #Route: colour_plus
# @app.route('/api/v1.0/colour_plus')
# def colour_plus():
#     query = {}
#     fields = {'Unique_Squirrel_ID', 'Primary_Fur_Color'}
#     results = list(squirrels.find(query, fields))
#     for user in results:
#         user["_id"]=str(user["_id"])
#     return json.dumps(results)

# #-------------------------------------------------
# #Route: location_plus
# @app.route('/api/v1.0/location_plus')
# def location_plus():
#     query = {}
#     fields = {'Unique_Squirrel_ID', 'X', 'Y', 'Shift', 'Age', 'Location', 'Primary Fur Color'}
#     results = list(squirrels.find(query, fields))
#     for user in results:
#         user["_id"]=str(user["_id"])
#     return json.dumps(results)

# #-------------------------------------------------
# #Route: time_options_test
# @app.route('/api/v1.0/time_options_test')
# def time_options_test():
#     query = [{'$group': {'_id': "$Shift", 'count': { '$sum': 1 }}}]
#     results = list(squirrels.aggregate(query))
#     time_options = []
#     for row in results:
#         val_list = list(row.values())
#         value = val_list[0]
#         time_options.append(value)
#     time = {"time": time_options}
#     # return json.dumps(time)      
#     page_sanitized = json.loads(json_util.dumps(time))
#     return(page_sanitized)


# #-------------------------------------------------
# #Route: time_options
# @app.route('/api/v1.0/time_options')
# def time_options():
#     query = [{'$group': {'_id': "$Shift", 'count': { '$sum': 1 }}}]
#     results = list(squirrels.aggregate(query))
#     time_options = []
#     for row in results:
#         val_list = list(row.values())
#         value = val_list[0]
#         time_options.append(value)
#     time = {"time": time_options}
#     return json.dumps(time)    


# #-------------------------------------------------
# #Route: colour
# @app.route('/api/v1.0/colour')
# def colour():
#     query = [{'$group': {'_id': "$Primary_Fur_Color", 'count': { '$sum': 1 }}}]
#     results = list(squirrels.aggregate(query))
#     return json.dumps(results)

# #-------------------------------------------------
# #Route: eating
# @app.route('/api/v1.0/eating')
# def eating():
#     query = [{'$group': {'_id': "$Eating", 'count': { '$sum': 1 }}}]
#     results = list(squirrels.aggregate(query))
#     return json.dumps(results)

# #-------------------------------------------------
# #Route: foraging
# @app.route('/api/v1.0/foraging')
# def foraging():
#     query = [{'$group': {'_id': "$Foraging", 'count': { '$sum': 1 }}}]
#     results = list(squirrels.aggregate(query))
#     return json.dumps(results)

# #-------------------------------------------------
# #Route: climbing
# @app.route('/api/v1.0/climbing')
# def climbing():
#     query = [{'$group': {'_id': "$Climbing", 'count': { '$sum': 1 }}}]
#     results = list(squirrels.aggregate(query))
#     return json.dumps(results)

# #-------------------------------------------------
# #Route: chasing
# @app.route('/api/v1.0/chasing')
# def chasing():
#     query = [{'$group': {'_id': "$Chasing", 'count': { '$sum': 1 }}}]
#     results = list(squirrels.aggregate(query))
#     return json.dumps(results)

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



