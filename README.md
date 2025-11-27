# Employee & Task Management System

A full-stack application for managing employees and tasks with a premium, modern UI.

## Features
- **Dashboard**: Real-time overview of statistics and task distribution.
- **Employee Management**: Add, view, and delete employees.
- **Task Management**: Kanban-style drag-and-drop board for managing task status (Todo, In Progress, Done).
- **Responsive Design**: Fully responsive UI with a dark mode aesthetic.
- **Glassmorphism UI**: Modern design using CSS variables and backdrop filters.

## Tech Stack
### Frontend
- **React (Vite)**: Fast and modern frontend framework.
- **Vanilla CSS**: Custom design system without external CSS frameworks (as per requirements).
- **React Router**: For client-side routing.
- **Hello Pangea DnD**: For drag-and-drop Kanban board.
- **Lucide React**: For beautiful icons.

### Backend
- **Node.js & Express**: Robust RESTful API.
- **SQLite**: Lightweight relational database.
- **Better-SQLite3 / SQLite3**: Database driver.

## Setup Instructions

### Prerequisites
- Node.js installed (v14+ recommended).

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
The server will start on `http://localhost:5000`.
The database `manager.db` will be automatically created and seeded with initial data.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`.

## Assumptions & Bonus Features
- **Bonus**: Implemented both Frontend and Backend tracks also deployed the entire project into single URL.
- **Bonus**: Advanced UI features (Glassmorphism, Animations, Drag & Drop).
- **Assumption**: Single user environment (no complex auth for this demo, though structure allows for it).
- **Assumption**: SQLite is used for "Real Database" requirement as it persists data to disk and supports SQL.

## API Endpoints
- `GET /api/employees` - List all employees
- `POST /api/employees` - Create employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task status
- `GET /api/dashboard` - Get summary stats

## Website Images
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/702895c3-f332-4a35-b1ee-796142db5c2b" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/57faabd0-e463-4860-8941-03a80037ac85" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/99890992-84ba-45a6-9e7b-3443b2fda3f1" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2f354f50-5c40-4462-81c4-907f25009fa1" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9236bad9-7414-4794-a1f8-48e7971417d5" />





