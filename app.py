from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)


class Leaderboard(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(80))
    score = db.Column(db.Integer)

@app.route('/')
def homepage():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug = True)
    # db.create_all()
