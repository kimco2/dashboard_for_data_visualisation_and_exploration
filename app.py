# Dependencies
from flask import Flask, jsonify
from pymongo import MongoClient
from flask import Flask
from flask_cors import CORS
# import json
# from bson.json_util import dumps
# import pprint
# from bson import json_util

# Flask Setup
app = Flask(__name__)
CORS(app)

# Database Setup
client = MongoClient('localhost', 27017)
db = client.squirrels_db
squirrels = db.squirrels


# Flask Routes
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



#Route: coordinates
@app.route('/api/v1.0/coordinates')
def coordinates():
    query = {}
    fields = {'Unique_Squirrel_ID', 'X', 'Y'}
    coord_results = list(squirrels.find(query, fields))
    for user in coord_results:
        user["_id"]=str(user["_id"])
    return jsonify(coord_results)


#Route: summary_stats
@app.route('/api/v1.0/summary_stats')
def summary_stats():
    query = {}
    fields = {'Unique_Squirrel_ID', 'Age', 'Primary_Fur_Color', 'Location'}
    summary_results = list(squirrels.find(query, fields))
    for user in summary_results:
        user["_id"]=str(user["_id"])
    return jsonify(summary_results)



#Route: activity
@app.route('/api/v1.0/activity')
def activity():
    query = {}
    fields = {'Unique_Squirrel_ID', 'Shift', 'Running', 'Chasing', 'Climbing', 'Eating', 'Foraging', 'Kuks', 'Quaas', "Moans"}
    activity_results = list(squirrels.find(query, fields))
    for user in activity_results:
        user["_id"]=str(user["_id"])
    return jsonify(activity_results)
    # return(activity_results)
    # page_sanitized = json.loads(json_util.dumps(results))
    # return(page_sanitized)



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
    return jsonify(time)
    # return jsonify(time) 

# Turning on the dubug mode - must go last
if __name__ == '__main__':
    app.run(debug=True)
