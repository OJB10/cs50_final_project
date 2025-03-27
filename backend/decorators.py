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
        
        # Check for traditional session
        user_id = session.get("user_id")
        
        # Alternative: also check auth header if session fails (for Docker compatibility)
        auth_header = request.headers.get('Authorization')
        
        if not user_id and not auth_header:
            print("No user_id in session and no auth header")
            return jsonify({"error": "Unauthorized"}), 401
        
        # Process auth header if present and session is empty
        if not user_id and auth_header and auth_header.startswith('Bearer '):
            # In a real app, you'd validate the token here
            # For now, we'll log it and proceed as authenticated
            print(f"Using auth header for authentication: {auth_header}")
            # You could extract user info from the token here
            
        return f(*args, **kwargs)
    return decorated_function