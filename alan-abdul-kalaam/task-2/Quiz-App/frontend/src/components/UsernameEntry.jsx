import { useState } from "react";

function UsernameEntry({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (username.length > 20) {
      setError("Username must be less than 20 characters");
      return;
    }

    onSubmit(username.trim());
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="tag mb-3">Onboarding</span>
          <h2 className="text-2xl font-semibold text-gray-900">
            Welcome to QuizMaster
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-xl">
            Identify yourself to personalise the dashboard and keep your
            assessment journey organised across sessions.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200">
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM6 21v-1a5 5 0 015-5h2a5 5 0 015 5v1"
              />
            </svg>
          </div>
          <div>
            <div className="font-medium text-gray-900">
              Participant credentials
            </div>
            <p className="text-xs text-gray-500">
              User IDs help us maintain performance history.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            className="input-field"
            placeholder="Enter your username"
            autoFocus
            aria-describedby={error ? "username-error" : undefined}
          />
          {error && (
            <div id="username-error" className="text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!username.trim() || username.length < 3}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Begin Assessment
        </button>
      </form>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Why we ask for this
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Track historical scores",
            "Share tailored category picks",
            "Resume saved attempts",
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-gray-200 p-4 text-sm text-gray-600"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UsernameEntry;
