import os
from flask import Flask, session, request, jsonify, make_response
from flask_cors import CORS
from flask_session import Session
from extensions import db, migrate
from routes import register_blueprints
from decorators import login_required
from datetime import timedelta


def create_app():
    """
    Factory function to create and configure the Flask application.

    Returns:
        Flask: The configured Flask application.
    """
    app = Flask(__name__)

    # Basic configuration
    app.config.update(
        SECRET_KEY="your-secret-key", # Change this in production
        SESSION_TYPE="filesystem", # Consider using "redis" for production
        PERMANENT_SESSION_LIFETIME=timedelta(days=1),
        SESSION_FILE_DIR="./flask_session",  # Explicitly set session file location
        SESSION_FILE_THRESHOLD=500  # Number of sessions stored in memory
    )

    # Cookie configuration
    app.config.update(
        SESSION_COOKIE_NAME="session",
        SESSION_COOKIE_DOMAIN=None,  # Allow all domains
        SESSION_COOKIE_PATH="/",
        SESSION_COOKIE_HTTPONLY=True,  # 
        SESSION_COOKIE_SECURE="None",  # Set to True in production with HTTPS
        SESSION_COOKIE_SAMESITE="None" # Ensure compatibility
    )

    # CORS configuration
    app.config.update(
        CORS_HEADERS="Content-Type",
        CORS_RESOURCES={
            r"/api/*": {
                "origins": ["http://localhost:3000"],
                "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                "allow_headers": ["Content-Type"],
                "supports_credentials": True,
                "expose_headers": ["Set-Cookie"]
            }
        }
    )

    # Initialize the Flask session
    Session(app)

    # Ensure permanent sessions
    @app.before_request
    def make_session_permanent():
        session.permanent = True
    
    # Apply CORS headers to all responses
    @app.after_request
    def apply_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Headers"] = "content-type"
        response.headers["Access-Control-Allow-Methods"] = "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT"
        return response

    # Configure the SQLite database
    db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'site.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'  # SQLite database path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    print(f"Database path resolved to: {db_path}")  # Debugging line

    # Initialize Flask extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints for modular route management
    register_blueprints(app)

    # Debugging: Print all routes
    for rule in app.url_map.iter_rules():
        print(f"{rule.endpoint}: {rule.rule}")

    @app.route('/')
    def home():
        """
        A simple endpoint to check if the application is running.

        Returns:
            str: A welcome message.
        """
        return "Hello, Flask!"
      
    # Add this route to test CORS
    @app.route('/api/test-cors', methods=['GET'])
    def test_cors():
        return jsonify({
            "message": "CORS is working!",
            "session": dict(session)
    })

    # Debugging route to check session state
    @app.route('/api/debug/session', methods=['GET'])
    def debug_session():
        print("Debug endpoint accessed")
        print(f"Current session: {dict(session)}")
        print(f"Request cookies: {dict(request.cookies)}")
        return jsonify({
            "session": dict(session),
            "cookies": dict(request.cookies),
            "headers": dict(request.headers)
        })

    @app.route('/api/debug/cookies', methods=['GET'])
    def debug_cookies():
        return jsonify({
            "cookies": dict(request.cookies),
            "session_cookie": request.cookies.get("session"),
            "headers": dict(request.headers)
    })

    # Debugging route to clear the session
    @app.route('/api/debug/logout', methods=['POST'])
    @login_required
    def debug_logout():
        session.clear()  # Clear all session data
        response = make_response(jsonify({"message": "Session cleared"}))
        response.set_cookie('session', '', expires=0)  # Invalidate the session cookie
        print("Session cleared manually.")  # Debugging log
        return response

    return app


if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        # Ensure database tables are created
        db.create_all()
        print("Database and tables created.")  # Debugging line

    # Start the Flask development server
    app.run(debug=True)
