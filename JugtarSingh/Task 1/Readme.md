# Todo List Application

A full-stack todo list application built with React (Vite) frontend and Express/Sequelize backend.

## Project Structure

```
TodoList/
├── frontend/          # React (Vite) frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   └── styles/      # CSS files
│   └── package.json
└── backend/           # Express backend
    ├── src/
    │   ├── controllers/  # Route handlers
    │   ├── models/      # Sequelize models
    │   ├── repositories/ # Data access layer
    │   ├── routers/     # Express routes
    │   └── service/     # Business logic
    └── package.json
```

## Features

- Create, read, update, and delete todos
- Responsive design with clean UI
- Form validation and error handling
- Modular backend architecture with repository pattern
- MySQL database with Sequelize ORM

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure your MySQL database connection in `src/config/config.json`

```js
{
  "development": {
    "username": "root",
    "password": "password",
    "database": "TodoApp",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```

4. Run migrations:
```bash
npx sequelize-cli db:migrate
```

5. Start the development server:
```bash
npm run dev
```

The backend API will be available at http://localhost:8080

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:5173

## API Endpoints

- `GET /api/v1/todos` - List all todos
- `GET /api/v1/todos/:id` - Get a specific todo
- `POST /api/v1/todos` - Create a new todo
- `PUT /api/v1/todos/:id` - Update a todo
- `DELETE /api/v1/todos/:id` - Delete a todo

### Request/Response Examples

#### Create Todo
```json
POST /api/v1/todos
{
  "task": "Buy groceries",
  "description": "Get milk and bread"
}
```

#### Update Todo
```json
PUT /api/v1/todos/:id
{
  "task": "Buy groceries",
  "description": "Get milk, bread, and eggs"
}
```

## Technologies Used

### Frontend
- React 18
- Vite
- React Router v6
- Axios
- CSS3 with CSS Modules

### Backend
- Node.js
- Express
- Sequelize ORM
- MySQL2
- HTTP Status Codes

## Development

### Backend Architecture

The backend follows a layered architecture:
- Controllers: Handle HTTP requests/responses
- Services: Implement business logic
- Repositories: Handle data access
- Models: Define database schema
- Routes: Define API endpoints

### Frontend Structure

- Components are modular and reusable
- CSS follows BEM-like naming
- Axios for API communication
- React Router for navigation
- Form validation with proper error handling

## License

This project is licensed under the ISC License.
