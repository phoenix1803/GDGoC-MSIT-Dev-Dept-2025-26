"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/component/Header/Navbar";

export default function ProfileSettingsPage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(null); 
  const [userData,setUserData] = useState(null)

  // Pre-fill form with fresh user data from database
  useEffect(() => {
    if (session?.user && userData) {
      setFormData({
        username: userData.username || "",
        name: userData.name || "",
        contact: userData.contact || "",
        email: userData.email || "",
        credit: userData.credit || 0,
        collegeId: userData.collegeId || false,
      });
    }
  }, [session, userData]);

    useEffect(()=>{
    if(!session?.user?.id) return
    const fetchUserData = async()=>{
      try{
        const res = await fetch("/api/user/user-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session.user.id }),
        })
        const data = await res.json()
        setUserData(data)
      }catch(err){
        console.error(err)
      }
    }
    fetchUserData()
  },[session?.user?.id])

  // ✅ Live username check
  useEffect(() => {
    if (!formData.username) return;

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch("/api/user/check-username", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: formData.username, userId: session.user.id }),
        });
        const data = await res.json();
        setUsernameAvailable(data.available);
      } catch {
        setUsernameAvailable(null);
      }
    }, 500); // debounce

    return () => clearTimeout(timeout);
  }, [formData.username, session?.user?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  if (usernameAvailable === false) {
    setMessage("❌ Username already taken");
    setLoading(false);
    return;
  }

  try {
    // Update user in DB
    const res = await fetch("/api/user/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: session.user.id, ...formData }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update");

    // ✅ Fetch latest user data
    const userRes = await fetch("/api/user/user-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: session.user.id }),
    });
    const updatedUser = await userRes.json();

    // Update formData with fresh user
    setFormData({
      username: updatedUser.username,
      name: updatedUser.name,
      contact: updatedUser.contact,
      email: updatedUser.email,
      credit: updatedUser.credit,
      collegeId: updatedUser.collegeId,
    });

    setMessage("✅ Profile updated successfully!");
  } catch (err) {
    setMessage("❌ " + err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <Navbar />
      
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="p-2 border rounded"
            required
          />
          {usernameAvailable === false && (
            <p className="text-red-500 text-sm">Username already taken</p>
          )}
          {usernameAvailable === true && (
            <p className="text-green-500 text-sm">Username available</p>
          )}

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact"
            className="p-2 border rounded"
          />

          <div className="p-2 border rounded text-gray-600">
            {formData.email}
          </div>
          <div className="p-2 border rounded text-gray-600">
            College ID verified: {formData.collegeId ? (
              <span className="text-green-600 font-semibold">✅ Verified</span>
            ) : (
              <span className="text-red-600">
                ❌ Not verified 
                <a href="/verify-college-id" className="text-blue-600 hover:underline ml-2">
                  Click to verify
                </a>
              </span>
            )}
          </div>
          <div className="p-2 border rounded text-gray-600">
            Credit left for API calls: {formData.credit ? <span>{formData.credit} credits</span> : <span>❌</span>}
          </div>
         

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
}

