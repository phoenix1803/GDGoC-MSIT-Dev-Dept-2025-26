function UserStats({ stats, username, onChangeUser }) {
  if (!stats) {
    return null;
  }

  const accuracyRate =
    stats.totalQuestions > 0
      ? ((stats.correctAnswers / stats.totalQuestions) * 100).toFixed(1)
      : "0.0";

  const summaryCards = [
    {
      title: "Total questions",
      value: stats.totalQuestions,
      subtitle: "Attempted overall",
      iconBg: "bg-gray-900",
      icon: (
        <svg
          className="h-5 w-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Correct answers",
      value: stats.correctAnswers,
      subtitle: "Right on target",
      iconBg: "bg-emerald-500",
      icon: (
        <svg
          className="h-5 w-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      title: "Incorrect answers",
      value: stats.incorrectAnswers,
      subtitle: "Learning moments",
      iconBg: "bg-rose-500",
      icon: (
        <svg
          className="h-5 w-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    {
      title: "Accuracy rate",
      value: `${accuracyRate}%`,
      subtitle: "Success percentage",
      iconBg: "bg-indigo-500",
      icon: (
        <svg
          className="h-5 w-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  const recentHistory = Array.isArray(stats.quizHistory)
    ? stats.quizHistory.slice(-5).reverse()
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-lg font-semibold text-white">
            {username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
              {username}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
              <span
                className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500"
                aria-hidden
              />
              Active participant dashboard
            </div>
          </div>
        </div>
        <button
          onClick={onChangeUser}
          className="btn-secondary px-4 py-2 text-sm font-medium"
        >
          Switch User
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:text-left"
          >
            <div
              className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} sm:mx-0`}
            >
              {card.icon}
            </div>
            <div className="text-sm font-medium uppercase tracking-wide text-gray-500">
              {card.title}
            </div>
            <div className="text-2xl font-semibold text-gray-900">
              {card.value}
            </div>
            <div className="text-sm text-gray-600">{card.subtitle}</div>
          </div>
        ))}
      </div>

      {recentHistory.length > 0 && (
        <div className="space-y-4 border-t border-gray-200 pt-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="text-base font-semibold text-gray-900 sm:text-lg">
              Recent activity
            </h4>
            <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              Last {Math.min(5, stats.quizHistory.length)} assessments
            </span>
          </div>

          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {recentHistory.map((quiz, index) => {
              const percentage =
                quiz.totalQuestions > 0
                  ? Math.round(
                      (quiz.correctAnswers / quiz.totalQuestions) * 100
                    )
                  : 0;
              const badgeColor =
                percentage >= 80
                  ? "bg-emerald-500"
                  : percentage >= 60
                  ? "bg-amber-500"
                  : "bg-rose-500";
              const quizDate = new Date(quiz.date);
              const isValidDate = !Number.isNaN(quizDate.getTime());

              return (
                <div
                  key={`${quiz.category}-${index}`}
                  className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-600 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-semibold text-white ${badgeColor}`}
                    >
                      {percentage}%
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {quiz.category}
                      </div>
                      <div className="text-xs text-gray-500">
                        {quiz.correctAnswers}/{quiz.totalQuestions} correct
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div>
                      {isValidDate
                        ? quizDate.toLocaleDateString()
                        : "Unknown date"}
                    </div>
                    <div className="text-gray-400">
                      {isValidDate
                        ? quizDate.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserStats;
