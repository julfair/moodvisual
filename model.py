"""Models for favorite tracks."""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """A user."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)

    def __repr__(self):
        return f"<User user_id={self.user_id} email={self.email}>"


class Track(db.Model):
    """A track."""

    __tablename__ = "tracks"

    track_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    title = db.Column(db.String)
    energy= db.Column(db.Float)
    danceability= db.Column(db.Float)
    loudness= db.Column(db.Float)
    tempo= db.Column(db.Float)
    time_signature= db.Column(db.Integer)
  

    def __repr__(self):
        return f"<Track track_id={self.track_id} title={self.title}>"


class Favorite(db.Model):
    """A favorite track."""

    __tablename__ = "favorites"

    favorite_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    favorite = db.Column(db.Boolean)
    track_id = db.Column(db.Integer, db.ForeignKey("tracks.track_id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))

    track = db.relationship("Track", backref="favorites")
    user = db.relationship("User", backref="favorites")

    def __repr__(self):
        return f"<Track track_id={self.track_id} Favorite={self.favorite}>"


def connect_to_db(flask_app, db_uri="idk", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)