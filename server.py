from flask import Flask, jsonify, render_template, request, flash,  redirect
from model import connect_to_db
import helper
import requests, os
from jinja2 import StrictUndefined
import spotipy #spotify web api wrapper for python
import spotipy.oauth2 as oauth2 
from spotipy.oauth2 import SpotifyOAuth #Auth
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd #Dataframe
import time #Pause execution of Loops 
import pprint

from helper import sp
#run source secret.sh - env cid & secret

# Variables

app = Flask(__name__)
app.secret_key = os.environ['APP_SECRET']
app.jinja_env.undefined = StrictUndefined


SPOTIFY_API_URL = "https://accounts.spotify.com/api/token"


pp = pprint.PrettyPrinter(indent=4)

@app.route('/')
def homepage():
    """Show homepage."""
#will have homescreen animation, links to social, nav bar at the top with 'Project, Account, <3' 
    return render_template('index.html')

@app.route('/gradient')
def gradient():
    """Show gradient."""
#will have homescreen animation, links to social, nav bar at the top with 'Project, Account, <3' 
    return render_template('gradient.html')

@app.route('/track_api.json', methods=['POST'])
def get_api_search():
    """Getting search data from form (JAX post request in new_app.js)
        Request is sending key value pair of {name: "searched track input from form"} 
        to the server then render search results from Spotify API as json data"""
   
    # Get form search content from 'name' key
    track_search = request.form.get('name')

    results = sp.search(q=f'track:{track_search}', type='track', market ='US', limit=5)
    # results = sp.search(q=f'artist:{form_artist} track:{form_track}', type='artist,track', market ='US', limit=5)
    top_tracks = []


    items = results['tracks']['items']
    for track in results['tracks']['items']:
     
        top_tracks.append({
            'track_name': track['name'],
            'track_id': track['id'],
            'track_uri': track['uri']
        })

    pp.pprint(top_tracks)
 

    # return json data that is ready to be handled on the frontend

    return jsonify(top_tracks)



@app.route("/selectedTrack/<id>")
def selected_track(id):
  
  
    print(id) #id is printing

    print(helper.getTrackFeatures(id)) # this returns none
    print('\n\n\n\n\n')
    
    return jsonify(helper.getTrackFeatures(id))
    
  

if __name__ == '__main__':
    connect_to_db(app)
    app.debug = True
    app.run(host='0.0.0.0')
