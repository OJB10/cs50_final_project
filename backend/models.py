from datetime import datetime
from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash  # Add hashing utilities

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)  # For storing hashed passwords
    reset_token = db.Column(db.String(100), nullable=True)  # For password reset tokens
    reset_token_expiry = db.Column(db.DateTime, nullable=True)  # Token expiry time
    image = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    active = db.Column(db.Boolean, default=True)

    tickets = db.relationship('Ticket', backref='author', lazy=True)

    def set_password(self, password):
        """
        Hash and set the user's password.

        Args:
            password (str): The plaintext password to hash.
        """
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """
        Verify the user's password.

        Args:
            password (str): The plaintext password to verify.

        Returns:
            bool: True if the password matches the hash, False otherwise.
        """
        return check_password_hash(self.password_hash, password)

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    due_date = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(20), default='Open')
    priority = db.Column(db.String(10))
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))