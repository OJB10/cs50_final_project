# Dash Ticketing

A proprietary ticket management system by Ollie Brand.

## Confidentiality Notice

This documentation and associated source code are confidential and proprietary to Ollie Brand. Unauthorized reproduction, distribution, or disclosure is strictly prohibited. Access is limited to authorized individuals, including Harvard CS50x staff for academic evaluation.

## CS50 Final Project Description

This is a Flask and React-based project designed for managing user-created tickets and providing a streamlined interface for task management. The app is built with responsiveness and scalability in mind.

## Features

### Backend Features
- User authentication with login and registration
- Ticket management system for creating, editing, and viewing tickets
- SQLite database for lightweight storage
- RESTful API endpoints for frontend communication
- CORS enabled for React and Flask integration

### Frontend Features
- Fully responsive grid system using Material-UI's Grid and Box components
- Dynamic fetching and displaying of tickets via RESTful APIs
- Centralized theme system for colours, typography, and responsiveness
- Integrated light/dark mode toggle for user customization

### General
- Clear separation of backend and frontend logic
- Easily extensible for future iterations (e.g., adding authentication, search functionality, or role-based access control)
- Integrated Flask and React app for seamless task management

## Technical Requirements
- Python 3.13.1
- Flask 3.1.0
- SQLite 3.47.2
- Node.js 19.0.0
- NPM 10.9.2

## Access

This is a private repository. Access is restricted and requires explicit authorization from Ollie Brand.

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Set up a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Initialize the SQLite database:
   ```bash
   python
   >>> from app import db
   >>> db.create_all()
   >>> exit()
   ```

5. Start the Flask application:
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## Running the Application

Open your browser and navigate to:
- Flask backend API: [http://127.0.0.1:5000/api/tickets](http://127.0.0.1:5000/api/tickets)
- React frontend: [http://localhost:3000](http://localhost:3000)

## File Structure

```
cs50_final_project/
│
├── backend/
│   ├── app.py               # Main Flask application
│   ├── models.py            # Database models for User and Ticket
│   ├── migrations/          # Database migrations folder
│   ├── venv/                # Virtual environment (not included in Git)
│   ├── requirements.txt     # Python dependencies
│   └── instance/
│       └── site.db          # SQLite database
│
├── frontend/
│   ├── public/              # Static files (e.g., images)
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Navbar.jsx   # Navigation bar component using Material-UI
│   │   │   ├── TaskCard.jsx # Dynamic task card component
│   │   ├── theme.js         # Material-UI centralized theme management
│   │   ├── App.jsx          # Main React app
│   │   ├── index.js         # Application entry point with Material-UI integration
│   ├── package.json         # Node.js dependencies
│   └── README.md            # Frontend-specific documentation
│
├── LICENSE                  # Proprietary License
└── README.md               # Project overview (this file)
```

## Troubleshooting

- Ensure no other application is using ports 5000 or 3000
- If npm start fails, try deleting node_modules and running npm install again

## Future Enhancements

- Implementing search and filtering functionality for tickets
- Adding authentication and role-based access control
- Introducing pagination for large datasets

## License

This project is proprietary software owned by Ollie Brand. Copyright (c) 2024. All rights reserved.

A limited license is granted solely to Harvard CS50x staff for project evaluation and academic assessment purposes. See the LICENSE file for details.