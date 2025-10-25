# 📝 Node.js PostgreSQL Todo List App

A simple full-stack todo list application built with **Node.js**, **Express**, and **PostgreSQL**. This app demonstrates basic CRUD (Create, Read, Update, Delete) operations with persistent data storage.

---

## 🚀 Getting Started

### Prerequisites

You must have the following installed on your system:
1.  **Node.js** and **npm**
2.  **PostgreSQL** database server
3.  The necessary database tools (like `psql` or **pgAdmin**) to run SQL queries.

### Database Setup (Crucial!)

Before running the application, you must set up the database and table structure.

1.  **Create the Database:**
    Connect to your PostgreSQL server and create a database named `permalist`:

    ```sql
    CREATE DATABASE permalist;
    ```

2.  **Run the Initial Query:**
    Switch to the `permalist` database and run the following SQL statements to create the `items` table and populate it with initial data:

    ```sql
    CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL
    );

    INSERT INTO items (title) VALUES ('Buy milk'), ('Finish homework');
    ```

3.  **Configure Database Connection:**
    In your `index.js` file, ensure the connection details are correct for your local setup. If running the code on a different device than the database server, remember to change `host: "localhost"` to the server's actual IP address.

    ```javascript
    const db = new pg.Client({
      user: "postgres",
      host: "localhost", // Change to IP if necessary (e.g., "192.168.1.5")
      database: "permalist",
      password: "YOUR_POSTGRES_PASSWORD", // Set your actual password here
      port: 5432,
    });
    ```

---

## 💻 Installation & Running the App

1.  **Install Dependencies:**
    Navigate to your project directory and install the required Node modules:

    ```bash
    npm install express body-parser pg
    ```

2.  **Start the Server:**
    Run the application using Node:

    ```bash
    node index.js
    ```

3.  **Access the App:**
    Open your web browser and go to **`http://localhost:3000`**.

---

## ⚙️ Project Structure

The application follows a simple Express structure:

| File/Folder | Purpose |
| :--- | :--- |
| `index.js` | Main server file; handles Express routes and PostgreSQL connection/queries. |
| `views/` | Contains the EJS templates (`index.ejs`, etc.) for rendering the HTML. |
| `public/` | Stores static assets like CSS files. |