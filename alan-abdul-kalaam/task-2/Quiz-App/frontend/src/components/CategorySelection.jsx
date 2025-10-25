import { useState, useEffect } from "react";

const categoryData = {
  Movies: {
    emoji: "🎬",
    desc: "Film & cinema",
  },
  Music: {
    emoji: "🎵",
    desc: "Musical arts",
  },
  Technology: {
    emoji: "💻",
    desc: "Tech & innovation",
  },
  Medicine: {
    emoji: "⚕️",
    desc: "Healthcare",
  },
  History: {
    emoji: "📜",
    desc: "Historical events",
  },
  Science: {
    emoji: "🔬",
    desc: "Scientific knowledge",
  },
  Sports: {
    emoji: "⚽",
    desc: "Athletic competition",
  },
  Geography: {
    emoji: "🌍",
    desc: "World geography",
  },
  Literature: {
    emoji: "📚",
    desc: "Literary works",
  },
  "General Knowledge": {
    emoji: "🧠",
    desc: "Mixed topics",
  },
  Randomize: {
    emoji: "🎲",
    desc: "Random category",
  },
};

function CategorySelection({ onSelectCategory, apiBaseUrl }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const loadCategories = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/quiz/categories`);
        const data = await response.json();
        if (!isCancelled) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      isCancelled = true;
    };
  }, [apiBaseUrl]);

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-gray-200 border-t-gray-600" />
        <p className="text-sm text-gray-600">Loading categories…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="tag mb-2">Browse library</span>
          <h2 className="text-xl font-semibold text-gray-900">
            Choose a category
          </h2>
          <p className="text-sm text-gray-500">
            We will prepare ten questions tailored to the domain you select.
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {categories.length} categories available
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const categoryInfo = categoryData[category] || {
            emoji: "📝",
            desc: "Assessment",
          };

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className="rounded-xl border border-gray-200 p-5 text-left transition-colors hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl" aria-hidden>
                  {categoryInfo.emoji}
                </span>
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <div className="mt-4 space-y-1">
                <div className="text-sm font-medium text-gray-900">
                  {category}
                </div>
                <p className="text-xs text-gray-500">{categoryInfo.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategorySelection;
