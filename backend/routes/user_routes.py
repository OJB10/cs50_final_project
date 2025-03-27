from flask import Flask, Blueprint, request, jsonify, session, redirect, url_for, make_response
from models import User
from extensions import db
from decorators import login_required

user_bp = Blueprint("users", __name__)

@user_bp.route("/register", methods=["POST"])
def register():
    """
    Register a new user.

    Expects:
        JSON body with `name`, `email`, and `password`.

    Returns:
        201: User successfully registered.
        400: Validation error or email already registered.
        500: Internal server error.
    """
    try:
        data = request.get_json()
        name = data.get("name", "").strip()
        email = data.get("email", "").strip().lower()
        password = data.get("password", "")

        # Enhanced input validation
        validation_errors = {}
        
        if not name:
            validation_errors["name"] = "Name is required."
        
        # Email validation
        if not email:
            validation_errors["email"] = "Email is required."
        elif not email_is_valid(email):
            validation_errors["email"] = "Please enter a valid email address."
        elif User.query.filter_by(email=email).first():
            validation_errors["email"] = "This email is already registered."
        
        # Password validation
        if not password:
            validation_errors["password"] = "Password is required."
        elif len(password) < 8:
            validation_errors["password"] = "Password must be at least 8 characters long."
        elif not password_is_strong(password):
            validation_errors["password"] = "Password is too weak. Include uppercase, lowercase, and numbers."
        
        if validation_errors:
            return jsonify({"error": "Validation failed", "details": validation_errors}), 400

        # Create new user
        new_user = User(name=name, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully."}), 201
    except Exception as e:
        print(f"Error during registration: {e}")
        return jsonify({"error": "An error occurred during registration."}), 500
        
def email_is_valid(email):
    """Validate email format using a simple regex pattern."""
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def password_is_strong(password):
    """Check if password meets strength requirements."""
    # Has at least one lowercase letter
    has_lower = any(c.islower() for c in password)
    # Has at least one uppercase letter
    has_upper = any(c.isupper() for c in password)
    # Has at least one digit
    has_digit = any(c.isdigit() for c in password)
    
    # Password is strong if it meets at least two of the three criteria
    return sum([has_lower, has_upper, has_digit]) >= 2


@user_bp.route('/login', methods=['POST'])
def login():
    """
    Log in an existing user.

    Expects:
        JSON body with `email` and `password`.

    Returns:
        200: Login successful.
        400: Missing credentials.
        401: Invalid email or password.
        500: Internal server error.
    """
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required."}), 400

        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return jsonify({"error": "Invalid email or password."}), 401

        # Set session data
        session.permanent = True
        session["user_id"] = user.id
        session["user_name"] = user.name
        session["email"] = user.email
        
        # Create response with proper session handling
        response = make_response(jsonify({
            "message": "Login successful.",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        }))

        # Log session state for debugging
        print(f"Session data after login: {dict(session)}")
        print(f"Response headers: {dict(response.headers)}")
        
        return response, 200

    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({"error": "An error occurred during login."}), 500

@user_bp.route('/logout', methods=['POST'])
def logout():
    """
    Log out an existing user.

    Clears the session and logs the user out.

    Returns:
        200: Logout successful.
    """
    session.clear()  # Clear the server-side session
    response = make_response(jsonify({"message": "Logged out successfully."}))
    response.set_cookie('session', '', expires=0)  # Invalidate session cookie
    print("Session cleared")  # Debug log
    return response

@user_bp.route('/update', methods=['PUT'])
@login_required
def update_user():
    """
    Update the user's name and/or password.

    Expects:
        JSON body with `name` and/or `password`.

    Returns:
        200: User details updated successfully.
        400: Validation error.
        500: Internal server error.
    """
    try:
        data = request.get_json()
        user_id = session.get("user_id")  # Get the user ID from the session
        user = User.query.get(user_id)

        if not user:
            return jsonify({"error": "User not found."}), 404

        # Update name if provided
        if "name" in data:
            new_name = data["name"]
            if not new_name.strip():
                return jsonify({"error": "Name cannot be empty."}), 400
            user.name = new_name

        # Update password if provided
        if "password" in data:
            new_password = data["password"]
            if len(new_password) < 8:
                return jsonify({"error": "Password must be at least 8 characters long."}), 400
            user.set_password(new_password)

        # Commit changes to the database
        db.session.commit()
        return jsonify({"message": "User details updated successfully."}), 200

    except Exception as e:
        print(f"Error during user update: {e}")
        return jsonify({"error": "An error occurred while updating user details."}), 500
    
@user_bp.route('/session', methods=['GET'])
def verify_session():
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        if user:
            return jsonify({"id": user.id, "name": user.name, "email": user.email}), 200
    return jsonify({"error": "Not authenticated"}), 401