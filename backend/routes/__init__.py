from routes.ticket_routes import ticket_bp
from routes.user_routes import user_bp

def register_blueprints(app):
    """
    Register all application blueprints.

    Args:
        app (Flask): The Flask application instance.
    """

    # Register ticket blueprints
    print("Registering ticket_bp...")  # Debugging
    app.register_blueprint(ticket_bp, url_prefix="/api/tickets")
    
    # Register user blueprints
    print("Registering user_bp...")  # Debugging
    app.register_blueprint(user_bp, url_prefix="/api/users")