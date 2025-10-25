import random
import time
from datetime import datetime, timedelta

MOTIVATIONAL_QUOTES = [
    "Every completed task is a step towards success!",
    "You are crushing it today! Keep going!",
    "Believe in yourself, you've got this!",
    "The only way to do great work is to love what you do.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Don't watch the clock; do what it does. Keep going.",
    "The future depends on what you do today.",
    "You are stronger than you think!",
    "Push yourself, because no one else is going to do it for you.",
    "Sometimes we're tested not to show our weaknesses, but to discover our strengths."
]

FUNNY_FACTS = [
    "Fun Fact: Honey never spoils and can last thousands of years!",
    "Fun Fact: Your brain uses 20% of your body's energy!",
    "Fun Fact: A group of flamingos is called a 'flamboyance'!",
    "Fun Fact: Octopuses have three hearts!",
    "Fun Fact: Bananas are berries but strawberries aren't!",
    "Fun Fact: You can't hum while holding your nose closed!",
    "Fun Fact: The shortest war lasted 38-45 minutes!",
    "Fun Fact: Sloths only poop once a week!",
    "Fun Fact: A day on Venus is longer than its year!",
    "Fun Fact: Wombat poop is cube-shaped!"
]

BADGES = {
    "starter": {"name": "Starter Pack", "tasks": 1, "icon": "🌱"},
    "doer": {"name": "Task Doer", "tasks": 5, "icon": "⚡"},
    "warrior": {"name": "Work Warrior", "tasks": 10, "icon": "⚔️"},
    "legend": {"name": "Legend", "tasks": 25, "icon": "👑"},
    "master": {"name": "Master", "tasks": 50, "icon": "💎"},
    "streak_3": {"name": "On Fire!", "streak": 3, "icon": "🔥"},
    "streak_7": {"name": "Unstoppable", "streak": 7, "icon": "🚀"},
    "streak_14": {"name": "Legendary Streak", "streak": 14, "icon": "⭐"},
}

