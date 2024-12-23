import os
from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
from extensions import db, migrate
from models import User, Ticket  # Import your models

app = Flask(__name__)

CORS(app)

# Get the absolute path for site.db
db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'site.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'  # Absolute path for the database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Suppress warning

print(f"Database path resolved to: {db_path}")  # Debugging line

# Initialize extensions
db.init_app(app)
migrate.init_app(app, db)

@app.route('/')
def home():
    return "Hello, Flask!"

# New endpoint to fetch tickets
@app.route('/api/tickets', methods=['GET'])
def fetch_tickets():
    try:
        tickets = Ticket.query.all()  # Fetch all tickets from the database
        ticket_list = []
        for ticket in tickets:
            ticket_list.append({
                "id": ticket.id,
                "name": ticket.name,
                "description": ticket.description,
                "created_at": ticket.created_at.strftime("%Y-%m-%d %H:%M:%S") if ticket.created_at else None,
                "due_date": ticket.due_date.strftime("%Y-%m-%d") if ticket.due_date else None,
                "status": ticket.status,
                "priority": ticket.priority,
                "author_id": ticket.author_id,
            })
        return jsonify(ticket_list), 200
    except Exception as e:
        print(f"Error occurred: {e}")  # Debugging line
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Use app context to create the database
    with app.app_context():
        db.create_all()  # This creates the database file
        print("Database and tables created.")  # Debugging line
    app.run(debug=True)