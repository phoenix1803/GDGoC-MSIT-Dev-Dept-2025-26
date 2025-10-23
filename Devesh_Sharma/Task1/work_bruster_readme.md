# 🚀 Work Bruster - Ultimate Task Management Game

**Work Bruster** is a gamified command-line task management application built in pure Python with zero external dependencies. It transforms your boring to-do list into an engaging game with points, levels, badges, and streaks!

## ✨ Features

### Core Task Management
- ✅ **Add Tasks** - Create new tasks with ease
- ✏️ **Edit Tasks** - Update existing task titles
- 🗑️ **Delete Tasks** - Remove completed or unwanted tasks
- ✅ **Mark Complete** - Check off tasks and earn rewards
- 📋 **View All Tasks** - See your entire task list

### Gamification System 🎮
- **Points System** - Earn 10-25 points per completed task
- **Leveling** - Advance levels as you accumulate points (100 points per level)
- **Streak Counter** - Track consecutive days/sessions of productivity
- **Badges** - Unlock achievements:
  - 🌱 Starter Pack (1 task completed)
  - ⚡ Task Doer (5 tasks)
  - ⚔️ Work Warrior (10 tasks)
  - 👑 Legend (25 tasks)
  - 💎 Master (50 tasks)
  - 🔥 On Fire! (3-day streak)
  - 🚀 Unstoppable (7-day streak)
  - ⭐ Legendary Streak (14-day streak)

### Advanced Features 🌟
- **Random Task** - Get a random incomplete task to focus on
- **Daily Challenge** - Generates a random task as your daily goal
- **Motivational Quotes** - 10+ inspiring quotes displayed randomly
- **Fun Facts** - Learn interesting facts while completing tasks
- **Progress Dashboard** - View all your stats and achievements
- **Pomodoro Challenge** - 25-minute focus sessions with bonus points
- **Data Persistence** - All data automatically saved to `work_bruster_data.txt`

## 🎯 How to Use

### Installation
1. Ensure you have Python 3.6+ installed
2. Download the `work_bruster.py` file
3. Run from your terminal:
```bash
python work_bruster.py
```

### Menu Options

```
1. Add Task           → Create a new task
2. View Tasks         → Display all tasks
3. Complete Task      → Mark a task as done and earn points
4. Edit Task          → Change a task's title
5. Delete Task        → Remove a task
6. Random Task        → Get a random task to focus on
7. Daily Challenge    → Generate today's special challenge
8. View Progress      → See your stats and badges
9. Pomodoro Challenge → 25-minute focus session
10. Motivational Quote → Get inspired!
11. Exit             → Quit the app
```

## 🏆 Scoring System

| Action | Points |
|--------|---------|
| Complete a task | 10-25 (random) |
| Level Up | Milestone celebration |
| Pomodoro Session | 50 bonus points |
| Daily Challenge | Regular points + recognition |

## 🎖️ Badge Requirements

| Badge | Requirement |
|-------|-------------|
| Starter Pack | Complete 1 task |
| Task Doer | Complete 5 tasks |
| Work Warrior | Complete 10 tasks |
| Legend | Complete 25 tasks |
| Master | Complete 50 tasks |
| On Fire! | Maintain 3-day streak |
| Unstoppable | Maintain 7-day streak |
| Legendary Streak | Maintain 14-day streak |

## 📊 Data Persistence

All your progress is automatically saved to `work_bruster_data.txt`:
- Tasks (with ID, title, completion status, creation date)
- Points and level
- Streak counter
- Total completed tasks
- Earned badges

Simply restart the app to resume where you left off!

## 💡 Inspiration & Design Philosophy

Work Bruster is designed for:
- **Productivity Enthusiasts** who love gamification
- **Students** managing multiple assignments
- **Professionals** organizing daily workflows
- **Anyone** wanting to turn task management into a fun game

The app features:
- Clean, ASCII-art UI with emojis for visual appeal
- Random motivational messages to keep you inspired
- Progressive difficulty with levels and streaks
- Achievement system that rewards consistency
- Minimalist design focused on functionality

## 🛠️ Technical Details

- **Language**: Python 3.6+
- **Dependencies**: None (Pure Python Standard Library)
- **File Size**: Lightweight and portable
- **Persistence**: Text-based file storage (`work_bruster_data.txt`)
- **Architecture**: Single-file application for simplicity

## 📝 Example Workflow

1. Run the app
2. Add tasks for your day
3. Complete a task → Earn points
4. Reach 100 points → Level up with celebration
5. Maintain streaks → Unlock badges
6. Check daily challenge → Extra motivation
7. Use Pomodoro mode → Focus and earn bonus points
8. Track progress → See your achievements grow

## 🚀 Future Enhancements

Possible additions:
- Task priorities (High/Medium/Low)
- Recurring tasks
- Task categories
- Deadline tracking
- Statistics graphs
- Import/export tasks
- Multiplayer leaderboards
- Custom themes

## 👨‍💻 Contributing

This is a solo project built for personal productivity. Feel free to fork and customize!

## 📜 License

Open source - Use freely for personal and educational purposes.

## 🎉 Get Started Now!

```bash
python work_bruster.py
```

Start crushing those goals and climb the levels! 🚀

---

**Built with ❤️ by a practitioner coder**
*Pure Python • No Dependencies • Maximum Fun*