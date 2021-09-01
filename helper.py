#from server import sp
import requests, os
import spotipy #spotify web api wrapper for python
import spotipy.oauth2 as oauth2 
from spotipy.oauth2 import SpotifyOAuth #Auth
from spotipy.oauth2 import SpotifyClientCredentials


CLIENT_ID = os.environ["SPOTIPY_CLIENT_ID"]
CLIENT_SECRET = os.environ["SPOTIPY_CLIENT_SECRET"]
CLIENT_URI = os.environ["SPOTIPY_REDIRECT_URI"]

client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager, requests_session=False)




def getTrackFeatures(id):
  track_info = sp.track(id)
  features = sp.audio_features(id)

  # meta
  name = track_info['name']
  album = track_info['album']['name']
  artist = track_info['album']['artists'][0]['name']
  

  # features
  acousticness = features[0]['acousticness']
  danceability = features[0]['danceability']
  energy = features[0]['energy']
  loudness = features[0]['loudness']
  tempo = features[0]['tempo']
  time_signature = features[0]['time_signature']

  track = {'name':name, 'album':album, 'artist':artist, "danceability": danceability, "energy": energy, 
'loudness': loudness, 'tempo': tempo, 'time_signature':time_signature}
  return track


