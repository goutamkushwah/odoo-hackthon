from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# Database config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'logins.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database model
class Login(db.Model):
    Email = db.Column(db.String(200), primary_key=True)
    Pass = db.Column(db.String(200))
    Skill = db.Column(db.String(500), default="")
    Location = db.Column(db.String(500), default="")
    Private = db.Column(db.Boolean, default=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)


# Homepage route
@app.route("/")
def index():
    return render_template("index.html")

# Login/Signup form route
@app.route("/login", methods=["GET", "POST"])
def login():
    message = ""
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        confirm = request.form.get("confirm")
        skill = request.form.get("skill")
        location = request.form.get("location")
        private = request.form.get("private") == "on"

        if confirm:
            if password != confirm:
                message = "Passwords do not match"
            else:
                user = Login.query.filter_by(Email=email).first()
                if user:
                    message = "User already exists"
                else:
                    new_user = Login(
                        Email=email, Pass=password,
                        Skill=skill, Location=location,
                        Private=private
                    )
                    db.session.add(new_user)
                    db.session.commit()
                    message = "Signup successful"

    return render_template("login.html", message=message)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
