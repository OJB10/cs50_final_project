#!/bin/bash
set -e

# Wait for database to be ready
echo "Waiting for PostgreSQL to start..."
while ! pg_isready -h db -p 5432 -U postgres; do
  sleep 1
done
echo "PostgreSQL started"

# Install latest requirements (for development convenience)
pip install -r requirements.txt

# Create fresh database schema (Skip migrations for first run)
echo "Creating database schema..."
python -c "
from app import create_app
from extensions import db
app = create_app()
with app.app_context():
    db.create_all()
    print('Database tables created successfully!')
"

# Start application
python app.py