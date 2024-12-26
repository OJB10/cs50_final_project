import os
from flask import Flask, jsonify, request
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


# Helper method to serialize tickets
def serialize_ticket(ticket):
    return {
        "id": ticket.id,
        "name": ticket.name,
        "description": ticket.description,
        "created_at": ticket.created_at.strftime("%Y-%m-%d %H:%M:%S") if ticket.created_at else None,
        "due_date": ticket.due_date.strftime("%Y-%m-%d") if ticket.due_date else None,
        "status": ticket.status,
        "priority": ticket.priority,
        "author_id": ticket.author_id,
    }


# Endpoint to fetch tickets
@app.route('/api/tickets', methods=['GET'])
def fetch_tickets():
    try:
        tickets = Ticket.query.all()  # Fetch all tickets from the database
        ticket_list = [serialize_ticket(ticket) for ticket in tickets]
        return jsonify(ticket_list), 200
    except Exception as e:
        print(f"Error occurred: {e}")  # Debugging line
        return jsonify({"error": str(e)}), 500


# Endpoint to create a new ticket
@app.route('/api/tickets', methods=['POST'])
def create_ticket():
    try:
        data = request.get_json()
        # Validate required fields
        if not data.get('name') or not data.get('description'):
            return jsonify({"error": "Name and description are required."}), 400

        # Create a new ticket
        new_ticket = Ticket(
            name=data['name'],
            description=data['description'],
            status=data.get('status', 'To be done'),
            priority=data.get('priority', 'Low'),
            due_date=datetime.strptime(data['due_date'], "%Y-%m-%d") if data.get('due_date') else None,
            created_at=datetime.utcnow(),
            author_id=data.get('author_id'),  # Optional
        )
        db.session.add(new_ticket)
        db.session.commit()
        return jsonify(serialize_ticket(new_ticket)), 201
    except Exception as e:
        print(f"Error occurred: {e}")  # Debugging line
        return jsonify({"error": str(e)}), 500


# Endpoint to update an existing ticket
@app.route('/api/tickets/<int:ticket_id>', methods=['PUT'])
def update_ticket(ticket_id):
    try:
        ticket = Ticket.query.get(ticket_id)
        if not ticket:
            return jsonify({"error": "Ticket not found."}), 404

        data = request.get_json()
        # Update fields
        ticket.name = data.get('name', ticket.name)
        ticket.description = data.get('description', ticket.description)
        ticket.status = data.get('status', ticket.status)
        ticket.priority = data.get('priority', ticket.priority)
        ticket.due_date = datetime.strptime(data['due_date'], "%Y-%m-%d") if data.get('due_date') else ticket.due_date
        db.session.commit()
        return jsonify(serialize_ticket(ticket)), 200
    except Exception as e:
        print(f"Error occurred: {e}")  # Debugging line
        return jsonify({"error": str(e)}), 500


# Endpoint to delete a ticket
@app.route('/api/tickets/<int:ticket_id>', methods=['DELETE'])
def delete_ticket(ticket_id):
    try:
        ticket = Ticket.query.get(ticket_id)
        if not ticket:
            return jsonify({"error": "Ticket not found."}), 404

        db.session.delete(ticket)
        db.session.commit()
        return jsonify({"message": "Ticket deleted successfully."}), 200
    except Exception as e:
        print(f"Error occurred: {e}")  # Debugging line
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    # Use app context to create the database
    with app.app_context():
        db.create_all()  # This creates the database file
        print("Database and tables created.")  # Debugging line
    app.run(debug=True)