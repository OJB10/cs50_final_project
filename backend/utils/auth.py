from flask import session, redirect, url_for
from functools import wraps

def login_required(func):
    """
    A decorator to protect routes that require user authentication.

    Args:
        func (function): The function to wrap.

    Returns:
        function: The wrapped function that requires authentication.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Check if the user is logged in
        if not session.get('user_id'):
            # Redirect to the login page if unauthenticated
            return redirect(url_for('users.login'))
        return func(*args, **kwargs)

    return wrapper