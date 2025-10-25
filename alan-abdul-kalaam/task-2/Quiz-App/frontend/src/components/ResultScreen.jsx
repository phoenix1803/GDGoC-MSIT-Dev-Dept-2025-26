function ResultScreen({ result, category, onPlayAgain, onChangeUser }) {
  const safeResults = Array.isArray(result.results) ? result.results : [];
  const totalQuestions = result.totalQuestions || safeResults.length || 0;
  const correctCount = result.correctCount || 0;
  const incorrectCount =
    result.incorrectCount || Math.max(totalQuestions - correctCount, 0);
  const totalPoints = result.totalPoints ?? result.score ?? 0;
  const score = result.score || 0;
  const percentageRaw =
    totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  const percentage = percentageRaw.toFixed(1);

  const gradeInfo = (() => {
    if (percentageRaw >= 90)
      return { grade: "A+", message: "Outstanding performance" };
    if (percentageRaw >= 80) return { grade: "A", message: "Excellent work" };
    if (percentageRaw >= 70) return { grade: "B", message: "Strong result" };
    if (percentageRaw >= 60) return { grade: "C", message: "Solid effort" };
    if (percentageRaw >= 50) return { grade: "D", message: "Needs follow-up" };
    return { grade: "F", message: "Review recommended" };
  })();

  const metrics = [
    {
      label: "Correct answers",
      value: correctCount,
      meta: `${
        totalQuestions
          ? ((correctCount / totalQuestions) * 100).toFixed(1)
          : "0.0"
      }% accuracy`,
    },
    {
      label: "Incorrect answers",
      value: incorrectCount,
      meta: `${
        totalQuestions
          ? ((incorrectCount / totalQuestions) * 100).toFixed(1)
          : "0.0"
      }% missed`,
    },
    {
      label: "Total points",
      value: score,
      meta: `out of ${totalPoints} points`,
    },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <span className="tag mb-3">Assessment summary</span>
          <h2 className="text-2xl font-semibold text-gray-900">
            Assessment complete
          </h2>
          <p className="text-sm text-gray-500">Category · {category}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-6 text-center min-w-40">
          <div className="text-3xl font-semibold text-gray-900">
            {percentage}%
          </div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
            Overall score
          </p>
          <p className="mt-4 text-sm font-medium text-gray-900">
            Grade {gradeInfo.grade}
          </p>
          <p className="text-xs text-gray-500">{gradeInfo.message}</p>
        </div>
      </header>

      <section className="stat-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="stat-card">
            <div className="stat-card__label text-xs uppercase tracking-wide text-gray-500 mb-2">
              {metric.label}
            </div>
            <div className="stat-card__value">{metric.value}</div>
            <div className="stat-card__label mt-2">{metric.meta}</div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="panel-title">Answer review</h3>
          <span className="text-xs text-gray-500">
            {safeResults.length} questions
          </span>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {safeResults.map((item, index) => {
            const userAnswer = Array.isArray(item.userAnswer)
              ? item.userAnswer.join(", ") || "No answer provided"
              : item.userAnswer || "No answer provided";
            const correctAnswer = Array.isArray(item.correctAnswer)
              ? item.correctAnswer.join(", ")
              : item.correctAnswer;

            return (
              <article
                key={index}
                className="rounded-xl border border-gray-200 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="text-xs uppercase tracking-wide text-gray-500">
                      Question {index + 1}
                    </div>
                    <p className="text-sm font-medium text-gray-900 leading-6">
                      {item.questionText}
                    </p>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        Your answer
                      </div>
                      <p
                        className={`text-sm font-medium ${
                          item.isCorrect ? "text-gray-900" : "text-red-600"
                        }`}
                      >
                        {userAnswer}
                      </p>
                    </div>
                    {!item.isCorrect && (
                      <div className="rounded-lg border border-gray-200 bg-white p-3">
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          Correct answer
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {correctAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="md:text-right">
                    <span
                      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                        item.isCorrect
                          ? "bg-gray-900 text-white"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row">
        <button onClick={onPlayAgain} className="btn-primary flex-1">
          Take another assessment
        </button>
        <button onClick={onChangeUser} className="btn-secondary flex-1">
          Switch user
        </button>
      </section>
    </div>
  );
}

export default ResultScreen;
