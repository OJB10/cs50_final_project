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
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        # Validate input
        if not name or not email or not password:
            return jsonify({"error": "Name, email, and password are required."}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email is already registered."}), 400

        # Create new user
        new_user = User(name=name, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully."}), 201
    except Exception as e:
        print(f"Error during registration: {e}")
        return jsonify({"error": "An error occurred during registration."}), 500


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