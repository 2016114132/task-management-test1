# EZ Task Manager

A simple task management web app built with Node.js, Express, EJS, and PostgreSQL. This app allows users to add, view, edit, mark, and delete tasks with full server-side rendering and persistent storage.

---

## 🎬 Demo Video

This video provides a walkthrough of the EZ Task Manager, demonstrating all the core features required in the assignment:

🔗 [Watch the Demo Video on YouTube](https://www.youtube.com/watch?v=NGehpw-afFU)

---

## 📦 Features

- Add new tasks
- View all tasks
- Edit existing tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Input validation with error feedback
- Persistent PostgreSQL storage
- Clean and responsive UI using custom CSS

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/2016114132/task-management-test1.git
cd task-management-test1
```

### 2. Install Dependencies

```bash
npm install
```

---

## 🗃️ PostgreSQL Database Setup (Step-by-Step)

### ✅ A. Install PostgreSQL

Follow the instructions for your OS:

- **Linux**:  
  ```bash
  sudo apt install postgresql
  ```

- **macOS (Homebrew)**:  
  ```bash
  brew install postgresql@17
  ```

Then verify the installation:
```bash
psql --version
```

---

### ✅ B. Create the Database and User

Login to PostgreSQL:

- **Linux**:  
  ```bash
  sudo -u postgres psql
  ```

- **macOS**:  
  ```bash
  psql -U postgres
  ```

Then run the following commands:

```sql
-- Create a new database
CREATE DATABASE "task-management-db";

-- Create a new role (user)
CREATE ROLE daban WITH LOGIN PASSWORD 'root';

-- Grant privileges
ALTER DATABASE "task-management-db" OWNER TO daban;
GRANT CREATE ON DATABASE "task-management-db" TO daban;
```

Exit with:
```sql
\q
```

---

### ✅ C. Create the Tasks Table

Login with the new user:
```bash
psql --host=localhost --dbname=task-management-db --username=daban
```

Then run:
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

Exit with:
```sql
\q
```

---

## 🔐 Environment Variable Setup

Create a `.env` file in the project root and add:

```env
DB_HOST=localhost
DB_USER=daban
DB_PASSWORD=root
DB_NAME=task-management-db
DB_PORT=5432
```

---

## 🖥️ Running the App

```bash
npm start
```

Then visit:  
[http://localhost:3000](http://localhost:3000)
