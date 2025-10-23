import { usePageTitle } from "../hooks/usePageTitle";

export default function AchievementsPage({ tasks, level, xp }) {
  usePageTitle("Achievements - Unlock Your Badges");

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const activeTasks = totalTasks - completedTasks;

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first task",
      icon: "🎯",
      unlocked: completedTasks >= 1,
      requirement: "Complete 1 task",
      progress: Math.min(completedTasks, 1),
      target: 1,
      color: "cyan",
      category: "Beginner",
    },
    {
      id: 2,
      title: "Getting Started",
      description: "Create 5 tasks",
      icon: "📝",
      unlocked: totalTasks >= 5,
      requirement: "Create 5 tasks",
      progress: Math.min(totalTasks, 5),
      target: 5,
      color: "blue",
      category: "Beginner",
    },
    {
      id: 3,
      title: "Task Warrior",
      description: "Complete 10 tasks",
      icon: "⚔️",
      unlocked: completedTasks >= 10,
      requirement: "Complete 10 tasks",
      progress: Math.min(completedTasks, 10),
      target: 10,
      color: "green",
      category: "Intermediate",
    },
    {
      id: 4,
      title: "Productivity Master",
      description: "Complete 25 tasks",
      icon: "🚀",
      unlocked: completedTasks >= 25,
      requirement: "Complete 25 tasks",
      progress: Math.min(completedTasks, 25),
      target: 25,
      color: "orange",
      category: "Intermediate",
    },
    {
      id: 5,
      title: "Level Up",
      description: "Reach Level 5",
      icon: "⬆️",
      unlocked: level >= 5,
      requirement: "Reach Level 5",
      progress: Math.min(level, 5),
      target: 5,
      color: "purple",
      category: "Intermediate",
    },
    {
      id: 6,
      title: "Half Century",
      description: "Complete 50 tasks",
      icon: "💪",
      unlocked: completedTasks >= 50,
      requirement: "Complete 50 tasks",
      progress: Math.min(completedTasks, 50),
      target: 50,
      color: "yellow",
      category: "Advanced",
    },
    {
      id: 7,
      title: "Elite Status",
      description: "Reach Level 10",
      icon: "👑",
      unlocked: level >= 10,
      requirement: "Reach Level 10",
      progress: Math.min(level, 10),
      target: 10,
      color: "pink",
      category: "Advanced",
    },
    {
      id: 8,
      title: "Century Club",
      description: "Complete 100 tasks",
      icon: "💯",
      unlocked: completedTasks >= 100,
      requirement: "Complete 100 tasks",
      progress: Math.min(completedTasks, 100),
      target: 100,
      color: "red",
      category: "Expert",
    },
    {
      id: 9,
      title: "Legendary",
      description: "Reach Level 20",
      icon: "🏆",
      unlocked: level >= 20,
      requirement: "Reach Level 20",
      progress: Math.min(level, 20),
      target: 20,
      color: "cyan",
      category: "Expert",
    },
    {
      id: 10,
      title: "Unstoppable",
      description: "Complete 250 tasks",
      icon: "⚡",
      unlocked: completedTasks >= 250,
      requirement: "Complete 250 tasks",
      progress: Math.min(completedTasks, 250),
      target: 250,
      color: "orange",
      category: "Master",
    },
    {
      id: 11,
      title: "Grandmaster",
      description: "Reach Level 50",
      icon: "🎖️",
      unlocked: level >= 50,
      requirement: "Reach Level 50",
      progress: Math.min(level, 50),
      target: 50,
      color: "purple",
      category: "Master",
    },
    {
      id: 12,
      title: "Infinity",
      description: "Complete 500 tasks",
      icon: "♾️",
      unlocked: completedTasks >= 500,
      requirement: "Complete 500 tasks",
      progress: Math.min(completedTasks, 500),
      target: 500,
      color: "blue",
      category: "Legendary",
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalAchievements = achievements.length;
  const completionPercentage = Math.round(
    (unlockedCount / totalAchievements) * 100
  );

  const categories = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert",
    "Master",
    "Legendary",
  ];

  const colorStyles = {
    green: {
      bg: "from-green-500/20 to-emerald-500/20",
      border: "border-green-500/50",
      shadow: "shadow-green-500/30",
      text: "text-green-400",
      glow: "shadow-green-500/50",
    },
    cyan: {
      bg: "from-cyan-500/20 to-blue-500/20",
      border: "border-cyan-500/50",
      shadow: "shadow-cyan-500/30",
      text: "text-cyan-400",
      glow: "shadow-cyan-500/50",
    },
    orange: {
      bg: "from-orange-500/20 to-red-500/20",
      border: "border-orange-500/50",
      shadow: "shadow-orange-500/30",
      text: "text-orange-400",
      glow: "shadow-orange-500/50",
    },
    yellow: {
      bg: "from-yellow-500/20 to-amber-500/20",
      border: "border-yellow-500/50",
      shadow: "shadow-yellow-500/30",
      text: "text-yellow-400",
      glow: "shadow-yellow-500/50",
    },
    purple: {
      bg: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/50",
      shadow: "shadow-purple-500/30",
      text: "text-purple-400",
      glow: "shadow-purple-500/50",
    },
    red: {
      bg: "from-red-500/20 to-rose-500/20",
      border: "border-red-500/50",
      shadow: "shadow-red-500/30",
      text: "text-red-400",
      glow: "shadow-red-500/50",
    },
    blue: {
      bg: "from-blue-500/20 to-indigo-500/20",
      border: "border-blue-500/50",
      shadow: "shadow-blue-500/30",
      text: "text-blue-400",
      glow: "shadow-blue-500/50",
    },
    pink: {
      bg: "from-pink-500/20 to-fuchsia-500/20",
      border: "border-pink-500/50",
      shadow: "shadow-pink-500/30",
      text: "text-pink-400",
      glow: "shadow-pink-500/50",
    },
  };

  return (
    <div className="py-4 sm:py-6 md:py-8 px-3 sm:px-4 pb-24 md:pb-20 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 animate-slideInDown">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-3 sm:gap-4 flex-wrap">
            <span className="text-4xl sm:text-5xl md:text-6xl animate-bounceIn">
              🏆
            </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent block">
              Achievements
            </span>
          </h1>
          <p
            className="text-cyan-300/80 text-sm sm:text-base font-medium animate-slideInUp"
            style={{ animationDelay: "0.2s" }}
          >
            Track your progress and unlock rewards as you complete tasks
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 stagger-children">
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-cyan-500/50 shadow-xl shadow-cyan-500/20 p-4 sm:p-5 hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-scaleIn">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-black uppercase text-cyan-400 mb-1">
                  Current Level
                </p>
                <p className="text-3xl sm:text-4xl font-black text-white">
                  {level}
                </p>
              </div>
              <div className="text-4xl sm:text-5xl">⬆️</div>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-purple-500/50 shadow-xl shadow-purple-500/20 p-4 sm:p-5 hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-scaleIn">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-black uppercase text-purple-400 mb-1">
                  Total XP
                </p>
                <p className="text-3xl sm:text-4xl font-black text-white">
                  {xp}
                </p>
              </div>
              <div className="text-4xl sm:text-5xl">✨</div>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-green-500/50 shadow-xl shadow-green-500/20 p-4 sm:p-5 hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-scaleIn">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-black uppercase text-green-400 mb-1">
                  Completed
                </p>
                <p className="text-3xl sm:text-4xl font-black text-white">
                  {completedTasks}
                </p>
              </div>
              <div className="text-4xl sm:text-5xl">✅</div>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-orange-500/50 shadow-xl shadow-orange-500/20 p-4 sm:p-5 hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-scaleIn">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-black uppercase text-orange-400 mb-1">
                  Unlocked
                </p>
                <p className="text-3xl sm:text-4xl font-black text-white">
                  {unlockedCount}/{totalAchievements}
                </p>
              </div>
              <div className="text-4xl sm:text-5xl">🎯</div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl border-2 border-purple-500/50 shadow-xl shadow-purple-500/30 p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 animate-slideInUp hover:scale-[1.02] transition-all duration-300"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3 sm:gap-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-purple-400 mb-1">
                Overall Progress
              </h2>
              <p className="text-purple-200 font-medium text-xs sm:text-sm">
                Keep completing tasks to unlock more achievements!
              </p>
            </div>
            <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {completionPercentage}%
            </div>
          </div>
          <div className="w-full bg-black/50 h-3 sm:h-4 rounded-full overflow-hidden border-2 border-purple-500/30">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full shadow-lg shadow-purple-500/50 transition-all duration-500 animate-pulse"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="mt-2 sm:mt-3 flex justify-between text-[10px] sm:text-xs font-bold text-purple-300">
            <span>0</span>
            <span>{unlockedCount} Unlocked</span>
            <span>{totalAchievements} Total</span>
          </div>
        </div>

        {/* Achievements by Category */}
        {categories.map((category) => {
          const categoryAchievements = achievements.filter(
            (a) => a.category === category
          );
          if (categoryAchievements.length === 0) return null;

          const categoryUnlocked = categoryAchievements.filter(
            (a) => a.unlocked
          ).length;

          return (
            <div key={category} className="mb-6 sm:mb-8 animate-slideInUp">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-2xl font-black uppercase bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {category}
                </h3>
                <span className="text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 animate-bounceIn">
                  {categoryUnlocked}/{categoryAchievements.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 stagger-children">
                {categoryAchievements.map((achievement) => {
                  const style = colorStyles[achievement.color];
                  const progressPercent = Math.round(
                    (achievement.progress / achievement.target) * 100
                  );

                  return (
                    <div
                      key={achievement.id}
                      className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-scaleIn ${
                        achievement.unlocked
                          ? `bg-gradient-to-br ${style.bg} ${style.border} shadow-xl ${style.shadow}`
                          : "bg-black/40 border-gray-600/30"
                      }`}
                    >
                      {achievement.unlocked && (
                        <div className="absolute top-2 right-2 z-10">
                          <div className="bg-green-500/30 text-green-400 text-[10px] sm:text-xs font-black uppercase px-2 py-1 rounded-lg border border-green-500/50 backdrop-blur-sm">
                            ✓ Unlocked
                          </div>
                        </div>
                      )}

                      <div className="p-4 sm:p-5 md:p-6">
                        <div className="flex flex-col items-center text-center">
                          <div
                            className={`text-5xl sm:text-6xl mb-2 sm:mb-3 transition-all duration-300 ${
                              achievement.unlocked
                                ? "transform group-hover:scale-110 group-hover:rotate-12 animate-float"
                                : "grayscale opacity-40"
                            }`}
                          >
                            {achievement.unlocked ? achievement.icon : "🔒"}
                          </div>

                          <h4
                            className={`font-black text-base sm:text-lg uppercase mb-1 ${
                              achievement.unlocked
                                ? style.text
                                : "text-gray-500"
                            }`}
                          >
                            {achievement.title}
                          </h4>

                          <p
                            className={`text-[10px] sm:text-xs font-medium mb-2 sm:mb-3 ${
                              achievement.unlocked
                                ? "text-white/80"
                                : "text-gray-600"
                            }`}
                          >
                            {achievement.description}
                          </p>

                          {!achievement.unlocked && (
                            <>
                              <div className="w-full mb-2">
                                <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-gray-600/50">
                                  <div
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                                    style={{ width: `${progressPercent}%` }}
                                  />
                                </div>
                              </div>
                              <p className="text-[10px] sm:text-xs font-bold text-gray-500">
                                {achievement.progress} / {achievement.target}
                              </p>
                            </>
                          )}

                          <div
                            className={`mt-2 sm:mt-3 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border text-[10px] sm:text-xs font-black uppercase ${
                              achievement.unlocked
                                ? `${style.border} ${style.text} bg-black/20`
                                : "border-gray-700 text-gray-600 bg-black/30"
                            }`}
                          >
                            {achievement.requirement}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
