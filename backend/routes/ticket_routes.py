from flask import Blueprint, jsonify, request
from datetime import datetime
from models import Ticket
from extensions import db
from flask import Blueprint
from decorators import login_required

ticket_bp = Blueprint("tickets_blueprint", __name__)

def serialize_ticket(ticket):
    """
    Serialize a Ticket object into a dictionary format.

    Args:
        ticket (Ticket): The Ticket object to be serialized.

    Returns:
        dict: A dictionary containing serialized ticket data.
    """
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

@ticket_bp.route('', methods=['GET'])
@login_required
def fetch_tickets():
    """
    Fetch all tickets from the database.

    Returns:
        Response: A JSON response containing a list of all tickets or an error message.
    """
    try:
        tickets = Ticket.query.all()
        return jsonify([serialize_ticket(ticket) for ticket in tickets]), 200
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"error": str(e)}), 500

@ticket_bp.route('', methods=['POST'])
@login_required
def create_ticket():
    """
    Create a new ticket in the database.

    Returns:
        Response: A JSON response containing the created ticket's data or an error message.
    """
    try:
        data = request.get_json()
        if not data.get('name'):
            return jsonify({"error": "Name is required."}), 400

        new_ticket = Ticket(
            name=data['name'],
            description=data.get('description', ''),  # Default to an empty string if not provided
            status=data.get('status', 'To be done'),
            priority=data.get('priority', 'Low'),
            due_date=datetime.strptime(data['due_date'], "%Y-%m-%d") if data.get('due_date') else None,
            created_at=datetime.utcnow(),
            author_id=data.get('author_id'),
        )
        db.session.add(new_ticket)
        db.session.commit()
        return jsonify(serialize_ticket(new_ticket)), 201
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"error": str(e)}), 500
    
@ticket_bp.route('/<int:ticket_id>', methods=['PUT'])
@login_required
def update_ticket(ticket_id):
    """
    Update an existing ticket in the database.

    Args:
        ticket_id (int): The ID of the ticket to update.

    Expects JSON data containing the updated ticket details.

    Returns:
        Response: A JSON response containing the updated ticket's data or an error message.
    """
    try:
        ticket = Ticket.query.get(ticket_id)
        if not ticket:
            return jsonify({"error": "Ticket not found."}), 404

        data = request.get_json()
        # Update ticket fields if provided
        ticket.name = data.get('name', ticket.name)
        ticket.description = data.get('description', ticket.description)
        ticket.status = data.get('status', ticket.status)
        ticket.priority = data.get('priority', ticket.priority)
        ticket.due_date = datetime.strptime(data['due_date'], "%Y-%m-%d") if data.get('due_date') else ticket.due_date
        db.session.commit()
        return jsonify(serialize_ticket(ticket)), 200
    except Exception as e:
        print(f"Error occurred: {e}") # Debugging
        return jsonify({"error": str(e)}), 500

@ticket_bp.route('/<int:ticket_id>', methods=['DELETE'])
@login_required
def delete_ticket(ticket_id):
    """
    Delete a ticket from the database.

    Args:
        ticket_id (int): The ID of the ticket to delete.

    Returns:
        Response: A JSON response confirming deletion or an error message.
    """
    try:
        ticket = Ticket.query.get(ticket_id)
        if not ticket:
            return jsonify({"error": "Ticket not found."}), 404

        db.session.delete(ticket)
        db.session.commit()
        return jsonify({"message": "Ticket deleted successfully."}), 200
    except Exception as e:
        print(f"Error occurred: {e}") # Debugging
        return jsonify({"error": str(e)}), 500