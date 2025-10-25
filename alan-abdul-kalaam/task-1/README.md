# 📝 Todo App - Quest Edition 🎮

A full-stack todo application built with React, Node.js, Express, and MongoDB - **gamified with RPG-style features!**

## 🎯 Unique Twists & Special Features

### 🎮 **Gamification System**

Transform your productivity into an epic gaming experience:

- **XP & Leveling System**: Earn experience points (10 XP per completed task) and level up based on the formula `Level = floor(sqrt(XP/10)) + 1`
- **Achievement System**: Unlock 12 progressive achievements across 6 categories (Beginner → Legendary)
  - Track progress with visual progress bars
  - Achievements unlock based on completed tasks and level milestones
  - Categories: Beginner, Intermediate, Advanced, Expert, Master, and Legendary
- **Power-Ups Panel**: Toggle special gameplay modifiers
  - **Confetti Mode**: Celebrate task completions with animated confetti explosions
  - **Double XP Mode**: Earn 2x experience points (20 XP per task)

### 🎨 **Advanced UI/UX Features**

- **Custom Avatar System**: Choose from 16 unique emoji avatars with gradient backgrounds
  - Avatars persist in the database and display throughout the app
  - Real-time avatar updates in navbar
- **Gaming-Themed Design**:
  - 5 custom Google Fonts (Orbitron, Rajdhani, Audiowide, Saira Condensed, Exo 2)
  - Neon glow effects, gradient borders, and cyberpunk aesthetics
  - Smooth animations (fadeIn, slideIn, scaleIn, bounceIn, float)
  - Responsive glassmorphism UI with backdrop blur effects
- **Enhanced Statistics Dashboard**:
  - Real-time completion rate calculation
  - Visual progress tracking with animated progress bars
  - Category-based achievement organization

### 📊 **Smart Task Management**

- **Multi-List Organization**: Create and manage multiple custom lists
- **Starred Tasks**: Quick access to important tasks with star filtering
- **Task Details Modal**: Enhanced task viewing with full descriptions
- **Mobile-Responsive Design**: Dedicated mobile bottom navigation

## 🚀 Core Features

- ✅ Create, update, and delete todos
- 📂 Organize todos into custom lists
- ⭐ Star important todos
- 📊 Track completion statistics with live percentage
- 🎨 Modern, responsive UI with Tailwind CSS 4
- 🔐 User authentication with JWT
- 📱 Mobile-friendly design with bottom navigation
- 👤 User profile management with settings

## 🛠️ Tech Stack

### Frontend

- **React** 19.1.1
- **Vite** 7.1.7
- **Tailwind CSS** 4.1.14
- **React Router DOM** 6.18.0

### Backend

- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- MongoDB (running locally or remote connection)

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Todo-App
   ```

2. **Install dependencies**

   ```bash
   # Install frontend dependencies
   cd frontend
   pnpm install

   # Install backend dependencies
   cd ../backend
   pnpm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `backend` directory:

   ```env
   PORT=4000
   MONGO_URI=mongodb://127.0.0.1:27017/todo-app
   JWT_SECRET=your_strong_secret_key_here
   ```

4. **Start MongoDB**

   Make sure MongoDB is running on your system.

## 🎯 Running the Application

### Development Mode

1. **Start the backend server**

   ```bash
   cd backend
   pnpm start
   # or: node server.js
   ```

   Backend will run on `http://localhost:4000`

2. **Start the frontend dev server**

   ```bash
   cd frontend
   pnpm dev
   ```

   Frontend will run on `http://localhost:5173` (or next available port)

3. **Access the application**

   Open your browser and navigate to the frontend URL.

## 📁 Project Structure

```
Todo-App/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom hooks
│   │   └── App.jsx       # Main app component
│   ├── public/           # Static assets
│   └── package.json
│
├── backend/              # Express backend
│   ├── src/
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # API routes
│   │   └── middleware/  # Custom middleware
│   ├── server.js        # Server entry point
│   └── package.json
│
└── README.md
```

## 🔑 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Lists

- `GET /api/lists` - Get all lists
- `POST /api/lists` - Create new list
- `PUT /api/lists/:id` - Update list
- `DELETE /api/lists/:id` - Delete list

### User

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ by [Your Name]

## 🐛 Known Issues

- None at the moment

## 🎨 Design & Implementation Details

### **How the Twists Were Implemented**

#### 1. **XP & Leveling System** (`App.jsx`)

```javascript
// XP calculation with Double XP twist
const base = enabledTwists.doubleXP ? 20 : 10;
setXp((x) => x + base);

// Level calculation based on XP
function calcLevel(xp) {
  return Math.floor(Math.sqrt(xp / 10)) + 1;
}
```

#### 2. **Achievement System** (`AchievementsPage.jsx`)

- 12 predefined achievements with requirements
- Real-time progress tracking per achievement
- Color-coded categories with gradient themes
- Locked/unlocked states with visual feedback
- Dynamic progress bars showing completion percentage

#### 3. **Confetti Celebration** (`TwistsPanel.jsx`)

- DOM-based confetti animation with random colors
- Spawns 18 confetti pieces on task completion
- Randomized positions, rotations, and durations
- Auto-cleanup after 2 seconds

#### 4. **Avatar System** (`AvatarPage.jsx` + `User.js` model)

- MongoDB schema stores avatar object: `{ avatarId, emoji, name, color }`
- Backend API endpoint (`PUT /api/user/avatar`) persists changes
- Frontend displays 16 gradient-styled avatar options
- Real-time preview before saving

#### 5. **Gaming UI Theme** (`index.css`)

- Multiple font families for different UI elements
- CSS animations: `@keyframes float`, `fadeIn`, `slideIn`, etc.
- Gradient backgrounds and neon glow effects
- Responsive grid layouts for mobile/desktop

### **Tech Stack & Libraries**

- **Frontend**: React 19.1.1, Vite 7.1.7, Tailwind CSS 4.1.14
- **Backend**: Express.js, MongoDB with Mongoose
- **Authentication**: JWT with bcryptjs
- **Styling**: Custom CSS animations + TailwindCSS utilities
- **Fonts**: 5 Google Fonts for gaming aesthetic

## 🔮 Future Enhancements

- [ ] Leaderboard system for competitive task completion
- [ ] Daily challenges and bonus XP events
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Task sharing and collaboration
- [ ] Boss battles (complete X tasks for rewards)
- [ ] Custom avatar uploads
- [ ] Sound effects for achievements
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)

## 💬 Support

For support, open an issue in the repository.

## ✨ What Makes This Todo App Special?

This isn't just another todo app - it's a **productivity RPG**! By gamifying task completion with XP, levels, achievements, and visual celebrations, it transforms mundane task management into an engaging experience. The custom avatar system adds personalization, while the power-ups (confetti & double XP) provide fun gameplay modifiers. The result is a unique blend of productivity and entertainment that keeps users motivated to complete their tasks!