class WorkBruster:
    def __init__(self):
        self.tasks = []
        self.points = 0
        self.level = 1
        self.streak = 0
        self.total_completed = 0
        self.badges_earned = []
        self.last_daily_challenge = None
        self.daily_challenge = None
        self.pomodoro_sessions = 0
        self.load_data()

    def load_data(self):
        try:
            with open("work_bruster_data.txt", "r") as f:
                lines = f.readlines()
                for line in lines:
                    if line.startswith("TASK:"):
                        parts = line.strip().split("|")
                        self.tasks.append({
                            "id": int(parts[1]),
                            "title": parts[2],
                            "completed": parts[3] == "True",
                            "created": parts[4]
                        })
                    elif line.startswith("POINTS:"):
                        self.points = int(line.split(":")[1].strip())
                    elif line.startswith("LEVEL:"):
                        self.level = int(line.split(":")[1].strip())
                    elif line.startswith("STREAK:"):
                        self.streak = int(line.split(":")[1].strip())
                    elif line.startswith("TOTAL_COMPLETED:"):
                        self.total_completed = int(line.split(":")[1].strip())
                    elif line.startswith("BADGES:"):
                        self.badges_earned = line.split(":")[1].strip().split(",")
                        self.badges_earned = [b for b in self.badges_earned if b]
        except FileNotFoundError:
            pass

    def save_data(self):
        with open("work_bruster_data.txt", "w") as f:
            for task in self.tasks:
                f.write(f"TASK:|{task['id']}|{task['title']}|{task['completed']}|{task['created']}\n")
            f.write(f"POINTS:{self.points}\n")
            f.write(f"LEVEL:{self.level}\n")
            f.write(f"STREAK:{self.streak}\n")
            f.write(f"TOTAL_COMPLETED:{self.total_completed}\n")
            f.write(f"BADGES:{','.join(self.badges_earned)}\n")

    def clear_screen(self):
        print("\n" * 100)

    def print_header(self):
        header = """
╔══════════════════════════════════════════════════════════════════╗
║                   🚀 WORK BRUSTER 🚀                            ║
║     Your Ultimate Task Management Game! By Devesh Sharma         ║
╚══════════════════════════════════════════════════════════════════╝
"""
        print(header)

    def print_stats_bar(self):
        level_bar = "█" * self.level + "░" * (10 - self.level)
        print(f"\n⭐ LEVEL: {self.level} [{level_bar}] | 💰 POINTS: {self.points} | 🔥 STREAK: {self.streak}")
        print(f"✅ COMPLETED: {self.total_completed} | 📊 Current Tasks: {len([t for t in self.tasks if not t['completed']])}")
        print("-" * 66)

    def add_task(self, title):
        task_id = max([t["id"] for t in self.tasks], default=0) + 1
        self.tasks.append({
            "id": task_id,
            "title": title,
            "completed": False,
            "created": datetime.now().strftime("%Y-%m-%d %H:%M")
        })
        print(f"\n✅ Task added: '{title}' (ID: {task_id})")
        self.save_data()

    def display_tasks(self):
        if not self.tasks:
            print("\n📝 No tasks yet! Add one to get started.")
            return
        
        print("\n📋 YOUR TASKS:")
        print("-" * 66)
        for task in self.tasks:
            status = "✅" if task["completed"] else "⭕"
            print(f"{status} [{task['id']}] {task['title']}")
        print("-" * 66)

    def edit_task(self, task_id, new_title):
        for task in self.tasks:
            if task["id"] == task_id:
                old_title = task["title"]
                task["title"] = new_title
                print(f"\n✏️ Task updated: '{old_title}' → '{new_title}'")
                self.save_data()
                return
        print(f"\n❌ Task ID {task_id} not found!")

    def delete_task(self, task_id):
        for i, task in enumerate(self.tasks):
            if task["id"] == task_id:
                title = task["title"]
                self.tasks.pop(i)
                print(f"\n🗑️ Task deleted: '{title}'")
                self.save_data()
                return
        print(f"\n❌ Task ID {task_id} not found!")

    def complete_task(self, task_id):
        for task in self.tasks:
            if task["id"] == task_id:
                if task["completed"]:
                    print("\n⚠️ Task already completed!")
                    return
                
                task["completed"] = True
                self.total_completed += 1
                points_earned = random.randint(10, 25)
                self.points += points_earned
                self.streak += 1
                
                print(f"\n🎉 Task Completed: '{task['title']}'")
                print(f"⭐ +{points_earned} Points! Total: {self.points}")
                print(f"🔥 Streak: {self.streak}")
                
                self.show_random_message()
                self.check_level_up()
                self.check_badges()
                self.save_data()
                return
        print(f"\n❌ Task ID {task_id} not found!")

    def show_random_message(self):
        msg_type = random.choice(["quote", "fact", "fun"])
        if msg_type == "quote":
            print(f"\n💬 '{random.choice(MOTIVATIONAL_QUOTES)}'")
        elif msg_type == "fact":
            print(f"\n🧠 {random.choice(FUNNY_FACTS)}")
        else:
            print(f"\n🌟 {random.choice(['Amazing!', 'Fantastic!', 'Awesome!', 'Incredible!', 'You rock!'])}")

    def check_level_up(self):
        points_per_level = 100
        new_level = (self.points // points_per_level) + 1
        if new_level > self.level:
            self.level = new_level
            print(f"\n🎊 LEVEL UP! 🎊 You reached Level {self.level}!")
            self.show_random_message()

    def check_badges(self):
        new_badges = []
        
        for badge_key, badge_info in BADGES.items():
            if badge_key in self.badges_earned:
                continue
            
            if "tasks" in badge_info:
                if self.total_completed >= badge_info["tasks"]:
                    new_badges.append(badge_key)
            elif "streak" in badge_info:
                if self.streak >= badge_info["streak"]:
                    new_badges.append(badge_key)
        
        for badge_key in new_badges:
            self.badges_earned.append(badge_key)
            badge = BADGES[badge_key]
            print(f"\n🏆 BADGE UNLOCKED: {badge['icon']} {badge['name']} {badge['icon']}")

    def random_task(self):
        incomplete = [t for t in self.tasks if not t["completed"]]
        if not incomplete:
            print("\n📌 No incomplete tasks! You're all caught up!")
            return
        
        selected = random.choice(incomplete)
        print(f"\n🎯 RANDOM TASK SELECTED:")
        print(f"→ {selected['title']} (ID: {selected['id']})")
        print("Focus on this task now!")

    def generate_daily_challenge(self):
        if not self.tasks:
            print("\n⚠️ Add some tasks first to generate a challenge!")
            return
        
        self.daily_challenge = random.choice(self.tasks)
        print(f"\n🌟 TODAY'S CHALLENGE:")
        print(f"Complete this task: '{self.daily_challenge['title']}'")
        print("Earn bonus points when you complete it!")

    def view_progress(self):
        print("\n📊 YOUR PROGRESS:")
        print(f"  💰 Total Points: {self.points}")
        print(f"  ⭐ Level: {self.level}")
        print(f"  🔥 Current Streak: {self.streak}")
        print(f"  ✅ Total Completed: {self.total_completed}")
        print(f"  📝 Active Tasks: {len([t for t in self.tasks if not t['completed']])}")
        
        if self.badges_earned:
            print(f"\n🏆 BADGES EARNED ({len(self.badges_earned)}):")
            for badge_key in self.badges_earned:
                badge = BADGES[badge_key]
                print(f"   {badge['icon']} {badge['name']}")
        else:
            print("\n🏆 No badges yet. Complete more tasks to unlock them!")

    def pomodoro_challenge(self):
        print("\n⏱️ POMODORO CHALLENGE (25-minute focus session)")
        print("This is a simulated challenge. In production, this would use actual timers.")
        print("\nReady to focus? (yes/no): ", end="")
        if input().lower() == "yes":
            print("\n🎯 Focus mode activated! Work for 25 minutes...")
            print("Simulating session completion...")
            time.sleep(2)
            self.pomodoro_sessions += 1
            bonus_points = 50
            self.points += bonus_points
            print(f"\n✅ Session complete! +{bonus_points} bonus points!")
            print(f"Total Pomodoro sessions: {self.pomodoro_sessions}")
            self.save_data()

    def show_menu(self):
        while True:
            self.clear_screen()
            self.print_header()
            self.print_stats_bar()
            
            print("\n🎮 MAIN MENU:")
            print("  1. Add Task")
            print("  2. View Tasks")
            print("  3. Complete Task")
            print("  4. Edit Task")
            print("  5. Delete Task")
            print("  6. Random Task (Focus Mode)")
            print("  7. Daily Challenge")
            print("  8. View Progress & Badges")
            print("  9. Pomodoro Challenge")
            print("  10. Motivational Quote")
            print("  11. Exit")
            print("-" * 66)
            
            choice = input("\n👉 Enter your choice (1-11): ").strip()
            
            if choice == "1":
                title = input("📝 Enter task title: ").strip()
                if title:
                    self.add_task(title)
                    input("\nPress Enter to continue...")
            
            elif choice == "2":
                self.display_tasks()
                input("\nPress Enter to continue...")
            
            elif choice == "3":
                self.display_tasks()
                try:
                    task_id = int(input("\n✅ Enter task ID to complete: "))
                    self.complete_task(task_id)
                except ValueError:
                    print("❌ Invalid ID!")
                input("\nPress Enter to continue...")
            
            elif choice == "4":
                self.display_tasks()
                try:
                    task_id = int(input("\n✏️ Enter task ID to edit: "))
                    new_title = input("Enter new title: ").strip()
                    if new_title:
                        self.edit_task(task_id, new_title)
                except ValueError:
                    print("❌ Invalid ID!")
                input("\nPress Enter to continue...")
            
            elif choice == "5":
                self.display_tasks()
                try:
                    task_id = int(input("\n🗑️ Enter task ID to delete: "))
                    self.delete_task(task_id)
                except ValueError:
                    print("❌ Invalid ID!")
                input("\nPress Enter to continue...")
            
            elif choice == "6":
                self.random_task()
                input("\nPress Enter to continue...")
            
            elif choice == "7":
                self.generate_daily_challenge()
                input("\nPress Enter to continue...")
            
            elif choice == "8":
                self.view_progress()
                input("\nPress Enter to continue...")
            
            elif choice == "9":
                self.pomodoro_challenge()
                input("\nPress Enter to continue...")
            
            elif choice == "10":
                print(f"\n💬 {random.choice(MOTIVATIONAL_QUOTES)}")
                input("\nPress Enter to continue...")
            
            elif choice == "11":
                print("\n👋 Thanks for using Work Bruster! Keep crushing those goals!")
                break
            
            else:
                print("❌ Invalid choice! Try again.")
                time.sleep(1)

if __name__ == "__main__":
    app = WorkBruster()
    app.show_menu()