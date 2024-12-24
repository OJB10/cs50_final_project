# Dash Ticketing
A proprietary ticket management system by Ollie Brand.

## Confidentiality Notice
This documentation and associated source code contain confidential and proprietary information. Unauthorized reproduction, distribution, or disclosure is strictly prohibited.

## CS50 Final Project Description
This is a Flask and React-based project designed for managing user-created tickets and providing a streamlined interface for task management. The app is built with responsiveness and scalability in mind.

## Features

### Backend (Flask)
- User management system with login and registration.
- Ticket management system for creating, editing, and viewing tickets.
- SQLite database for lightweight storage.
- RESTful API endpoints to communicate with the frontend.
- **Cross-Origin Resource Sharing (CORS)** enabled to allow React frontend to communicate with Flask backend.

### Frontend (React)
- Fully responsive grid system implemented using Material-UI's Grid and Box components.
- Reusable components, including a navigation bar (`Navbar`) and task cards (`TaskCard`).
- **Material-UI Theme System**: Centralized theme management for colours, typography, and responsive design.
- Integrated light and dark modes with Material-UI's theming.
- Dynamic fetching of tickets from the Flask backend using RESTful APIs.

### General
- Designed with a clear separation of backend and frontend logic.
- Easily extensible for future iterations (e.g., adding authentication, search functionality, or role-based access control).
- **Integrated Flask and React app for seamless task management.**

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

- Open your browser and navigate to:
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
└── README.md                # Project overview (this file)
```

## License

This project is proprietary software owned by Ollie Brand. Copyright (c) 2024. All rights reserved.

A limited license is granted solely to Harvard CS50x staff for project evaluation and academic assessment purposes. See the [LICENSE](/LICENSE) file for details.