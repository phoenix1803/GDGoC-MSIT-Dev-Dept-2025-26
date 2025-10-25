# 🧠 Simple Node.js Quiz Application

A basic, clean, and responsive multiple-choice quiz application built with **Node.js**, **Express**, and **EJS**. The app allows users to answer questions, tracks their score, and advances automatically to the next question.

---

## ✨ Features

* **Responsive Design:** Uses Flexbox and custom CSS for a modern, mobile-friendly interface with a gradient background.
* **Dynamic Quiz Flow:** Questions are loaded sequentially, and user answers are checked on the server (Express).
* **State Management:** Score and current question number are maintained on the server.
* **Custom Button Styling:** Radio button options are styled to look like clickable buttons for an improved user experience.
* **EJS Templating:** Uses EJS partials for reusable headers and footers.

---

## 🚀 Getting Started

### Prerequisites

You need to have **Node.js** and **npm** installed on your system.

### Installation & Setup

1.  **Initialize Project & Install Dependencies:**
    Navigate to your project directory in the terminal and run:

    ```bash
    npm init -y
    npm install express body-parser ejs
    ```

2.  **Setup Project Structure:**
    Ensure your project follows this file structure:

    ```
    .
    ├── public/
    │   └── styles.css      # Your CSS file
    ├── views/
    │   ├── index.ejs       # Main quiz page
    │   ├── score.ejs       # Quiz completion page
    │   └── partials/
    │       ├── header.ejs  
    │       └── footer.ejs  
    └── index.js            # Your main server code (containing Express logic)
    ```

3.  **Populate Files:**
    Copy your final Node.js logic into `index.js`, your latest EJS code into `views/index.ejs`, and the final CSS into `public/styles.css`.

### Running the App

Start the server from your project directory:

```bash
node index.js