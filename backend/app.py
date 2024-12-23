import os
from flask import Flask
from extensions import db, migrate
from models import User, Ticket  # Import your models

app = Flask(__name__)

# Get the absolute path for site.db
db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'site.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'  # Absolute path for the database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Suppress warning

# Initialize extensions
db.init_app(app)
migrate.init_app(app, db)

@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == '__main__':
    # Use app context to create the database
    with app.app_context():
        db.create_all()  # This creates the database file
    app.run(debug=True)