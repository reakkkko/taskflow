# Taskflow 📝

A full stack todo app with JWT authentication — built with React, TypeScript, Tailwind CSS, Node.js, Express and PostgreSQL.

## Features

- Register & Login with JWT authentication
- Personal todos — every user sees only their own tasks
- Add, complete and delete todos
- Progress bar
- Protected routes
- Passwords hashed with bcrypt

## Tech Stack

**Frontend** — React + TypeScript + Vite + Tailwind CSS

**Backend** — Node.js + Express + PostgreSQL + JWT

→ Backend repo: [taskflow-backend](https://github.com/reakkkko/taskflow-backend)

---

## ⚠️ Requirements

This app requires the backend to be running before starting the frontend.

Make sure you have:
- Node.js installed
- PostgreSQL installed and running
- The backend running on `http://localhost:3001`

See the [backend repo](https://github.com/reakkkko/taskflow-backend) for setup instructions.

---

## Getting Started

### 1. Clone the frontend

```bash
git clone https://github.com/reakkkko/taskflow
cd taskflow
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Database Setup

Before starting the backend you need to set up the PostgreSQL database.

### 1. Install PostgreSQL

**Fedora/RHEL:**
```bash
sudo dnf install postgresql postgresql-server
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt install postgresql
sudo systemctl start postgresql
```

**Windows:**
Download from [postgresql.org](https://www.postgresql.org/download/)

### 2. Create the database and tables

```bash
sudo -u postgres psql
```

Then run these SQL commands:

```sql
-- Create the database
CREATE DATABASE taskflow;

-- Connect to it
\c taskflow

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Create todos table
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  text VARCHAR(255) NOT NULL,
  done BOOLEAN DEFAULT FALSE
);
```

### 3. Set a password for the postgres user

```sql
ALTER USER postgres PASSWORD 'yourpassword';
\q
```

### 4. Fix authentication (Linux only)

Edit `/var/lib/pgsql/data/pg_hba.conf` and change all `ident` and `peer` to `md5`:

```
local   all   all                  md5
host    all   all   127.0.0.1/32   md5
host    all   all   ::1/128        md5
```

Then restart PostgreSQL:

```bash
sudo systemctl restart postgresql
```

---

## Configuration

### Change the JWT Secret

In `taskflow-backend/src/index.ts` find this line:

```ts
const JWT_SECRET = 'CRAZYSECRET'
```

Change it to a long random string — the more random the better:

```ts
const JWT_SECRET = 'your-super-secret-random-string-here'
```

⚠️ Never share your JWT secret or commit it to a public repo. Use a `.env` file in production.

### Connect your own database

In `taskflow-backend/src/db.ts` update the connection details:

```ts
const pool = new Pool({
  user: 'postgres',         // your postgres username
  host: 'localhost',        // your database host
  database: 'taskflow',     // your database name
  password: 'yourpassword', // your postgres password
  port: 5432,               // default postgres port
})
```

### Change the backend URL

If your backend runs on a different port or host, update the fetch URLs in the frontend.

In `src/pages/Dashboard.tsx`, `src/components/Login.tsx` and `src/pages/Register.tsx` change:

```ts
fetch('http://localhost:3001/...')
```

To your backend URL.

---

## License

MIT
