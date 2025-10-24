import { useState, useEffect } from "react";
import { usePageTitle } from "../hooks/usePageTitle";

export default function AvatarPage({ user }) {
  usePageTitle("Change Avatar - Customize Your Profile");

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch current avatar from backend
  useEffect(() => {
    const fetchAvatar = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.avatar) {
            setCurrentAvatar(data.avatar);
          }
        }
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchAvatar();
  }, []);

  // Predefined avatar options
  const avatars = [
    {
      id: 1,
      emoji: "😀",
      name: "Happy",
      color: "from-yellow-500 to-orange-500",
    },
    { id: 2, emoji: "😎", name: "Cool", color: "from-cyan-500 to-blue-500" },
    {
      id: 3,
      emoji: "🤓",
      name: "Nerd",
      color: "from-green-500 to-emerald-500",
    },
    { id: 4, emoji: "🥳", name: "Party", color: "from-purple-500 to-pink-500" },
    { id: 5, emoji: "🚀", name: "Rocket", color: "from-red-500 to-orange-500" },
    {
      id: 6,
      emoji: "⚡",
      name: "Lightning",
      color: "from-yellow-400 to-amber-500",
    },
    { id: 7, emoji: "🔥", name: "Fire", color: "from-orange-500 to-red-600" },
    { id: 8, emoji: "💎", name: "Diamond", color: "from-cyan-400 to-blue-600" },
    {
      id: 9,
      emoji: "👑",
      name: "Crown",
      color: "from-yellow-500 to-amber-600",
    },
    {
      id: 10,
      emoji: "🎮",
      name: "Gamer",
      color: "from-purple-500 to-indigo-600",
    },
    { id: 11, emoji: "🎯", name: "Target", color: "from-red-500 to-pink-500" },
    {
      id: 12,
      emoji: "⭐",
      name: "Star",
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: 13,
      emoji: "🌟",
      name: "Sparkle",
      color: "from-cyan-300 to-blue-400",
    },
    {
      id: 14,
      emoji: "💪",
      name: "Strong",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 15,
      emoji: "🧠",
      name: "Brain",
      color: "from-pink-500 to-purple-500",
    },
    {
      id: 16,
      emoji: "🎨",
      name: "Artist",
      color: "from-purple-400 to-pink-400",
    },
  ];

  const handleSaveAvatar = async () => {
    if (!selectedAvatar) return;

    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user/avatar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatarId: selectedAvatar.id,
          emoji: selectedAvatar.emoji,
          name: selectedAvatar.name,
          color: selectedAvatar.color,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentAvatar(data.avatar);
        setSelectedAvatar(null);
        alert(`Avatar changed to ${selectedAvatar.name}!`);

        // Reload the page to update the navbar avatar
        window.location.reload();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to update avatar");
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("An error occurred while updating avatar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slideInDown">
          <h1 className="text-5xl font-black uppercase tracking-wider mb-3 flex items-center gap-4">
            <span className="text-6xl animate-bounceIn">📷</span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent block">
              Change Avatar
            </span>
          </h1>
          <p
            className="text-cyan-300/80 text-base font-medium animate-slideInUp"
            style={{ animationDelay: "0.2s" }}
          >
            Choose your profile avatar from our collection
          </p>
        </div>

        {/* Current Avatar */}
        <div className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/30 p-8 mb-8 animate-scaleIn">
          <h2 className="text-xl font-black uppercase text-cyan-400 mb-4">
            Current Avatar
          </h2>
          <div className="flex items-center gap-6">
            {currentAvatar ? (
              <div
                className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentAvatar.color} flex items-center justify-center border-4 border-cyan-400 shadow-lg shadow-cyan-500/50 text-5xl`}
              >
                {currentAvatar.emoji}
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center border-4 border-cyan-400 shadow-lg shadow-cyan-500/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
            <div>
              <p className="text-cyan-300 font-medium">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user?.email?.split("@")[0] || "User"}
              </p>
              <p className="text-cyan-400/60 text-sm mt-1">
                {currentAvatar ? currentAvatar.name : "Default Avatar"}
              </p>
            </div>
          </div>
        </div>

        {/* Avatar Selection */}
        <div
          className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/30 p-8 animate-scaleIn"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-xl font-black uppercase text-cyan-400 mb-6">
            Choose New Avatar
          </h2>

          {/* Avatar Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 mb-8">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar)}
                className={`w-full aspect-square rounded-xl bg-gradient-to-br ${
                  avatar.color
                } flex items-center justify-center text-4xl border-4 transition-all duration-300 hover:scale-110 hover:-translate-y-2 ${
                  selectedAvatar?.id === avatar.id
                    ? "border-white shadow-xl scale-105"
                    : "border-transparent hover:border-white/50"
                }`}
                title={avatar.name}
              >
                {avatar.emoji}
              </button>
            ))}
          </div>

          {/* Selected Avatar Preview */}
          {selectedAvatar && (
            <div className="border-t border-cyan-500/30 pt-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${selectedAvatar.color} flex items-center justify-center text-3xl border-2 border-white shadow-lg`}
                  >
                    {selectedAvatar.emoji}
                  </div>
                  <div>
                    <p className="text-cyan-300 font-black uppercase">
                      {selectedAvatar.name}
                    </p>
                    <p className="text-cyan-400/60 text-sm">
                      New Avatar Selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSaveAvatar}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-black uppercase text-sm hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/50 border-2 border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "⏳ Saving..." : "✓ Save Avatar"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Upload Custom Avatar (Coming Soon) */}
        <div
          className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30 p-8 mt-8 animate-scaleIn"
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-xl font-black uppercase text-purple-400 mb-4">
            Custom Avatar Upload
          </h2>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="text-purple-300/60 font-medium">
              Upload custom avatars - Coming Soon!
            </p>
            <button
              disabled
              className="mt-4 px-6 py-3 bg-purple-500/20 text-purple-300/50 rounded-lg font-black uppercase text-sm border-2 border-purple-500/30 cursor-not-allowed"
            >
              Upload Image (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
