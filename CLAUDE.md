# Dash Project Guidelines

## Build Commands
- **Backend**: `cd backend && source dash_env/bin/activate && python app.py`
- **Frontend**: `cd frontend && npm start`
- **Test Frontend**: `cd frontend && npm test` (for single test: `npm test -- -t "test_name"`)
- **Build Frontend**: `cd frontend && npm run build`

## Linting
- **Frontend**: React ESLint configuration is used (react-app, react-app/jest)
- **Backend**: No explicit linting setup, follow PEP 8 guidelines

## Coding Standards
- **Python**: Use docstrings, follow Flask patterns in app.py
- **JavaScript**: React functional components with hooks (useAuth, useModal, useTasks)
- **Naming**: camelCase for JS, snake_case for Python
- **Error Handling**: Use try/except in Python, try/catch in JS with proper error messages
- **Types**: PropTypes for React components where necessary
- **Organization**: Keep components modular, use contexts for state management
- **Security**: CORS configured for localhost:3000, cookies properly secured

## Architecture
- **Backend**: Flask (blueprints for routes), SQLAlchemy ORM
- **Frontend**: React 18+, Material-UI, React Router
- **Authentication**: Session-based using Flask-Session