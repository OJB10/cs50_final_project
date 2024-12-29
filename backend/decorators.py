from functools import wraps
from flask import session, jsonify, request

def login_required(f):
    """
    A decorator to enforce login for protected routes.
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        print(f"Checking session: {session}")
        print(f"Request cookies: {request.cookies}")
        print(f"Request headers: {request.headers}")
        
        if not session.get("user_id"):
            print("No user_id in session")
            return jsonify({"error": "Unauthorized"}), 401
            
        return f(*args, **kwargs)
    return decorated_function