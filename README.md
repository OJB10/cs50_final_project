# Dash Ticketing

A proprietary ticket management system by Ollie Brand.

## Confidentiality Notice

This documentation and associated source code are confidential and proprietary to Ollie Brand. Unauthorized reproduction, distribution, or disclosure is strictly prohibited. Access is limited to authorized individuals, including Harvard CS50x staff for academic evaluation.

## CS50 Final Project Description

This is a Flask and React-based project designed for managing user-created tickets and providing a streamlined interface for task management. The app is built with responsiveness, security, and scalability in mind, featuring robust user authentication and protected routes.

## Features

### Authentication & Security

- Secure user authentication system with session management
- Protected routes requiring user authentication
- Session-based cookie management for secure data transfer
- Comprehensive CORS configuration for secure cross-origin requests
- User registration and login functionality
- Secure logout mechanism

### Backend Features

- Modular route management using Flask Blueprints
- Protected API endpoints with login\_required decorator
- User authentication with login and registration
- Ticket management system for creating, editing, and viewing tickets
- SQLite database for lightweight storage
- RESTful API endpoints for frontend communication
- CORS enabled for secure React and Flask integration

### Frontend Features

- Secure authentication integration with backend
- AsyncRoute management for authenticated users
- Fully responsive grid system using Material-UI's Grid and Box components
- Dynamic fetching and displaying of tickets via RESTful APIs
- Centralized theme system for colours, typography, and responsiveness
- Integrated light/dark mode toggle for user customization
- TaskProvider context to manage global ticket state effectively
- Automatic ticket loading on login and refresh

### General

- Clear separation of backend and frontend logic
- Modular architecture using blueprints for improved code organization
- Secure cross-origin resource sharing (CORS) configuration
- Session-based authentication system
- Easily extensible for future iterations

## Technical Requirements

- Python 3.11.5
- Flask 3.1.0
- SQLite 3.47.2
- Node.js 19.0.0
- NPM 10.9.2

## Access

This is a private repository that is temporarily public for CS50x submission purposes. Usage requires explicit authorization from Ollie Brand.

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

1. Start both backend and frontend servers as described in the setup.
2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
3. Register a new account or log in with existing credentials
4. Access the ticket management system through the authenticated interface

### API Endpoints

- Authentication:

  - POST `/api/users/register`: Register a new user
  - POST `/api/users/login`: User login
  - POST `/api/users/logout`: User logout

- Tickets (Protected Routes):

  - GET `/api/tickets`: Fetch all tickets
  - POST `/api/tickets`: Create a new ticket
  - PUT `/api/tickets/<id>`: Update a ticket
  - DELETE `/api/tickets/<id>`: Delete a ticket

## File Structure

```
cs50_final_project/
│
├── backend/
│   ├── app.py               # Main Flask application
│   ├── decorators.py        # Authentication decorators
│   ├── models.py            # Database models for User and Ticket
│   ├── migrations/          # Database migrations folder
│   ├── routes/
│   │   ├── __init__.py      # Contains blueprint registration
│   │   ├── ticket_routes.py # All ticket-related routes
│   │   └── user_routes.py   # All user-related routes
│   └── utils/
│       ├── __init__.py      # Not in use yet
│       ├── auth.py          # Not in use yet
│       └── validators.py    # Not in use yet
│   ├── venv/                # Virtual environment (not included in Git)
│   ├── requirements.txt     # Python dependencies
│   └── site.db              # SQLite database
│
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Buttons/     # Button components
│   │   │   ├── Modals/      # Modal components
│   │   │   ├── Navbar/      # Navigation bar component
│   │   │   ├── Routes/      # Route oucomponent
│   │   │   ├── UserManagement/  # Auth-related components
│   │   │   └── TaskCard.jsx # Task card component
│   │   │   └── Layout.jsx # Main layout component
│   │   ├── contexts/
│   │   │   ├── TaskProvider # Task context for global state management
│   │   │   └── ModalProvider# Modal context for global state management
│   │   │   └── ThemeProvider 
│   │   ├── hooks (useAuth.js, useModal.js, useTasks.js)
│   │   ├── pages (Profile.jsx)
│   │   ├── routes (AppRoutes.jsx)
│   │   ├── theme.js         # Material-UI theme management
│   │   ├── App.jsx          # Main React app
│   │   └── index.js         # Application entry point
│   ├── package.json         # Node.js dependencies
│   └── README.md            # Frontend documentation
│
├── LICENSE                  # Proprietary License
└── README.md               # Project overview
```

## Troubleshooting

- Ensure no other application is using ports 5000 or 3000
- If npm start fails, try deleting node\_modules and running npm install again
- Clear browser cookies and cache if experiencing authentication issues
- Check CORS settings if experiencing API connection issues

## Future Enhancements

- Enhanced user profile management
- Password reset functionality
- Adding role-based access control
- Implementing search and filtering functionality for tickets
- Introducing pagination for large datasets
- Email notifications for ticket updates

## License

This project is proprietary software owned by Ollie Brand. Copyright (c) 2024. All rights reserved.

A limited license is granted solely to Harvard CS50x staff for project evaluation and academic assessment purposes. See the LICENSE file for details.