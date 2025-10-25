import { useState } from "react";

function QuizScreen({ quizData, userAnswers, onAnswerChange, onSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const totalQuestions = quizData.questions.length;
  const currentQuestion = quizData.questions[currentQuestionIndex];
  const answeredCount = userAnswers.filter(
    (answer) => answer !== null && answer !== ""
  ).length;
  const progress = Math.round(
    ((currentQuestionIndex + 1) / totalQuestions) * 100
  );

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const unanswered = userAnswers.filter(
      (answer) => answer === null || answer === ""
    );

    if (unanswered.length > 0) {
      const confirmed = window.confirm(
        `You have ${unanswered.length} unanswered question(s). Submit anyway?`
      );

      if (!confirmed) {
        return;
      }
    }

    onSubmit();
  };

  const renderQuestion = () => {
    const currentAnswer = userAnswers[currentQuestionIndex];

    if (currentQuestion.questionType === "mcq") {
      return (
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = currentAnswer === option;

            return (
              <button
                key={option}
                onClick={() => onAnswerChange(currentQuestionIndex, option)}
                className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 ${
                  isSelected
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-xs font-semibold text-gray-600">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-sm leading-6">{option}</span>
              </button>
            );
          })}
        </div>
      );
    }

    if (currentQuestion.questionType === "true-false") {
      return (
        <div className="space-y-3">
          {["True", "False"].map((option) => {
            const isSelected = currentAnswer === option;

            return (
              <button
                key={option}
                onClick={() => onAnswerChange(currentQuestionIndex, option)}
                className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 ${
                  isSelected
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <span className="text-sm font-medium">{option}</span>
                <span
                  className={`h-3 w-3 rounded-full ${
                    isSelected ? "bg-white" : "border border-gray-300"
                  }`}
                />
              </button>
            );
          })}
        </div>
      );
    }

    if (currentQuestion.questionType === "fill-blank") {
      return (
        <div className="space-y-3">
          <input
            type="text"
            value={currentAnswer || ""}
            onChange={(event) =>
              onAnswerChange(currentQuestionIndex, event.target.value)
            }
            className="input-field"
            placeholder="Type your answer"
          />
          <p className="text-xs text-gray-500">
            Provide a concise answer based on the prompt.
          </p>
        </div>
      );
    }

    if (currentQuestion.questionType === "select-all") {
      const selectedOptions = Array.isArray(currentAnswer) ? currentAnswer : [];

      const toggleOption = (option) => {
        if (selectedOptions.includes(option)) {
          onAnswerChange(
            currentQuestionIndex,
            selectedOptions.filter((item) => item !== option)
          );
        } else {
          onAnswerChange(currentQuestionIndex, [...selectedOptions, option]);
        }
      };

      return (
        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptions.includes(option);

            return (
              <button
                key={option}
                onClick={() => toggleOption(option)}
                className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 ${
                  isSelected
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <span
                  className={`mt-1 flex h-5 w-5 items-center justify-center rounded border ${
                    isSelected
                      ? "border-white bg-white text-gray-900"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-sm leading-6">{option}</span>
              </button>
            );
          })}
          <p className="text-xs text-gray-500">
            Multiple selections are allowed; pick every correct option.
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="tag">{quizData.category}</span>
            <span className="text-xs text-gray-500">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
          <span className="text-xs text-gray-500">{progress}% complete</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-gray-900 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="uppercase tracking-wide">
            {currentQuestion.questionType.replace("-", " ")}
          </span>
          <span>•</span>
          <span>{quizData.difficulty} difficulty</span>
          <span>•</span>
          <span>{currentQuestion.points} points</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 leading-7">
          {currentQuestion.questionText}
        </h3>
      </div>

      {renderQuestion()}

      <div className="space-y-6 rounded-xl border border-gray-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-medium text-gray-700">Navigator</span>
          <span className="text-xs text-gray-500">
            {answeredCount} of {totalQuestions} answered
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
          {quizData.questions.map((_, index) => {
            const isCurrent = index === currentQuestionIndex;
            const isAnswered =
              userAnswers[index] !== null && userAnswers[index] !== "";

            return (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`rounded-lg border py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 ${
                  isCurrent
                    ? "border-gray-900 bg-gray-900 text-white"
                    : isAnswered
                    ? "border-gray-300 bg-gray-100 text-gray-900"
                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-gray-900" />
              Current
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-gray-200" />
              Pending
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-gray-400" />
              Answered
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            {currentQuestionIndex === totalQuestions - 1 ? (
              <button onClick={handleSubmitQuiz} className="btn-primary">
                Submit assessment
              </button>
            ) : (
              <button onClick={handleNext} className="btn-primary">
                Next question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizScreen;
